const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/employees", (req, res) => {
  const { name, employeeId, email, phone, department, dateOfJoining, role } = req.body;

  const checkQuery = "SELECT * FROM employees WHERE employeeId = ? OR email = ?";
  db.query(checkQuery, [employeeId, email], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.length > 0) return res.status(400).json({ message: "Employee ID or Email already exists" });

    const insertQuery = "INSERT INTO employees (name, employeeId, email, phone, department, dateOfJoining, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(insertQuery, [name, employeeId, email, phone, department, dateOfJoining, role], (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.status(200).json({ message: "Employee added successfully!" });
    });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
