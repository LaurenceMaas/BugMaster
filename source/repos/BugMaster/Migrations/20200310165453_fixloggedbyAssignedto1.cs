using Microsoft.EntityFrameworkCore.Migrations;

namespace BugMaster.Migrations
{
    public partial class fixloggedbyAssignedto1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_Defect_AspNetUsers_AssignToId1",
            //    table: "Defect");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_Defect_AspNetUsers_LoggedbyId1",
            //    table: "Defect");

            //migrationBuilder.DropIndex(
            //    name: "IX_Defect_AssignToId1",
            //    table: "Defect");

            //migrationBuilder.DropIndex(
            //    name: "IX_Defect_LoggedbyId1",
            //    table: "Defect");

            //migrationBuilder.DropColumn(
            //    name: "AssignToId1",
            //    table: "Defect");

            //migrationBuilder.DropColumn(
            //    name: "LoggedbyId1",
            //    table: "Defect");

            //migrationBuilder.AlterColumn<string>(
            //    name: "LoggedbyId",
            //    table: "Defect",
            //    nullable: true,
            //    oldClrType: typeof(int),
            //    oldType: "int");

            //migrationBuilder.AlterColumn<string>(
            //    name: "AssignToId",
            //    table: "Defect",
            //    nullable: true,
            //    oldClrType: typeof(int),
            //    oldType: "int");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Defect_AssignToId",
            //    table: "Defect",
            //    column: "AssignToId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Defect_LoggedbyId",
            //    table: "Defect",
            //    column: "LoggedbyId");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Defect_AspNetUsers_AssignToId",
            //    table: "Defect",
            //    column: "AssignToId",
            //    principalTable: "AspNetUsers",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Restrict);

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Defect_AspNetUsers_LoggedbyId",
            //    table: "Defect",
            //    column: "LoggedbyId",
            //    principalTable: "AspNetUsers",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Defect_AspNetUsers_AssignToId",
                table: "Defect");

            migrationBuilder.DropForeignKey(
                name: "FK_Defect_AspNetUsers_LoggedbyId",
                table: "Defect");

            migrationBuilder.DropIndex(
                name: "IX_Defect_AssignToId",
                table: "Defect");

            migrationBuilder.DropIndex(
                name: "IX_Defect_LoggedbyId",
                table: "Defect");

            migrationBuilder.AlterColumn<int>(
                name: "LoggedbyId",
                table: "Defect",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AssignToId",
                table: "Defect",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AssignToId1",
                table: "Defect",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LoggedbyId1",
                table: "Defect",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Defect_AssignToId1",
                table: "Defect",
                column: "AssignToId1");

            migrationBuilder.CreateIndex(
                name: "IX_Defect_LoggedbyId1",
                table: "Defect",
                column: "LoggedbyId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Defect_AspNetUsers_AssignToId1",
                table: "Defect",
                column: "AssignToId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Defect_AspNetUsers_LoggedbyId1",
                table: "Defect",
                column: "LoggedbyId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
