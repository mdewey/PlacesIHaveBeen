using Microsoft.EntityFrameworkCore.Migrations;

namespace PlacesTravelled.Migrations
{
    public partial class AddedTimesVisitedColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TimesVisited",
                table: "Locations",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimesVisited",
                table: "Locations");
        }
    }
}
