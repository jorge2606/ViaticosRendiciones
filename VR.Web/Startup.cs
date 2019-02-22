using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using AutoMapper;
using System;
using System.Globalization;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Audit.Data;
using Audit.Core;
using Microsoft.AspNetCore.Http;
using VR.Web.Helpers;
using Audit.EntityFramework;
using Audit.Service.Services;
using FluentValidation.AspNetCore;
using FluentValidation;
using Microsoft.AspNetCore.Localization;
using Microsoft.CodeAnalysis.Options;
using Microsoft.Extensions.Options;
using VR.Common.Extensions;
using VR.Data;
using VR.Data.Model;
using VR.Dto;
using VR.Dto.User;
using VR.Identity.Identities;
using VR.Service.Interfaces;
using VR.Service.Services;
using VR.Web.Extensions;
using Service.Common;
using VR.Data.Stores_Procedures.StoresProcedures;
using VR.Data.Stores_Procedures.IStoresProcedures;

namespace VR.Web
{
    public class Startup
    {

        private const string _defaultCorsPolicyName = "localhost";
        private const string enUSCulture = "es-ES";
        public IConfiguration Configuration { get; }
        public IServiceProvider ServiceProvider { get; }

        public Startup(IConfiguration configuration, IServiceProvider serviceProvider)
        {
            Configuration = configuration;
            ServiceProvider = serviceProvider;
        }

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ASPDatabase")));
            services.AddDbContext<AuditContext>(options => 
                options.UseSqlServer(Configuration.GetConnectionString("AuditDatabase")));

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            //services.AddHttpContextAccessor();

            //begin Audit config
            Audit.Core.Configuration.Setup()
                .UseEntityFramework(ef => ef
                    .UseDbContext(x =>
                    {
                        var sp = services.BuildServiceProvider();
                        return sp.GetService<AuditContext>();
                    })
                    //.UseDbContext<AuditContext>(Configuration.GetConnectionString("AuditDatabase"))
                    .AuditTypeExplicitMapper(m => m
                        .Map<Notification, Audit_Notification>()
                        .Map<User, Audit_User>()
                        .AuditEntityAction<IAudit>((evt, entry, auditEntity) =>
                        {
                            var entityFrameworkEvent = evt.GetEntityFrameworkEvent();
                            MyService user = new MyService();
                            auditEntity.Id = new Guid();
                            auditEntity.AuditDate = DateTime.UtcNow;
                            auditEntity.AuditUser = user.getCurrentUserName();
                            auditEntity.AuditUserId = user.getCurrentUserId();
                            auditEntity.EntityId = (Guid)entry.PrimaryKey["Id"];
                            auditEntity.AuditAction = entry.Action;
                           
                            //entityFrameworkEvent. 
                            // Insert, Update, Delete
                        })
                    )
                );

            services.AddLocalization();
            // MVC
            services.AddMvc(
                options => options.Filters.Add(new CorsAuthorizationFilterFactory(_defaultCorsPolicyName))
            ).AddFluentValidation(fv =>
                {
                    fv.RunDefaultMvcValidationAfterFluentValidationExecutes = false;
                    fv.ImplicitlyValidateChildProperties = true;
                }
            ).AddViewLocalization()
             .AddDataAnnotationsLocalization();

            //FluentValidation

            services.AddAutoMapper();

            services.AddCors(
               options => options.AddPolicy(
                   _defaultCorsPolicyName,
                   builder => builder
                       .WithOrigins(
                           // App:CorsOrigins in appsettings.json can contain more than one address separated by comma.
                           Configuration["App:CorsOrigins"]
                               .Split(",", StringSplitOptions.RemoveEmptyEntries)
                               .Select(o => o.RemovePostFix("/"))
                               .ToArray()
                       )
                       .AllowAnyHeader()
                       .AllowAnyMethod()
                       .AllowCredentials()
               )
           );

            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings").GetSection("Secret").Value;

            var key = Encoding.ASCII.GetBytes(appSettingsSection);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,

                };
            });

            services.AddAuthorization(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme).RequireAuthenticatedUser().Build();
            });

            services.AddIdentity<User, Role>()
             .AddUserStore<UserStore>()
             .AddRoleStore<RoleStore>()
             .AddUserManager<UserManager>()
             .AddRoleManager<RoleManager>()
             .AddSignInManager<SignInManager>()
             .AddEntityFrameworkStores<DataContext>()
             .AddDefaultTokenProviders();

            // Identity Services
            services.AddScoped<IUserStore<User>, UserStore>();
            services.AddScoped<IRoleStore<Role>, RoleStore>();

            services.AddScoped<UserManager, UserManager>();
            services.AddScoped<RoleManager, RoleManager>();

            // configure DI for application services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<ISmsSender, EmailService>();
            services.AddScoped<INotificationService, NotificationService>();
            services.AddScoped<IFileService, FileService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ITransportService, TransportService>();
            services.AddScoped<Audit.Service.Interfaces.IUserAuditService, UserAuditService>();
            services.AddScoped<IDistributionService, DistributionService>();
            services.AddScoped<IExpenditureTypeService, ExpenditureTypeService>();
            services.AddScoped<IOrganismService, OrganismService>();
            services.AddScoped<ISolicitationSubsidyService, SolicitationSubsidyService>();
            services.AddScoped<IHolidayService, HolidayService>();
            services.AddScoped<IProvinceService, ProvinceService>();
            services.AddScoped<ICityService, CityService>();
            services.AddScoped<IPlaceService,PlaceService>();
            services.AddScoped<ICountryService, CountryService>();
            services.AddScoped<ICodeLiquidationService, CodeLiquidationService>();
            services.AddScoped<IExpenditureService,ExpenditureService>();
            services.AddScoped<IDestinyService, DestinyService>();
            services.AddScoped<IStateService, StateService>();
            services.AddScoped<IAspNetRolesService, AspNetRolesService>();
            services.AddScoped<IAspNetUserRolesService, AspNetUserRolesService>();
            services.AddScoped<ISupervisorUserAgentService, SupervisorUserAgentService>();
            services.AddScoped<ISupplementaryCityService, SupplementaryCityService>();
            services.AddScoped<ISolcitationSubsidyProcedure, SolicitationSubsidyProcedure>();
            services.AddScoped<ISolicitationStateService, SolicitationStateService>();
            //sender Email
            // Add application services.
            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<ISmsSender, EmailService>();
            services.Configure<AuthMessageSenderOptions>(Configuration);
            //Validation
            services.AddTransient<IValidator<SaveUserDto>, UserValidator>();
            services.AddTransient<IValidator<LoginDto>, LoginValidator>();
            services.AddTransient<IValidator<CategoryBaseDto>, CategoryValidator>();
            services.AddTransient<IValidator<DistributionBaseDto>, DistributionValidator>();
            services.AddTransient<IValidator<TransportBaseDto>, TransportValidator>();
            services.AddTransient<IValidator<ExpenditureTypeBaseDto>, ExpenditureTypeValidator>();
            services.AddTransient<IValidator<OrganismBaseDto>, OrganismValidator>();
            services.AddTransient<IValidator<CreateUserDto>, UserCreateValidator>();
            services.AddTransient<IValidator<SolicitationSubsidyBaseDto>, SolicitationSubsidyValidator>();
            services.AddTransient<IValidator<HolidayBaseDto>, HolidayValidator>();

            services.AddDirectoryBrowser();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            var supportedCultures = new[]
            {
                new CultureInfo("es-ES"),
                new CultureInfo("ar")
            };

            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture("es-ES"),
                // Formatting numbers, dates, etc.
                SupportedCultures = supportedCultures,
                // UI strings that we have localized.
                SupportedUICultures = supportedCultures
            });

            app.UseDefaultFiles();

            var staticFileDirectory =
                Path.Combine(FileService.StaticFilesDirectory);

            if (!Directory.Exists(staticFileDirectory))
            {
                Directory.CreateDirectory(staticFileDirectory);
            }

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(staticFileDirectory),
                RequestPath = "/StaticFiles"
            });

            app.UseDirectoryBrowser(new DirectoryBrowserOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(staticFileDirectory, "Profile")),
                RequestPath = "/StaticFiles"
            });

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());

            app.UseAuthentication();
           
            app.UseStaticHttpContext();

            app.UseMvc();
        }
    }
}
