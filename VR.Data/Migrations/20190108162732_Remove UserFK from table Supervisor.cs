using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class RemoveUserFKfromtableSupervisor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Supervisors_AspNetUsers_AgentId",
                table: "Supervisors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Supervisors",
                table: "Supervisors");

            migrationBuilder.DropIndex(
                name: "IX_Supervisors_AgentId",
                table: "Supervisors");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "Supervisors",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Supervisors",
                table: "Supervisors",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Supervisors",
                table: "Supervisors");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Supervisors");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Supervisors",
                table: "Supervisors",
                column: "SupervisorId");

            migrationBuilder.CreateIndex(
                name: "IX_Supervisors_AgentId",
                table: "Supervisors",
                column: "AgentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Supervisors_AspNetUsers_AgentId",
                table: "Supervisors",
                column: "AgentId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
