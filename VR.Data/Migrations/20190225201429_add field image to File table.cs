using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class addfieldimagetoFiletable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Expenditures");

            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "Files",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Files");

            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "Expenditures",
                nullable: true);
        }
    }
}
