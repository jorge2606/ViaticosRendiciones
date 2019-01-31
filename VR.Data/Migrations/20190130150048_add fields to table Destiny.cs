using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class addfieldstotableDestiny : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdvanceCategory",
                table: "SolicitationSubsidies");

            migrationBuilder.DropColumn(
                name: "PercentageCodeLiquidation",
                table: "SolicitationSubsidies");

            migrationBuilder.AddColumn<decimal>(
                name: "AdvanceCategory",
                table: "Destinies",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PercentageCodeLiquidation",
                table: "Destinies",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdvanceCategory",
                table: "Destinies");

            migrationBuilder.DropColumn(
                name: "PercentageCodeLiquidation",
                table: "Destinies");

            migrationBuilder.AddColumn<decimal>(
                name: "AdvanceCategory",
                table: "SolicitationSubsidies",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PercentageCodeLiquidation",
                table: "SolicitationSubsidies",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
