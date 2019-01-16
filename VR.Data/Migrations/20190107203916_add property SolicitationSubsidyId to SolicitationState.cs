using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class addpropertySolicitationSubsidyIdtoSolicitationState : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SolicitationSubsidyId",
                table: "SolicitationStates",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_SolicitationStates_SolicitationSubsidyId",
                table: "SolicitationStates",
                column: "SolicitationSubsidyId");

            migrationBuilder.AddForeignKey(
                name: "FK_SolicitationStates_SolicitationSubsidies_SolicitationSubsidyId",
                table: "SolicitationStates",
                column: "SolicitationSubsidyId",
                principalTable: "SolicitationSubsidies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SolicitationStates_SolicitationSubsidies_SolicitationSubsidyId",
                table: "SolicitationStates");

            migrationBuilder.DropIndex(
                name: "IX_SolicitationStates_SolicitationSubsidyId",
                table: "SolicitationStates");

            migrationBuilder.DropColumn(
                name: "SolicitationSubsidyId",
                table: "SolicitationStates");
        }
    }
}
