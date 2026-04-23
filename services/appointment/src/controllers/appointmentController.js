const { validationResult } = require('express-validator');
const axios = require('axios');
const appointmentService = require('../services/appointmentService');

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

const createAppointment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data = {
      ...req.body,
      patientId: req.user.id,
      patientName: req.user.name,
    };
    const appointment = await appointmentService.create(data);

    // Non-blocking notification to notify service
    sendNotification(
      {
        title: 'Appointment Booked',
        message: `Appointment with Dr. ${req.body.doctorName} on ${req.body.date} at ${req.body.time}`,
        type: 'appointment',
      },
      req.headers.authorization
    );

    res.status(201).json({ message: 'Appointment created', appointment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getAll(
      req.user.id,
      req.user.role
    );
    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await appointmentService.getById(req.params.id);
    res.json({ appointment });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.update(
      req.params.id,
      req.body,
      req.user.id,
      req.user.role
    );
    res.json({ message: 'Appointment updated', appointment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
};
