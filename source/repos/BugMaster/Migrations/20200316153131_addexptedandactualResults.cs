using Microsoft.EntityFrameworkCore.Migrations;

namespace BugMaster.Migrations
{
    public partial class addexptedandactualResults : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ActaulResult",
                table: "Defect",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ExpectedResult",
                table: "Defect",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActaulResult",
                table: "Defect");

            migrationBuilder.DropColumn(
                name: "ExpectedResult",
                table: "Defect");
        }
    }
}
