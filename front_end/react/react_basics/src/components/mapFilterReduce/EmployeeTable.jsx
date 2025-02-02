import React, { useState, useEffect } from "react";

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
  { name: "Rahul", department: "Sales", salary: 69000 },
];

const EmployeeTable = () => {
  const [selectedDept, setSelectedDept] = useState("Engineering");
  const [filteredData, setFilteredData] = useState([]);
  const [totalSalary, setTotalSalary] = useState(0);

  // Filter employees and calculate total salary when selectedDept changes
  useEffect(() => {
    const filtered = employees.filter((emp) => emp.department === selectedDept);
    const total = filtered.reduce((sum, emp) => sum + emp.salary, 0);
    setFilteredData(filtered);
    setTotalSalary(total);
  }, [selectedDept]);

  return (
    <div className="container-employee">
      <h1>Employee Data Viewer</h1>
      <label>Select Department:</label>
      <select
        value={selectedDept}
        onChange={(e) => setSelectedDept(e.target.value)}
      >
        {[...new Set(employees.map((emp) => emp.department))].map((dept) => (
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
          {filteredData.map((emp) => (
            <tr key={emp.name}>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>Rs. {emp.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total-salary">
        Total Salary for {selectedDept}: Rs. {totalSalary.toLocaleString()}
      </div>
    </div>
  );
};

export default EmployeeTable;
