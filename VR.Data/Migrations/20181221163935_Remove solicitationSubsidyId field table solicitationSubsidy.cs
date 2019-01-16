using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class RemovesolicitationSubsidyIdfieldtablesolicitationSubsidy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expenditures_SolicitationSubsidies_SolicitationSubsidyId",
                table: "Expenditures");

            migrationBuilder.DropIndex(
                name: "IX_Expenditures_SolicitationSubsidyId",
                table: "Expenditures");

            migrationBuilder.DropColumn(
                name: "SolicitationSubsidyId",
                table: "Expenditures");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SolicitationSubsidyId",
                table: "Expenditures",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Expenditures_SolicitationSubsidyId",
                table: "Expenditures",
                column: "SolicitationSubsidyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Expenditures_SolicitationSubsidies_SolicitationSubsidyId",
                table: "Expenditures",
                column: "SolicitationSubsidyId",
                principalTable: "SolicitationSubsidies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
