using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using server.Extensions;
using server.IServices;
using server.Services;
using server.Models;
using AutoMapper;
using System;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;
using server.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Audit.Data;
using Audit.Core;
using Audit.Service;
using Microsoft.AspNetCore.Http;
using server.Helpers;
using server.models;
using Audit.EntityFramework;
using FluentValidation.AspNetCore;
using server.Dto;
using FluentValidation;

namespace server
{
    public class Startup
    {

        private const string _defaultCorsPolicyName = "localhost";

        public Startup(IConfiguration configuration, IServiceProvider serviceProvider)
        {
            Configuration = configuration;
            ServiceProvider = serviceProvider;
        }

        public IConfiguration Configuration { get; }
        public IServiceProvider ServiceProvider { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ASPDatabase")));
            services.AddDbContext<AuditContext>(options => options.UseSqlServer(Configuration.GetConnectionString("AuditDatabase")));

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            //services.AddHttpContextAccessor();

            //begin Audit config
            Audit.Core.Configuration.Setup()
                .UseEntityFramework(ef => ef
                    .UseDbContext<AuditContext>()
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

            // MVC
            services.AddMvc(
                options => options.Filters.Add(new CorsAuthorizationFilterFactory(_defaultCorsPolicyName))
            ).AddFluentValidation(fv =>
                {
                    //fv.RegisterValidatorsFromAssemblyContaining<UserValidator>();
                    //fv.RegisterValidatorsFromAssemblyContaining<UserValidator>();
                    fv.RunDefaultMvcValidationAfterFluentValidationExecutes = false;
                    fv.ImplicitlyValidateChildProperties = true;
                }
            );

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
            services.AddScoped<IEmailSender, EmailService>();
            services.AddScoped<ISmsSender, EmailService>();
            services.AddScoped<INotificationService, NotificationService>();
            services.AddScoped<IFileService, FileService>();
            services.AddScoped<Audit.Service.Interfaces.IUserService, UserAuditService>();

            //sender Email
            // Add application services.
            services.AddTransient<IEmailSender, EmailService>();
            services.AddTransient<ISmsSender, EmailService>();
            services.Configure<AuthMessageSenderOptions>(Configuration);
            //Validation
            services.AddTransient<IValidator<SaveUserDto>, UserValidator>();
            services.AddTransient<IValidator<LoginDto>, LoginValidator>();

            services.AddDirectoryBrowser();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
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
