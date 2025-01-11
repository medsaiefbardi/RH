const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

exports.register = async (req, res) => {
  const { name, password, role, jobPosition } = req.body;
  try {
    const existingEmployee = await Employee.findOne({ name });
    if (existingEmployee) {
      return res.status(400).json({ msg: 'Employee already exists' });
    }

    let employee;
    if (role === 'employee') {
      const position = await JobPosition.findById(jobPosition);
      if (!position) {
        return res.status(404).json({ msg: 'Job Position not found' });
      }
      employee = new Employee({
        name,
        password, // Mot de passe en texte clair
        role,
        jobPosition,
        skills: position.requiredSkills.map(skill => ({ skill: skill.skill, level: 'N/A' }))
      });
    } else {
      employee = new Employee({
        name,
        password, // Mot de passe en texte clair
        role
      });
    }

    await employee.save();

    const token = jwt.sign({ employeeId: employee._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const employee = await Employee.findOne({ name });
    if (!employee) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Comparaison simple
    if (password !== employee.password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ employeeId: employee._id, role: employee.role }, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.json({ token, role: employee.role });
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    res.status(500).send('Server error');
  }
};
