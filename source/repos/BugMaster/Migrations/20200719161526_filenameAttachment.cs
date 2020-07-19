using Microsoft.EntityFrameworkCore.Migrations;

namespace BugMaster.Migrations
{
    public partial class filenameAttachment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Note_Defect_DefectId",
                table: "Note");

            migrationBuilder.AlterColumn<int>(
                name: "DefectId",
                table: "Note",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "Attachment",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Note_Defect_DefectId",
                table: "Note",
                column: "DefectId",
                principalTable: "Defect",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Note_Defect_DefectId",
                table: "Note");

            migrationBuilder.DropColumn(
                name: "FileName",
                table: "Attachment");

            migrationBuilder.AlterColumn<int>(
                name: "DefectId",
                table: "Note",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Note_Defect_DefectId",
                table: "Note",
                column: "DefectId",
                principalTable: "Defect",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
