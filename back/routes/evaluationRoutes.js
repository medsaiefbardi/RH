const express = require('express');
const router = express.Router();
const { PerformanceObjective, CompetenceObjective, EvaluationResult } = require('../models/Evaluation');

// Ajouter un objectif de performance
router.post('/objectives/performance', async (req, res) => {
  try {
    const newObjective = new PerformanceObjective(req.body);
    await newObjective.save();
    res.status(201).json({ message: 'Objectif de performance ajouté avec succès.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ajouter un objectif de compétence
router.post('/objectives/competence', async (req, res) => {
  try {
    const newObjective = new CompetenceObjective(req.body);
    await newObjective.save();
    res.status(201).json({ message: 'Objectif de compétence ajouté avec succès.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer le résultat d'évaluation d'un employé
router.get('/results/:employeeId', async (req, res) => {
  try {
    const result = await EvaluationResult.findOne({ employeeId: req.params.employeeId });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;