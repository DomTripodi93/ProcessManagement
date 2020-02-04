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
                    Id = table.Column<int>(nullable: false),
                    userId = table.Column<int>(nullable: false),
                    Department = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    CanEdit = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => new { x.userId, x.Id });
                    table.ForeignKey(
                        name: "FK_Employees_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    userId = table.Column<int>(nullable: false),
                    DeptName = table.Column<string>(nullable: false),
                    TaskName = table.Column<string>(nullable: false),
                    Goal = table.Column<string>(nullable: true),
                    Time = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => new { x.userId, x.DeptName, x.TaskName });
                    table.ForeignKey(
                        name: "FK_Tasks_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tasks_Departments_userId_DeptName",
                        columns: x => new { x.userId, x.DeptName },
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
                    userId = table.Column<int>(nullable: false),
                    EmployeeuserId = table.Column<int>(nullable: true),
                    EmployeeId = table.Column<int>(nullable: true),
                    TaskuserId = table.Column<int>(nullable: true),
                    TaskDeptName = table.Column<string>(nullable: true),
                    TaskName = table.Column<string>(nullable: true),
                    DeptName = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Schedules_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Schedules_Employees_EmployeeuserId_EmployeeId",
                        columns: x => new { x.EmployeeuserId, x.EmployeeId },
                        principalTable: "Employees",
                        principalColumns: new[] { "userId", "Id" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Schedules_Tasks_TaskuserId_TaskDeptName_TaskName",
                        columns: x => new { x.TaskuserId, x.TaskDeptName, x.TaskName },
                        principalTable: "Tasks",
                        principalColumns: new[] { "userId", "DeptName", "TaskName" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Steps",
                columns: table => new
                {
                    userId = table.Column<int>(nullable: false),
                    TaskName = table.Column<string>(nullable: false),
                    Number = table.Column<int>(nullable: false),
                    TaskuserId = table.Column<int>(nullable: true),
                    TaskDeptName = table.Column<string>(nullable: true),
                    TaskName1 = table.Column<string>(nullable: true),
                    DepartmentuserId = table.Column<int>(nullable: true),
                    DepartmentDeptName = table.Column<string>(nullable: true),
                    DeptName = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Goal = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Steps", x => new { x.userId, x.TaskName, x.Number });
                    table.ForeignKey(
                        name: "FK_Steps_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Steps_Departments_DepartmentuserId_DepartmentDeptName",
                        columns: x => new { x.DepartmentuserId, x.DepartmentDeptName },
                        principalTable: "Departments",
                        principalColumns: new[] { "userId", "DeptName" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Steps_Tasks_TaskuserId_TaskDeptName_TaskName1",
                        columns: x => new { x.TaskuserId, x.TaskDeptName, x.TaskName1 },
                        principalTable: "Tasks",
                        principalColumns: new[] { "userId", "DeptName", "TaskName" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BestPractices",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    userId = table.Column<int>(nullable: false),
                    StepuserId = table.Column<int>(nullable: true),
                    StepTaskName = table.Column<string>(nullable: true),
                    StepNumber = table.Column<int>(nullable: true),
                    Method = table.Column<string>(nullable: true),
                    Objective = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BestPractices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BestPractices_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BestPractices_Steps_StepuserId_StepTaskName_StepNumber",
                        columns: x => new { x.StepuserId, x.StepTaskName, x.StepNumber },
                        principalTable: "Steps",
                        principalColumns: new[] { "userId", "TaskName", "Number" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CommonDifficulties",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    userId = table.Column<int>(nullable: false),
                    StepuserId = table.Column<int>(nullable: true),
                    StepTaskName = table.Column<string>(nullable: true),
                    StepNumber = table.Column<int>(nullable: true),
                    Cause = table.Column<string>(nullable: true),
                    Solution = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommonDifficulties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommonDifficulties_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CommonDifficulties_Steps_StepuserId_StepTaskName_StepNumber",
                        columns: x => new { x.StepuserId, x.StepTaskName, x.StepNumber },
                        principalTable: "Steps",
                        principalColumns: new[] { "userId", "TaskName", "Number" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BestPractices_userId",
                table: "BestPractices",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_BestPractices_StepuserId_StepTaskName_StepNumber",
                table: "BestPractices",
                columns: new[] { "StepuserId", "StepTaskName", "StepNumber" });

            migrationBuilder.CreateIndex(
                name: "IX_CommonDifficulties_userId",
                table: "CommonDifficulties",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_CommonDifficulties_StepuserId_StepTaskName_StepNumber",
                table: "CommonDifficulties",
                columns: new[] { "StepuserId", "StepTaskName", "StepNumber" });

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_userId",
                table: "Schedules",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_EmployeeuserId_EmployeeId",
                table: "Schedules",
                columns: new[] { "EmployeeuserId", "EmployeeId" });

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_TaskuserId_TaskDeptName_TaskName",
                table: "Schedules",
                columns: new[] { "TaskuserId", "TaskDeptName", "TaskName" });

            migrationBuilder.CreateIndex(
                name: "IX_Steps_DepartmentuserId_DepartmentDeptName",
                table: "Steps",
                columns: new[] { "DepartmentuserId", "DepartmentDeptName" });

            migrationBuilder.CreateIndex(
                name: "IX_Steps_TaskuserId_TaskDeptName_TaskName1",
                table: "Steps",
                columns: new[] { "TaskuserId", "TaskDeptName", "TaskName1" });
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
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
