using Microsoft.EntityFrameworkCore.Migrations;

namespace BugMaster.Migrations
{
    public partial class notes1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_AspNetUsers_AddedbyId",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Defect_DefectId",
                table: "Comment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Comment",
                table: "Comment");

            migrationBuilder.RenameTable(
                name: "Comment",
                newName: "Note");

            migrationBuilder.RenameIndex(
                name: "IX_Comment_DefectId",
                table: "Note",
                newName: "IX_Note_DefectId");

            migrationBuilder.RenameIndex(
                name: "IX_Comment_AddedbyId",
                table: "Note",
                newName: "IX_Note_AddedbyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Note",
                table: "Note",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Note_AspNetUsers_AddedbyId",
                table: "Note",
                column: "AddedbyId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Note_Defect_DefectId",
                table: "Note",
                column: "DefectId",
                principalTable: "Defect",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Note_AspNetUsers_AddedbyId",
                table: "Note");

            migrationBuilder.DropForeignKey(
                name: "FK_Note_Defect_DefectId",
                table: "Note");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Note",
                table: "Note");

            migrationBuilder.RenameTable(
                name: "Note",
                newName: "Comment");

            migrationBuilder.RenameIndex(
                name: "IX_Note_DefectId",
                table: "Comment",
                newName: "IX_Comment_DefectId");

            migrationBuilder.RenameIndex(
                name: "IX_Note_AddedbyId",
                table: "Comment",
                newName: "IX_Comment_AddedbyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Comment",
                table: "Comment",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_AspNetUsers_AddedbyId",
                table: "Comment",
                column: "AddedbyId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Defect_DefectId",
                table: "Comment",
                column: "DefectId",
                principalTable: "Defect",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
