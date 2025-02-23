import express from 'express';
import fs from 'fs';

const router = express.Router();

// ▪ GET /employees  ====> DONE
// ▪ GET /employees/${id} ====> DONE
// ▪ POST /employees ====> DONE
// ▪ DELETE /employees/${id} =====> DONE
// ▪ PATCH /employees/${id} ===> Done



// =============================> Middleware Validate <===============================================================
// Middleware for validation
const validateEmployee = (req, res, next) => {
    const { name, email, salary, age, level } = req.body;
    
    if (!name || !email || !salary || !age || !level) {
        return res.status(400).json({ error: "All fields are required." });
    }

    if (typeof salary !== "number" || salary < 0) {
        return res.status(400).json({ error: "Salary must be a positive number." });
    }

    if (typeof age !== "number" || age < 18) {
        return res.status(400).json({ error: "Age must be at least 18." });
    }

    next(); // arou7 lele middleware aw route elly ba33doo
};


// =============================> GET/employees  <===============================================================

router.get('/employees', (req, res) => {
    const dataStream = JSON.parse(fs.readFileSync("employees.json", "utf-8"))
  //  console.log(dataStream);
    res.render('employees', { employees: dataStream })
});

// =============================>GET /employees/${id}<===============================================================
// Get employee by ID
router.get('/employees/:id', (req, res) => {
    const employeeId = parseInt(req.params.id); // Parse the ID

    fs.readFile("employees.json", "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).json({ error: "Failed to read employee data" });
        }

        try {
            const employees = JSON.parse(data); // Parse JSON
            const employee = employees.find(emp => emp.ID === employeeId); 

            if (!employee) {
                return res.status(404).json({ message: "Employee not found" });
            }

            return res.json(employee); // Send JSON response
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return res.status(500).json({ error: "Failed to parse employee data" });
        }
    });
});


   

// =============================> POST /employees <===============================================================
// POST /employees (Add new employee)
router.post('/employees', validateEmployee, (req, res) => {
    fs.readFile("employees.json", "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).json({ error: "Failed to read employees data." });
        }

        let employees = [];
        try {
            employees = JSON.parse(data);
        } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
            return res.status(500).json({ error: "Invalid JSON format in employees.json" });
        }

        const newEmployee = {
            ID: employees.length > 0 ? employees[employees.length - 1].ID + 1 : 1,
            ...req.body
        };

        employees.push(newEmployee);

        fs.writeFile("employees.json", JSON.stringify(employees, null, 2), (writeErr) => {
            if (writeErr) {
                console.error("Error writing file:", writeErr);
                return res.status(500).json({ error: "Failed to save employee data." });
            }

            console.log("Employee added successfully:", newEmployee);
            return res.status(201).json({ message: "Employee added successfully", employee: newEmployee });
        });
    });
});


// =============================> DELETE /employees/${id} <===============================================================
// DELETE Employee by ID
router.delete('/employees/:id', (req, res) => {
    const employeeId = parseInt(req.params.id); 

    fs.readFile("employees.json", "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).json({ error: "Failed to read employee data" });
        }

        try {
            let employees = JSON.parse(data); 
            const initialLength = employees.length;

            // Filter out the employee 3ashan adelet00
            employees = employees.filter(emp => emp.ID !== employeeId);

            // Check lw employee mawgoood
            if (employees.length === initialLength) {
                return res.status(404).json({ message: "Employee not found" });
            }

            // Write updated data back to employees.json
            fs.writeFile("employees.json", JSON.stringify(employees, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error("Error writing file:", writeErr);
                    return res.status(500).json({ error: "Failed to delete employee" });
                }
                res.status(200).json({ message: "Employee deleted successfully!" });
            });

        } catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
            return res.status(500).json({ error: "Failed to process employee data" });
        }
    });
});
  
// =============================> PATCH /employees/${id} <===============================================================
// PATCH - Update an Employee by ID
router.patch('/employees/:id', (req, res) => {
    debugger;

    const employeeId = parseInt(req.params.id); // Get the ID from URL
    const updates = req.body; // Get the fields to update from request body


    fs.readFile("employees.json", "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).json({ error: "Failed to read employee data" });
        }

        try {
            let employees = JSON.parse(data); // Parse JSON data
            let employeeIndex = employees.findIndex(emp => emp.ID === employeeId);

            if (employeeIndex === -1) {
                return res.status(404).json({ message: "Employee not found" });
            }

            // Merge employee with new data 
            employees[employeeIndex] = { ...employees[employeeIndex], ...updates };


            fs.writeFile("employees.json", JSON.stringify(employees, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error("Error writing file:", writeErr);
                    return res.status(500).json({ error: "Failed to update employee" });
                }
                res.status(200).json({ message: "Employee updated successfully!", employee: employees[employeeIndex] });
            });

        } catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
            return res.status(500).json({ error: "Failed to process employee data" });
        }
    });
});



// =============================> GET /employees/${id}?name=aziz <===============================================================
// GET /employees with filtering
router.get("/employees", (req, res) => {

    fs.readFile("employees.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read employee data" });
        }

        try {
            let employees = JSON.parse(data);
            const filters = req.query; // Extract query parameters
            let filteredEmployees = employees; 

       filteredEmployees = filteredEmployees.filter(employee => {
        return Object.keys(filters).some(key =>
            employee[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
        );
        });

        res.status(200).json({ employees: filteredEmployees }); // Return array of filtered employees
        //res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({ error: "Failed to parse employee data" });
        }
    });
});

export default router;
