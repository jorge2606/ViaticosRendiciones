using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class addfieldSolicitationSubsidytoDestiny : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SolicitationSubsidyId",
                table: "Destinies",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Destinies_SolicitationSubsidyId",
                table: "Destinies",
                column: "SolicitationSubsidyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Destinies_SolicitationSubsidies_SolicitationSubsidyId",
                table: "Destinies",
                column: "SolicitationSubsidyId",
                principalTable: "SolicitationSubsidies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Destinies_SolicitationSubsidies_SolicitationSubsidyId",
                table: "Destinies");

            migrationBuilder.DropIndex(
                name: "IX_Destinies_SolicitationSubsidyId",
                table: "Destinies");

            migrationBuilder.DropColumn(
                name: "SolicitationSubsidyId",
                table: "Destinies");
        }
    }
}
