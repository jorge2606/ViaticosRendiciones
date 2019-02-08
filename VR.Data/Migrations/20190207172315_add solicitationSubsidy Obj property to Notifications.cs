using Microsoft.EntityFrameworkCore.Migrations;

namespace VR.Data.Migrations
{
    public partial class addsolicitationSubsidyObjpropertytoNotifications : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Notifications_SolicitationSubsidyId",
                table: "Notifications",
                column: "SolicitationSubsidyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_SolicitationSubsidies_SolicitationSubsidyId",
                table: "Notifications",
                column: "SolicitationSubsidyId",
                principalTable: "SolicitationSubsidies",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_SolicitationSubsidies_SolicitationSubsidyId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_SolicitationSubsidyId",
                table: "Notifications");
        }
    }
}
