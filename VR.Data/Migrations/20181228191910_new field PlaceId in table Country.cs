using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class newfieldPlaceIdintableCountry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PlaceId",
                table: "Countries",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Countries_PlaceId",
                table: "Countries",
                column: "PlaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Countries_Places_PlaceId",
                table: "Countries",
                column: "PlaceId",
                principalTable: "Places",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Countries_Places_PlaceId",
                table: "Countries");

            migrationBuilder.DropIndex(
                name: "IX_Countries_PlaceId",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "PlaceId",
                table: "Countries");
        }
    }
}
