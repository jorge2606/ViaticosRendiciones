using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class AddForeinkeytoDistributionUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "DistributionId",
                table: "Distributions",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OrganismId",
                table: "Distributions",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Distributions_DistributionId",
                table: "Distributions",
                column: "DistributionId");

            migrationBuilder.CreateIndex(
                name: "IX_Distributions_OrganismId",
                table: "Distributions",
                column: "OrganismId");

            migrationBuilder.AddForeignKey(
                name: "FK_Distributions_Distributions_DistributionId",
                table: "Distributions",
                column: "DistributionId",
                principalTable: "Distributions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Distributions_Organisms_OrganismId",
                table: "Distributions",
                column: "OrganismId",
                principalTable: "Organisms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Distributions_Distributions_DistributionId",
                table: "Distributions");

            migrationBuilder.DropForeignKey(
                name: "FK_Distributions_Organisms_OrganismId",
                table: "Distributions");

            migrationBuilder.DropIndex(
                name: "IX_Distributions_DistributionId",
                table: "Distributions");

            migrationBuilder.DropIndex(
                name: "IX_Distributions_OrganismId",
                table: "Distributions");

            migrationBuilder.DropColumn(
                name: "DistributionId",
                table: "Distributions");

            migrationBuilder.DropColumn(
                name: "OrganismId",
                table: "Distributions");
        }
    }
}
