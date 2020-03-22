using Microsoft.EntityFrameworkCore.Migrations;

namespace BugMaster.Migrations
{
    public partial class addexptedandactualResultsCorrectSpelling : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActaulResult",
                table: "Defect");

            migrationBuilder.AddColumn<string>(
                name: "ActualResult",
                table: "Defect",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActualResult",
                table: "Defect");

            migrationBuilder.AddColumn<string>(
                name: "ActaulResult",
                table: "Defect",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
