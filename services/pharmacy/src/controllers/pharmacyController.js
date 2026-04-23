const { validationResult } = require('express-validator');
const axios = require('axios');
const pharmacyService = require('../services/pharmacyService');

const NOTIFY_URL = process.env.NOTIFY_SERVICE_URL || 'http://notify:3004';

// Non-blocking notify helper — never throws
const sendNotification = (data, authHeader) => {
  axios
    .post(`${NOTIFY_URL}/api/notifications`, data, {
      headers: { Authorization: authHeader },
      timeout: 3000,
    })
    .catch(() => {}); // silently ignore
};

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

    // Non-blocking notification to notify service
    const medNames = (req.body.medications || []).map((m) => m.name).join(', ');
    sendNotification(
      {
        title: 'Prescription Created',
        message: `Prescription for ${req.body.patientName}: ${medNames}`,
        type: 'prescription',
      },
      req.headers.authorization
    );

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
