package oops;

//Superclass: Employee
abstract class Employee {
 private String empId;
 private String name;

 public Employee(String empId, String name) {
     this.empId = empId;
     this.name = name;
 }

 public String getEmpId() {
     return empId;
 }

 public String getName() {
     return name;
 }

 public abstract String getRole();
}

//Subclass: Developer
class Developer extends Employee {
 private String programmingLanguage;

 public Developer(String empId, String name, String programmingLanguage) {
     super(empId, name);
     this.programmingLanguage = programmingLanguage;
 }

 public String getProgrammingLanguage() {
     return programmingLanguage;
 }

 @Override
 public String getRole() {
     return "Developer";
 }
}

//Subclass: Manager
class Manager extends Employee {
 private int teamSize;

 public Manager(String empId, String name, int teamSize) {
     super(empId, name);
     this.teamSize = teamSize;
 }

 public int getTeamSize() {
     return teamSize;
 }

 @Override
 public String getRole() {
     return "Manager";
 }
}

//Subclass: Tester
class Tester extends Employee {
 private String testingTool;

 public Tester(String empId, String name, String testingTool) {
     super(empId, name);
     this.testingTool = testingTool;
 }

 public String getTestingTool() {
     return testingTool;
 }

 @Override
 public String getRole() {
     return "Tester";
 }
}

//Utility Class: EmployeeUtils (Extended)
class EmployeeUtils {

 // Check if two employees are duplicates
 public static boolean checkDuplicate(Employee e1, Employee e2) {
     if (e1.getEmpId().equals(e2.getEmpId())) {
         System.out.println("Duplicate employees detected!");
         return true;
     }
     System.out.println("Employees are not duplicates.");
     return false;
 }

 // Display employee details
 public static void displayEmployeeDetails(Employee e) {
     System.out.println("ID: " + e.getEmpId());
     System.out.println("Name: " + e.getName());
     System.out.println("Role: " + e.getRole());

     // Downcasting to access subclass-specific attributes
     if (e instanceof Developer) {
         Developer dev = (Developer) e; // Downcast
         System.out.println("Programming Language: " + dev.getProgrammingLanguage());
     } else if (e instanceof Manager) {
         Manager mgr = (Manager) e; // Downcast
         System.out.println("Team Size: " + mgr.getTeamSize());
     } else if (e instanceof Tester) {
         Tester tester = (Tester) e; // Downcast
         System.out.println("Testing Tool: " + tester.getTestingTool());
     }
 }

 // Generate detailed report for an employee
 public static void generateReport(Employee e) {
     System.out.println("\n== Employee Report ==");
     System.out.println("Employee ID: " + e.getEmpId());
     System.out.println("Name: " + e.getName());
     System.out.println("Role: " + e.getRole());

     if (e instanceof Developer) {
         Developer dev = (Developer) e;
         System.out.println("Primary Responsibility: Writing and maintaining code.");
         System.out.println("Programming Language: " + dev.getProgrammingLanguage());
     } else if (e instanceof Manager) {
         Manager mgr = (Manager) e;
         System.out.println("Primary Responsibility: Managing a team of " + mgr.getTeamSize() + " members.");
     } else if (e instanceof Tester) {
         Tester tester = (Tester) e;
         System.out.println("Primary Responsibility: Ensuring software quality using " + tester.getTestingTool() + ".");
     }
 }

 // Assign task to an employee
 public static void assignTask(Employee e, String task) {
     System.out.println("\n== Task Assignment ==");
     System.out.println("Assigning task: " + task);

     if (e instanceof Developer) {
         Developer dev = (Developer) e;
         System.out.println("Task assigned to Developer " + e.getName() + ": Write code in " + dev.getProgrammingLanguage());
     } else if (e instanceof Manager) {
         Manager mgr = (Manager) e;
         System.out.println("Task assigned to Manager " + e.getName() + ": Oversee the progress of " + mgr.getTeamSize() + " team members.");
     } else if (e instanceof Tester) {
         Tester tester = (Tester) e;
         System.out.println("Task assigned to Tester " + e.getName() + ": Perform testing using " + tester.getTestingTool());
     } else {
         System.out.println("Task assigned to Employee " + e.getName() + ": General task.");
     }
 }
}

//Main Class: EmployeeManagementApp
public class UpcastingDowncasting {
 public static void main(String[] args) {
     Employee dev1 = new Developer("E101", "Alice", "Java");
     Employee mgr = new Manager("E102", "Bob", 8);
     Employee tester = new Tester("E103", "Charlie", "Selenium");

     // Display employee details
     System.out.println("== Display Employee Details ==");
     EmployeeUtils.displayEmployeeDetails(dev1);
     EmployeeUtils.displayEmployeeDetails(mgr);
     EmployeeUtils.displayEmployeeDetails(tester);

     // Generate report for employees
     System.out.println("\n== Generate Reports ==");
     EmployeeUtils.generateReport(dev1);
     EmployeeUtils.generateReport(mgr);
     EmployeeUtils.generateReport(tester);

     // Assign tasks to employees
     System.out.println("\n== Assign Tasks ==");
     EmployeeUtils.assignTask(dev1, "Develop a new feature");
     EmployeeUtils.assignTask(mgr, "Prepare a project plan");
     EmployeeUtils.assignTask(tester, "Test the login module");
 }
}


