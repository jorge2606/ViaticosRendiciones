using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class addobjectsCityandProvincetoTableDestiny : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Destinies_CityId",
                table: "Destinies",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Destinies_ProvinceId",
                table: "Destinies",
                column: "ProvinceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Destinies_Cities_CityId",
                table: "Destinies",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Destinies_Provinces_ProvinceId",
                table: "Destinies",
                column: "ProvinceId",
                principalTable: "Provinces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Destinies_Cities_CityId",
                table: "Destinies");

            migrationBuilder.DropForeignKey(
                name: "FK_Destinies_Provinces_ProvinceId",
                table: "Destinies");

            migrationBuilder.DropIndex(
                name: "IX_Destinies_CityId",
                table: "Destinies");

            migrationBuilder.DropIndex(
                name: "IX_Destinies_ProvinceId",
                table: "Destinies");
        }
    }
}
