using Microsoft.EntityFrameworkCore.Migrations;

namespace App.Migrations
{
    public partial class Update3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ReplyTo",
                table: "Comments",
                nullable: true,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ReplyTo",
                table: "Comments",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
