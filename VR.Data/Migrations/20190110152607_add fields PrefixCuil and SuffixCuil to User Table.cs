using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class addfieldsPrefixCuilandSuffixCuiltoUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cuil",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "PrefixCuil",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SuffixCuil",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PrefixCuil",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SuffixCuil",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "Cuil",
                table: "AspNetUsers",
                nullable: true);
        }
    }
}
