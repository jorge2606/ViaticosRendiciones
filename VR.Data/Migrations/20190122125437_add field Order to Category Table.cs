using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class addfieldOrdertoCategoryTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "Categories",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SupplementaryCities_CityId",
                table: "SupplementaryCities",
                column: "CityId");

            migrationBuilder.AddForeignKey(
                name: "FK_SupplementaryCities_Cities_CityId",
                table: "SupplementaryCities",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SupplementaryCities_Cities_CityId",
                table: "SupplementaryCities");

            migrationBuilder.DropIndex(
                name: "IX_SupplementaryCities_CityId",
                table: "SupplementaryCities");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "Categories");
        }
    }
}
