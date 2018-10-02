using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace App.Migrations
{
    public partial class update4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Category",
                table: "Threads",
                newName: "Title");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Threads",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CategoryId1",
                table: "Threads",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LogoPath",
                table: "Threads",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UploadDate",
                table: "Threads",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Threads_CategoryId",
                table: "Threads",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Threads_CategoryId1",
                table: "Threads",
                column: "CategoryId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_Category_CategoryId",
                table: "Threads",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_Category_CategoryId1",
                table: "Threads",
                column: "CategoryId1",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Threads_Category_CategoryId",
                table: "Threads");

            migrationBuilder.DropForeignKey(
                name: "FK_Threads_Category_CategoryId1",
                table: "Threads");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropIndex(
                name: "IX_Threads_CategoryId",
                table: "Threads");

            migrationBuilder.DropIndex(
                name: "IX_Threads_CategoryId1",
                table: "Threads");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Threads");

            migrationBuilder.DropColumn(
                name: "CategoryId1",
                table: "Threads");

            migrationBuilder.DropColumn(
                name: "LogoPath",
                table: "Threads");

            migrationBuilder.DropColumn(
                name: "UploadDate",
                table: "Threads");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Threads",
                newName: "Category");
        }
    }
}
