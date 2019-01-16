using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class removefielddescriptionfromtableExpenditureType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "ExpenditureTypes");

            migrationBuilder.AddColumn<Guid>(
                name: "ExpenditureTypeId",
                table: "Expenditures",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "SolicitationSubsidyId",
                table: "Expenditures",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Expenditures_ExpenditureTypeId",
                table: "Expenditures",
                column: "ExpenditureTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Expenditures_SolicitationSubsidyId",
                table: "Expenditures",
                column: "SolicitationSubsidyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Expenditures_ExpenditureTypes_ExpenditureTypeId",
                table: "Expenditures",
                column: "ExpenditureTypeId",
                principalTable: "ExpenditureTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Expenditures_SolicitationSubsidies_SolicitationSubsidyId",
                table: "Expenditures",
                column: "SolicitationSubsidyId",
                principalTable: "SolicitationSubsidies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expenditures_ExpenditureTypes_ExpenditureTypeId",
                table: "Expenditures");

            migrationBuilder.DropForeignKey(
                name: "FK_Expenditures_SolicitationSubsidies_SolicitationSubsidyId",
                table: "Expenditures");

            migrationBuilder.DropIndex(
                name: "IX_Expenditures_ExpenditureTypeId",
                table: "Expenditures");

            migrationBuilder.DropIndex(
                name: "IX_Expenditures_SolicitationSubsidyId",
                table: "Expenditures");

            migrationBuilder.DropColumn(
                name: "ExpenditureTypeId",
                table: "Expenditures");

            migrationBuilder.DropColumn(
                name: "SolicitationSubsidyId",
                table: "Expenditures");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ExpenditureTypes",
                nullable: true);
        }
    }
}
