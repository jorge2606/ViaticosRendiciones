﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using VR.Web.Models;

namespace VR.Web.Migrations
{
    [DbContext(typeof(Models.DataContext))]
    [Migration("20180910130140_user_migration")]
    partial class user_migration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.2-rtm-30932")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("VR.Web.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("dni");

                    b.Property<string>("password");

                    b.Property<string>("token");

                    b.Property<string>("usuario");

                    b.HasKey("Id");

                    b.ToTable("AllUsers");
                });
#pragma warning restore 612, 618
        }
    }
}
