using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class newpropertiesintableprovincePlaceIdandremoveInOutProvinceproperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InOutProvince",
                table: "Provinces");

            migrationBuilder.AddColumn<Guid>(
                name: "PlaceId",
                table: "Provinces",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Provinces_PlaceId",
                table: "Provinces",
                column: "PlaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Provinces_Places_PlaceId",
                table: "Provinces",
                column: "PlaceId",
                principalTable: "Places",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Provinces_Places_PlaceId",
                table: "Provinces");

            migrationBuilder.DropIndex(
                name: "IX_Provinces_PlaceId",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "PlaceId",
                table: "Provinces");

            migrationBuilder.AddColumn<Guid>(
                name: "InOutProvince",
                table: "Provinces",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
