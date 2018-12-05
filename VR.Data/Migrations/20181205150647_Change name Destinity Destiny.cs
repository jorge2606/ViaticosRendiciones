using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class ChangenameDestinityDestiny : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SolicitationSubsidies_Destinities_DestinityId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropTable(
                name: "Destinities");

            migrationBuilder.RenameColumn(
                name: "DestinityId",
                table: "SolicitationSubsidies",
                newName: "DestinyId");

            migrationBuilder.RenameIndex(
                name: "IX_SolicitationSubsidies_DestinityId",
                table: "SolicitationSubsidies",
                newName: "IX_SolicitationSubsidies_DestinyId");

            migrationBuilder.CreateTable(
                name: "Destinies",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Destinies", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_SolicitationSubsidies_Destinies_DestinyId",
                table: "SolicitationSubsidies",
                column: "DestinyId",
                principalTable: "Destinies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SolicitationSubsidies_Destinies_DestinyId",
                table: "SolicitationSubsidies");

            migrationBuilder.DropTable(
                name: "Destinies");

            migrationBuilder.RenameColumn(
                name: "DestinyId",
                table: "SolicitationSubsidies",
                newName: "DestinityId");

            migrationBuilder.RenameIndex(
                name: "IX_SolicitationSubsidies_DestinyId",
                table: "SolicitationSubsidies",
                newName: "IX_SolicitationSubsidies_DestinityId");

            migrationBuilder.CreateTable(
                name: "Destinities",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Destinities", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_SolicitationSubsidies_Destinities_DestinityId",
                table: "SolicitationSubsidies",
                column: "DestinityId",
                principalTable: "Destinities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
