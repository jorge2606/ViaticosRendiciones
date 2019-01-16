using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class ProvinceIdtablesolicitationSubsidy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProvinceId",
                table: "SolicitationSubsidies",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SolicitationSubsidies_ProvinceId",
                table: "SolicitationSubsidies",
                column: "ProvinceId");

            migrationBuilder.AddForeignKey(
                name: "FK_SolicitationSubsidies_Provinces_ProvinceId",
                table: "SolicitationSubsidies",
                column: "ProvinceId",
                principalTable: "Provinces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SolicitationSubsidies_Provinces_ProvinceId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropIndex(
                name: "IX_SolicitationSubsidies_ProvinceId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "ProvinceId",
                table: "SolicitationSubsidies");
        }
    }
}
