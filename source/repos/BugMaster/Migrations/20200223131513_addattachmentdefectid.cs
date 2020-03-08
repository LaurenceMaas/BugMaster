using Microsoft.EntityFrameworkCore.Migrations;

namespace BugMaster.Migrations
{
    public partial class addattachmentdefectid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attachment_Defect_DefectId",
                table: "Attachment");

            migrationBuilder.AlterColumn<int>(
                name: "DefectId",
                table: "Attachment",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Attachment_Defect_DefectId",
                table: "Attachment",
                column: "DefectId",
                principalTable: "Defect",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attachment_Defect_DefectId",
                table: "Attachment");

            migrationBuilder.AlterColumn<int>(
                name: "DefectId",
                table: "Attachment",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Attachment_Defect_DefectId",
                table: "Attachment",
                column: "DefectId",
                principalTable: "Defect",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
