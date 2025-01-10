const mongoose = require('mongoose');

const PerformanceObjectiveSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  objective: { type: String, required: true },
  threshold: { type: Number, required: true },
  weight: { type: Number, required: true }
});

const CompetenceObjectiveSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  objective: { type: String, required: true },
  threshold: { type: Number, required: true },
  weight: { type: Number, required: true }
});

const EvaluationResultSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  totalPerformance: { type: Number, required: true },
  totalCompetence: { type: Number, required: true },
  weight: { type: Number, required: true },
  evaluationResult: { type: Number, required: true }
});

module.exports = {
  PerformanceObjective: mongoose.model('PerformanceObjective', PerformanceObjectiveSchema),
  CompetenceObjective: mongoose.model('CompetenceObjective', CompetenceObjectiveSchema),
  EvaluationResult: mongoose.model('EvaluationResult', EvaluationResultSchema)
};