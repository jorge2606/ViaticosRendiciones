using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class AddForeinkeytoDistributionUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "DistributionId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_DistributionId",
                table: "AspNetUsers",
                column: "DistributionId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Distributions_DistributionId",
                table: "AspNetUsers",
                column: "DistributionId",
                principalTable: "Distributions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Distributions_DistributionId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_DistributionId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DistributionId",
                table: "AspNetUsers");
        }
    }
}
