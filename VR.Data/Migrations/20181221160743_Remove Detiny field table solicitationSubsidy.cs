using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class RemoveDetinyfieldtablesolicitationSubsidy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SolicitationSubsidies_Destinies_DestinyId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropIndex(
                name: "IX_SolicitationSubsidies_DestinyId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "DestinyId",
                table: "SolicitationSubsidies");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "DestinyId",
                table: "SolicitationSubsidies",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SolicitationSubsidies_DestinyId",
                table: "SolicitationSubsidies",
                column: "DestinyId");

            migrationBuilder.AddForeignKey(
                name: "FK_SolicitationSubsidies_Destinies_DestinyId",
                table: "SolicitationSubsidies",
                column: "DestinyId",
                principalTable: "Destinies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
