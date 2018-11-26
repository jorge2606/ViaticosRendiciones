using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class AddForeinkeytoDistributionOrganism : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Distributions_Distributions_DistributionId",
                table: "Distributions");

            migrationBuilder.DropIndex(
                name: "IX_Distributions_DistributionId",
                table: "Distributions");

            migrationBuilder.DropColumn(
                name: "DistributionId",
                table: "Distributions");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "DistributionId",
                table: "Distributions",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Distributions_DistributionId",
                table: "Distributions",
                column: "DistributionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Distributions_Distributions_DistributionId",
                table: "Distributions",
                column: "DistributionId",
                principalTable: "Distributions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
