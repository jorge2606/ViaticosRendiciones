using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class addtablesSolicitationSubsidies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SolicitationSubsidies",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CostMobility = table.Column<double>(nullable: false),
                    CostFuel = table.Column<double>(nullable: false),
                    CostCommunication = table.Column<double>(nullable: false),
                    UnexpectedCircumstance = table.Column<double>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    PlaceId = table.Column<Guid>(nullable: false),
                    DestinityId = table.Column<Guid>(nullable: false),
                    TransportId = table.Column<Guid>(nullable: false),
                    MotiveId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SolicitationSubsidies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SolicitationSubsidies_Destinities_DestinityId",
                        column: x => x.DestinityId,
                        principalTable: "Destinities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SolicitationSubsidies_Motives_MotiveId",
                        column: x => x.MotiveId,
                        principalTable: "Motives",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SolicitationSubsidies_Places_PlaceId",
                        column: x => x.PlaceId,
                        principalTable: "Places",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SolicitationSubsidies_Transports_TransportId",
                        column: x => x.TransportId,
                        principalTable: "Transports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SolicitationSubsidies_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SolicitationSubsidies_DestinityId",
                table: "SolicitationSubsidies",
                column: "DestinityId");

            migrationBuilder.CreateIndex(
                name: "IX_SolicitationSubsidies_MotiveId",
                table: "SolicitationSubsidies",
                column: "MotiveId");

            migrationBuilder.CreateIndex(
                name: "IX_SolicitationSubsidies_PlaceId",
                table: "SolicitationSubsidies",
                column: "PlaceId");

            migrationBuilder.CreateIndex(
                name: "IX_SolicitationSubsidies_TransportId",
                table: "SolicitationSubsidies",
                column: "TransportId");

            migrationBuilder.CreateIndex(
                name: "IX_SolicitationSubsidies_UserId",
                table: "SolicitationSubsidies",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SolicitationSubsidies");
        }
    }
}
