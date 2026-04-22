const { validationResult } = require('express-validator');
const pharmacyService = require('../services/pharmacyService');

const createPrescription = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = {
      ...req.body,
      doctorId: req.user.id,
      doctorName: req.user.name,
    };
    const prescription = await pharmacyService.create(data);
    res.status(201).json({ message: 'Prescription created', prescription });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await pharmacyService.getAll(
      req.user.id,
      req.user.role
    );
    res.json({ prescriptions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await pharmacyService.getById(req.params.id);
    res.json({ prescription });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updatePrescriptionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const prescription = await pharmacyService.updateStatus(
      req.params.id,
      status,
      req.user.id,
      req.user.role
    );
    res.json({ message: 'Prescription updated', prescription });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createPrescription,
  getPrescriptions,
  getPrescriptionById,
  updatePrescriptionStatus,
};
