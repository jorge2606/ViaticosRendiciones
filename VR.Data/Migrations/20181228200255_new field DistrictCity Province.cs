using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class newfieldDistrictCityProvince : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CiudadDistrito",
                table: "Provinces",
                newName: "DistrictCity");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DistrictCity",
                table: "Provinces",
                newName: "CiudadDistrito");
        }
    }
}
