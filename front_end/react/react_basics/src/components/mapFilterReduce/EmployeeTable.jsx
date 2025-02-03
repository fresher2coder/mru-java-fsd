import React, { useEffect, useState } from "react";

const employees = [
  { name: "Aarav", department: "Engineering", salary: 80000 },
  { name: "Ishita", department: "Marketing", salary: 50000 },
  { name: "Ravi", department: "Engineering", salary: 70000 },
  { name: "Priya", department: "HR", salary: 60000 },
  { name: "Neha", department: "Engineering", salary: 75000 },
  { name: "Vikram", department: "Marketing", salary: 55000 },
  { name: "Arjun", department: "Sales", salary: 65000 },
  { name: "Simran", department: "Sales", salary: 62000 },
  { name: "Pooja", department: "HR", salary: 58000 },
  { name: "Sandeep", department: "Engineering", salary: 72000 },
  { name: "Rita", department: "Marketing", salary: 53000 },
  { name: "Karan", department: "Sales", salary: 71000 },
  { name: "Anjali", department: "HR", salary: 62000 },
  { name: "Manish", department: "Sales", salary: 60000 },
  { name: "Vishal", department: "Engineering", salary: 79000 },
  { name: "Sonali", department: "Marketing", salary: 54000 },
  { name: "Sonali Singh", department: "Finance", salary: 54000 },
  { name: "Rahul", department: "Sales", salary: 69000 },
  { name: "Rahul Reddy", department: "Operations", salary: 69000 },
];

// const nums = [10, 20, 30];
// console.log(nums.map((n) => n * 2));

const departments = [...new Set(employees.map((emp) => emp.department))];
// console.log(departments);

const EmployeeTable = () => {
  const [department, setDepartment] = useState("Engineering");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [totalSalary, setTotalSalary] = useState(0);

  useEffect(() => {
    // console.log(department);
    const filteredEmployees = employees.filter(
      (emp) => emp.department == department
    );
    // console.log(filteredEmployees);
    setFilteredEmployees(filteredEmployees);

    const total = filteredEmployees.reduce((sum, emp) => sum + emp.salary, 0);
    setTotalSalary(total);
  }, [department]);

  return (
    <>
      <section className="container-employee">
        <h1>Employee Date Viewer</h1>

        <select
          onChange={(event) => {
            setDepartment(event.target.value);
          }}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.name}>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>

        <section className="total-salary">
          Total salary of {department}: Rs. {totalSalary}
        </section>
      </section>
    </>
  );
};

export default EmployeeTable;
