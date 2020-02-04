using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Email = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    userId = table.Column<int>(nullable: false),
                    DeptName = table.Column<string>(nullable: false),
                    Function = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => new { x.userId, x.DeptName });
                    table.ForeignKey(
                        name: "FK_Departments_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    EmployeeId = table.Column<int>(nullable: false),
                    userId = table.Column<int>(nullable: false),
                    Department = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    CanEdit = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => new { x.userId, x.EmployeeId });
                    table.ForeignKey(
                        name: "FK_Employees_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Objectives",
                columns: table => new
                {
                    userId = table.Column<int>(nullable: false),
                    deptName = table.Column<string>(nullable: false),
                    ObjectiveName = table.Column<string>(nullable: false),
                    Goal = table.Column<string>(nullable: true),
                    Time = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Objectives", x => new { x.userId, x.deptName, x.ObjectiveName });
                    table.ForeignKey(
                        name: "FK_Objectives_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Objectives_Departments_userId_deptName",
                        columns: x => new { x.userId, x.deptName },
                        principalTable: "Departments",
                        principalColumns: new[] { "userId", "DeptName" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Schedules",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(nullable: true),
                    EmployeeuserId = table.Column<int>(nullable: true),
                    EmployeeId = table.Column<int>(nullable: true),
                    ObjectiveuserId = table.Column<int>(nullable: true),
                    ObjectivedeptName = table.Column<string>(nullable: true),
                    ObjectiveName = table.Column<string>(nullable: true),
                    DeptName = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Schedules_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Schedules_Employees_EmployeeuserId_EmployeeId",
                        columns: x => new { x.EmployeeuserId, x.EmployeeId },
                        principalTable: "Employees",
                        principalColumns: new[] { "userId", "EmployeeId" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Schedules_Objectives_ObjectiveuserId_ObjectivedeptName_ObjectiveName",
                        columns: x => new { x.ObjectiveuserId, x.ObjectivedeptName, x.ObjectiveName },
                        principalTable: "Objectives",
                        principalColumns: new[] { "userId", "deptName", "ObjectiveName" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Steps",
                columns: table => new
                {
                    userId = table.Column<int>(nullable: false),
                    objectiveName = table.Column<string>(nullable: false),
                    deptName = table.Column<string>(nullable: false),
                    StepNumber = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Goal = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Steps", x => new { x.userId, x.deptName, x.objectiveName, x.StepNumber });
                    table.ForeignKey(
                        name: "FK_Steps_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Steps_Departments_userId_deptName",
                        columns: x => new { x.userId, x.deptName },
                        principalTable: "Departments",
                        principalColumns: new[] { "userId", "DeptName" },
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Steps_Objectives_userId_deptName_objectiveName",
                        columns: x => new { x.userId, x.deptName, x.objectiveName },
                        principalTable: "Objectives",
                        principalColumns: new[] { "userId", "deptName", "ObjectiveName" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BestPractices",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(nullable: true),
                    StepuserId = table.Column<int>(nullable: true),
                    StepdeptName = table.Column<string>(nullable: true),
                    StepobjectiveName = table.Column<string>(nullable: true),
                    StepNumber = table.Column<string>(nullable: true),
                    Method = table.Column<string>(nullable: true),
                    Objective = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BestPractices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BestPractices_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BestPractices_Steps_StepuserId_StepdeptName_StepobjectiveName_StepNumber",
                        columns: x => new { x.StepuserId, x.StepdeptName, x.StepobjectiveName, x.StepNumber },
                        principalTable: "Steps",
                        principalColumns: new[] { "userId", "deptName", "objectiveName", "StepNumber" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CommonDifficulties",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(nullable: true),
                    StepuserId = table.Column<int>(nullable: true),
                    StepdeptName = table.Column<string>(nullable: true),
                    StepobjectiveName = table.Column<string>(nullable: true),
                    StepNumber = table.Column<string>(nullable: true),
                    Cause = table.Column<string>(nullable: true),
                    Solution = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommonDifficulties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommonDifficulties_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CommonDifficulties_Steps_StepuserId_StepdeptName_StepobjectiveName_StepNumber",
                        columns: x => new { x.StepuserId, x.StepdeptName, x.StepobjectiveName, x.StepNumber },
                        principalTable: "Steps",
                        principalColumns: new[] { "userId", "deptName", "objectiveName", "StepNumber" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BestPractices_UserId",
                table: "BestPractices",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_BestPractices_StepuserId_StepdeptName_StepobjectiveName_StepNumber",
                table: "BestPractices",
                columns: new[] { "StepuserId", "StepdeptName", "StepobjectiveName", "StepNumber" });

            migrationBuilder.CreateIndex(
                name: "IX_CommonDifficulties_UserId",
                table: "CommonDifficulties",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CommonDifficulties_StepuserId_StepdeptName_StepobjectiveName_StepNumber",
                table: "CommonDifficulties",
                columns: new[] { "StepuserId", "StepdeptName", "StepobjectiveName", "StepNumber" });

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_UserId",
                table: "Schedules",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_EmployeeuserId_EmployeeId",
                table: "Schedules",
                columns: new[] { "EmployeeuserId", "EmployeeId" });

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_ObjectiveuserId_ObjectivedeptName_ObjectiveName",
                table: "Schedules",
                columns: new[] { "ObjectiveuserId", "ObjectivedeptName", "ObjectiveName" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BestPractices");

            migrationBuilder.DropTable(
                name: "CommonDifficulties");

            migrationBuilder.DropTable(
                name: "Schedules");

            migrationBuilder.DropTable(
                name: "Steps");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Objectives");

            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
