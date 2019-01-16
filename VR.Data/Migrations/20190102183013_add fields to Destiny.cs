using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class addfieldstoDestiny : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "Destinies",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "CityId",
                table: "Destinies",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CodeLiquidationId",
                table: "Destinies",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "CountryId",
                table: "Destinies",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "Days",
                table: "Destinies",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "ProvinceId",
                table: "Destinies",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Destinies",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "TransportId",
                table: "Destinies",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Destinies_CategoryId",
                table: "Destinies",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Destinies_CodeLiquidationId",
                table: "Destinies",
                column: "CodeLiquidationId");

            migrationBuilder.CreateIndex(
                name: "IX_Destinies_CountryId",
                table: "Destinies",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_Destinies_TransportId",
                table: "Destinies",
                column: "TransportId");

            migrationBuilder.AddForeignKey(
                name: "FK_Destinies_Categories_CategoryId",
                table: "Destinies",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Destinies_CodeLiquidations_CodeLiquidationId",
                table: "Destinies",
                column: "CodeLiquidationId",
                principalTable: "CodeLiquidations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Destinies_Countries_CountryId",
                table: "Destinies",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Destinies_Transports_TransportId",
                table: "Destinies",
                column: "TransportId",
                principalTable: "Transports",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Destinies_Categories_CategoryId",
                table: "Destinies");

            migrationBuilder.DropForeignKey(
                name: "FK_Destinies_CodeLiquidations_CodeLiquidationId",
                table: "Destinies");

            migrationBuilder.DropForeignKey(
                name: "FK_Destinies_Countries_CountryId",
                table: "Destinies");

            migrationBuilder.DropForeignKey(
                name: "FK_Destinies_Transports_TransportId",
                table: "Destinies");

            migrationBuilder.DropIndex(
                name: "IX_Destinies_CategoryId",
                table: "Destinies");

            migrationBuilder.DropIndex(
                name: "IX_Destinies_CodeLiquidationId",
                table: "Destinies");

            migrationBuilder.DropIndex(
                name: "IX_Destinies_CountryId",
                table: "Destinies");

            migrationBuilder.DropIndex(
                name: "IX_Destinies_TransportId",
                table: "Destinies");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Destinies");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "Destinies");

            migrationBuilder.DropColumn(
                name: "CodeLiquidationId",
                table: "Destinies");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "Destinies");

            migrationBuilder.DropColumn(
                name: "Days",
                table: "Destinies");

            migrationBuilder.DropColumn(
                name: "ProvinceId",
                table: "Destinies");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Destinies");

            migrationBuilder.DropColumn(
                name: "TransportId",
                table: "Destinies");
        }
    }
}
