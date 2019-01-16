using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class ExpenditureIdinExpenditureandrefactortablesolicitationSubsidy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SolicitationSubsidies_Destinies_DestinyId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropForeignKey(
                name: "FK_SolicitationSubsidies_Motives_MotiveId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "CostCommunication",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "CostFuel",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "CostMobility",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "UnexpectedCircumstance",
                table: "SolicitationSubsidies");

            migrationBuilder.RenameColumn(
                name: "MotiveId",
                table: "SolicitationSubsidies",
                newName: "CityId");

            migrationBuilder.RenameIndex(
                name: "IX_SolicitationSubsidies_MotiveId",
                table: "SolicitationSubsidies",
                newName: "IX_SolicitationSubsidies_CityId");

            migrationBuilder.AlterColumn<Guid>(
                name: "DestinyId",
                table: "SolicitationSubsidies",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "SolicitationSubsidies",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "CodeLiquidation",
                table: "SolicitationSubsidies",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Days",
                table: "SolicitationSubsidies",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Motive",
                table: "SolicitationSubsidies",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "SolicitationSubsidies",
                type: "Date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "SolicitationSubsidyId",
                table: "Expenditures",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_SolicitationSubsidies_CategoryId",
                table: "SolicitationSubsidies",
                column: "CategoryId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_SolicitationSubsidies_Categories_CategoryId",
                table: "SolicitationSubsidies",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SolicitationSubsidies_Cities_CityId",
                table: "SolicitationSubsidies",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SolicitationSubsidies_Destinies_DestinyId",
                table: "SolicitationSubsidies",
                column: "DestinyId",
                principalTable: "Destinies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expenditures_SolicitationSubsidies_SolicitationSubsidyId",
                table: "Expenditures");

            migrationBuilder.DropForeignKey(
                name: "FK_SolicitationSubsidies_Categories_CategoryId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropForeignKey(
                name: "FK_SolicitationSubsidies_Cities_CityId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropForeignKey(
                name: "FK_SolicitationSubsidies_Destinies_DestinyId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropIndex(
                name: "IX_SolicitationSubsidies_CategoryId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropIndex(
                name: "IX_Expenditures_SolicitationSubsidyId",
                table: "Expenditures");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "CodeLiquidation",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "Days",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "Motive",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "SolicitationSubsidyId",
                table: "Expenditures");

            migrationBuilder.RenameColumn(
                name: "CityId",
                table: "SolicitationSubsidies",
                newName: "MotiveId");

            migrationBuilder.RenameIndex(
                name: "IX_SolicitationSubsidies_CityId",
                table: "SolicitationSubsidies",
                newName: "IX_SolicitationSubsidies_MotiveId");

            migrationBuilder.AlterColumn<Guid>(
                name: "DestinyId",
                table: "SolicitationSubsidies",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddColumn<double>(
                name: "CostCommunication",
                table: "SolicitationSubsidies",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "CostFuel",
                table: "SolicitationSubsidies",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "CostMobility",
                table: "SolicitationSubsidies",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "UnexpectedCircumstance",
                table: "SolicitationSubsidies",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddForeignKey(
                name: "FK_SolicitationSubsidies_Destinies_DestinyId",
                table: "SolicitationSubsidies",
                column: "DestinyId",
                principalTable: "Destinies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SolicitationSubsidies_Motives_MotiveId",
                table: "SolicitationSubsidies",
                column: "MotiveId",
                principalTable: "Motives",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
