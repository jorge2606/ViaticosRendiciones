﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using VR.Data;

namespace VR.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20190130144421_add fields to SolicitationSubsidy")]
    partial class addfieldstoSolicitationSubsidy
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<Guid>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<System.Guid>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<Guid>("UserId");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<System.Guid>", b =>
                {
                    b.Property<Guid>("UserId");

                    b.Property<Guid>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<System.Guid>", b =>
                {
                    b.Property<Guid>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("VR.Data.Model.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("Advance");

                    b.Property<string>("Description")
                        .HasMaxLength(250);

                    b.Property<bool>("IsDeleted");

                    b.Property<string>("Name")
                        .HasMaxLength(50);

                    b.Property<int>("Order");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("VR.Data.Model.City", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<bool>("IsDeleted");

                    b.Property<string>("Name");

                    b.Property<Guid>("ProvinceId");

                    b.Property<Guid?>("SupplementaryCityId");

                    b.HasKey("Id");

                    b.HasIndex("ProvinceId");

                    b.HasIndex("SupplementaryCityId");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("VR.Data.Model.CodeLiquidation", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("Percentage");

                    b.Property<Guid>("PlaceId");

                    b.HasKey("Id");

                    b.HasIndex("PlaceId");

                    b.ToTable("CodeLiquidations");
                });

            modelBuilder.Entity("VR.Data.Model.Country", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Iso3");

                    b.Property<string>("Name");

                    b.Property<int>("NumCode");

                    b.Property<Guid?>("PlaceId");

                    b.Property<string>("PrintableName");

                    b.HasKey("Id");

                    b.HasIndex("PlaceId");

                    b.ToTable("Countries");
                });

            modelBuilder.Entity("VR.Data.Model.Destiny", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("CategoryId");

                    b.Property<Guid?>("CityId");

                    b.Property<Guid>("CodeLiquidationId");

                    b.Property<Guid?>("CountryId");

                    b.Property<int>("Days");

                    b.Property<Guid?>("ProvinceId");

                    b.Property<Guid>("SolicitationSubsidyId");

                    b.Property<DateTime>("StartDate");

                    b.Property<Guid>("TransportId");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("CityId");

                    b.HasIndex("CodeLiquidationId");

                    b.HasIndex("CountryId");

                    b.HasIndex("ProvinceId");

                    b.HasIndex("SolicitationSubsidyId");

                    b.HasIndex("TransportId");

                    b.ToTable("Destinies");
                });

            modelBuilder.Entity("VR.Data.Model.Distribution", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<Guid?>("OrganismId");

                    b.HasKey("Id");

                    b.HasIndex("OrganismId");

                    b.ToTable("Distributions");
                });

            modelBuilder.Entity("VR.Data.Model.Expenditure", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("Amount");

                    b.Property<string>("Description");

                    b.Property<Guid>("ExpenditureTypeId");

                    b.Property<Guid>("SolicitationSubsidyId");

                    b.HasKey("Id");

                    b.HasIndex("ExpenditureTypeId");

                    b.HasIndex("SolicitationSubsidyId");

                    b.ToTable("Expenditures");
                });

            modelBuilder.Entity("VR.Data.Model.ExpenditureType", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("ExpenditureTypes");
                });

            modelBuilder.Entity("VR.Data.Model.File", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DeleteTime");

                    b.Property<string>("MimeType");

                    b.Property<string>("Path");

                    b.Property<DateTime>("UploadTime");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.ToTable("Files");
                });

            modelBuilder.Entity("VR.Data.Model.Holiday", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date")
                        .HasColumnType("Date");

                    b.Property<string>("Description");

                    b.HasKey("Id");

                    b.ToTable("Holidays");
                });

            modelBuilder.Entity("VR.Data.Model.Motive", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.HasKey("Id");

                    b.ToTable("Motives");
                });

            modelBuilder.Entity("VR.Data.Model.Notification", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreationTime");

                    b.Property<Guid>("CreatorUserId");

                    b.Property<Guid>("EntityId");

                    b.Property<DateTime?>("LastModificationTime");

                    b.Property<Guid>("LastModifierUserId");

                    b.Property<int>("NotificationType");

                    b.Property<bool>("Read");

                    b.Property<string>("TextData");

                    b.Property<string>("Tittle");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("VR.Data.Model.Organism", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Organisms");
                });

            modelBuilder.Entity("VR.Data.Model.Place", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<int?>("Order");

                    b.HasKey("Id");

                    b.ToTable("Places");
                });

            modelBuilder.Entity("VR.Data.Model.Province", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("CountryId");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("DistrictCity");

                    b.Property<bool>("IsDeleted");

                    b.Property<string>("Name");

                    b.Property<Guid?>("PlaceId");

                    b.Property<long>("Poblation");

                    b.Property<string>("PrintableName");

                    b.HasKey("Id");

                    b.HasIndex("CountryId");

                    b.HasIndex("PlaceId");

                    b.ToTable("Provinces");
                });

            modelBuilder.Entity("VR.Data.Model.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("VR.Data.Model.SolicitationState", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("ChangeDate");

                    b.Property<string>("FileNumber");

                    b.Property<string>("MotiveReject");

                    b.Property<Guid>("SolicitationSubsidyId");

                    b.Property<Guid>("StateId");

                    b.HasKey("Id");

                    b.HasIndex("SolicitationSubsidyId");

                    b.HasIndex("StateId");

                    b.ToTable("SolicitationStates");
                });

            modelBuilder.Entity("VR.Data.Model.SolicitationSubsidy", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("AdvanceCategory");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("Date");

                    b.Property<string>("Motive");

                    b.Property<decimal>("PercentageCodeLiquidation");

                    b.Property<decimal>("Total");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("SolicitationSubsidies");
                });

            modelBuilder.Entity("VR.Data.Model.State", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.HasKey("Id");

                    b.ToTable("States");
                });

            modelBuilder.Entity("VR.Data.Model.SupervisorUserAgent", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("AgentId");

                    b.Property<Guid>("SupervisorId");

                    b.HasKey("Id");

                    b.HasIndex("AgentId");

                    b.HasIndex("SupervisorId");

                    b.ToTable("SupervisorUserAgents");
                });

            modelBuilder.Entity("VR.Data.Model.SupplementaryCity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("CityId");

                    b.Property<Guid>("DestinyId");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.HasIndex("DestinyId");

                    b.ToTable("SupplementaryCities");
                });

            modelBuilder.Entity("VR.Data.Model.Transport", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Brand");

                    b.Property<string>("CarPlate");

                    b.Property<string>("Model");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.ToTable("Transports");
                });

            modelBuilder.Entity("VR.Data.Model.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<Guid>("CategoryId");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<Guid?>("DistributionId");

                    b.Property<int>("Dni");

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<int>("PrefixCuil");

                    b.Property<string>("SecurityStamp");

                    b.Property<int>("SuffixCuil");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("DistributionId");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<System.Guid>", b =>
                {
                    b.HasOne("VR.Data.Model.Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<System.Guid>", b =>
                {
                    b.HasOne("VR.Data.Model.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<System.Guid>", b =>
                {
                    b.HasOne("VR.Data.Model.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<System.Guid>", b =>
                {
                    b.HasOne("VR.Data.Model.Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("VR.Data.Model.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<System.Guid>", b =>
                {
                    b.HasOne("VR.Data.Model.User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("VR.Data.Model.City", b =>
                {
                    b.HasOne("VR.Data.Model.Province", "Province")
                        .WithMany()
                        .HasForeignKey("ProvinceId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("VR.Data.Model.SupplementaryCity")
                        .WithMany("Cities")
                        .HasForeignKey("SupplementaryCityId");
                });

            modelBuilder.Entity("VR.Data.Model.CodeLiquidation", b =>
                {
                    b.HasOne("VR.Data.Model.Place", "Place")
                        .WithMany()
                        .HasForeignKey("PlaceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("VR.Data.Model.Country", b =>
                {
                    b.HasOne("VR.Data.Model.Place", "Place")
                        .WithMany()
                        .HasForeignKey("PlaceId");
                });

            modelBuilder.Entity("VR.Data.Model.Destiny", b =>
                {
                    b.HasOne("VR.Data.Model.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("VR.Data.Model.City", "City")
                        .WithMany()
                        .HasForeignKey("CityId");

                    b.HasOne("VR.Data.Model.CodeLiquidation", "CodeLiquidation")
                        .WithMany()
                        .HasForeignKey("CodeLiquidationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("VR.Data.Model.Country", "Country")
                        .WithMany()
                        .HasForeignKey("CountryId");

                    b.HasOne("VR.Data.Model.Province", "Province")
                        .WithMany()
                        .HasForeignKey("ProvinceId");

                    b.HasOne("VR.Data.Model.SolicitationSubsidy", "SolicitationSubsidy")
                        .WithMany("Destinies")
                        .HasForeignKey("SolicitationSubsidyId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("VR.Data.Model.Transport", "Transport")
                        .WithMany()
                        .HasForeignKey("TransportId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("VR.Data.Model.Distribution", b =>
                {
                    b.HasOne("VR.Data.Model.Organism", "Organism")
                        .WithMany("Distributions")
                        .HasForeignKey("OrganismId");
                });

            modelBuilder.Entity("VR.Data.Model.Expenditure", b =>
                {
                    b.HasOne("VR.Data.Model.ExpenditureType", "ExpenditureType")
                        .WithMany()
                        .HasForeignKey("ExpenditureTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("VR.Data.Model.SolicitationSubsidy", "SolicitationSubsidy")
                        .WithMany("Expenditures")
                        .HasForeignKey("SolicitationSubsidyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("VR.Data.Model.Notification", b =>
                {
                    b.HasOne("VR.Data.Model.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("VR.Data.Model.Province", b =>
                {
                    b.HasOne("VR.Data.Model.Country", "Country")
                        .WithMany()
                        .HasForeignKey("CountryId");

                    b.HasOne("VR.Data.Model.Place", "Place")
                        .WithMany()
                        .HasForeignKey("PlaceId");
                });

            modelBuilder.Entity("VR.Data.Model.SolicitationState", b =>
                {
                    b.HasOne("VR.Data.Model.SolicitationSubsidy", "SolicitationSubsidy")
                        .WithMany("SolicitationStates")
                        .HasForeignKey("SolicitationSubsidyId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("VR.Data.Model.State", "State")
                        .WithMany()
                        .HasForeignKey("StateId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("VR.Data.Model.SolicitationSubsidy", b =>
                {
                    b.HasOne("VR.Data.Model.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("VR.Data.Model.SupervisorUserAgent", b =>
                {
                    b.HasOne("VR.Data.Model.User", "Agents")
                        .WithMany()
                        .HasForeignKey("AgentId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("VR.Data.Model.User", "Supervisors")
                        .WithMany()
                        .HasForeignKey("SupervisorId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("VR.Data.Model.SupplementaryCity", b =>
                {
                    b.HasOne("VR.Data.Model.City", "City")
                        .WithMany()
                        .HasForeignKey("CityId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("VR.Data.Model.Destiny", "Destiny")
                        .WithMany("SupplementaryCities")
                        .HasForeignKey("DestinyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("VR.Data.Model.User", b =>
                {
                    b.HasOne("VR.Data.Model.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("VR.Data.Model.Distribution", "Distribution")
                        .WithMany("Users")
                        .HasForeignKey("DistributionId");
                });
#pragma warning restore 612, 618
        }
    }
}
