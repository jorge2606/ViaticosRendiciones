using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class Citiestocity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SupplementaryCityId",
                table: "Cities",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Cities_SupplementaryCityId",
                table: "Cities",
                column: "SupplementaryCityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cities_SupplementaryCities_SupplementaryCityId",
                table: "Cities",
                column: "SupplementaryCityId",
                principalTable: "SupplementaryCities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cities_SupplementaryCities_SupplementaryCityId",
                table: "Cities");

            migrationBuilder.DropIndex(
                name: "IX_Cities_SupplementaryCityId",
                table: "Cities");

            migrationBuilder.DropColumn(
                name: "SupplementaryCityId",
                table: "Cities");
        }
    }
}
