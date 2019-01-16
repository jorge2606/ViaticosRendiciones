using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class removefieldoftableSolicitationSubsidy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SolicitationSubsidies_Categories_CategoryId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropForeignKey(
                name: "FK_SolicitationSubsidies_Cities_CityId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropForeignKey(
                name: "FK_SolicitationSubsidies_Places_PlaceId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropForeignKey(
                name: "FK_SolicitationSubsidies_Provinces_ProvinceId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropForeignKey(
                name: "FK_SolicitationSubsidies_Transports_TransportId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropIndex(
                name: "IX_SolicitationSubsidies_CategoryId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropIndex(
                name: "IX_SolicitationSubsidies_CityId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropIndex(
                name: "IX_SolicitationSubsidies_PlaceId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropIndex(
                name: "IX_SolicitationSubsidies_ProvinceId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropIndex(
                name: "IX_SolicitationSubsidies_TransportId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "CodeLiquidation",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "Days",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "PlaceId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "ProvinceId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "TransportId",
                table: "SolicitationSubsidies");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "SolicitationSubsidies",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "CityId",
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

            migrationBuilder.AddColumn<Guid>(
                name: "PlaceId",
                table: "SolicitationSubsidies",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "ProvinceId",
                table: "SolicitationSubsidies",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "SolicitationSubsidies",
                type: "Date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "TransportId",
                table: "SolicitationSubsidies",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_SolicitationSubsidies_CategoryId",
                table: "SolicitationSubsidies",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_SolicitationSubsidies_CityId",
                table: "SolicitationSubsidies",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_SolicitationSubsidies_PlaceId",
                table: "SolicitationSubsidies",
                column: "PlaceId");

            migrationBuilder.CreateIndex(
                name: "IX_SolicitationSubsidies_ProvinceId",
                table: "SolicitationSubsidies",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_SolicitationSubsidies_TransportId",
                table: "SolicitationSubsidies",
                column: "TransportId");

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
                name: "FK_SolicitationSubsidies_Places_PlaceId",
                table: "SolicitationSubsidies",
                column: "PlaceId",
                principalTable: "Places",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SolicitationSubsidies_Provinces_ProvinceId",
                table: "SolicitationSubsidies",
                column: "ProvinceId",
                principalTable: "Provinces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SolicitationSubsidies_Transports_TransportId",
                table: "SolicitationSubsidies",
                column: "TransportId",
                principalTable: "Transports",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
