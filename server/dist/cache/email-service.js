import nodemailer from "nodemailer";
import { logger } from "../utils/logger.js";
import Appointment from "../models/apointment.model.js";
export class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }
    async sendEmail(to, subject, html) {
        try {
            await this.transporter.sendMail({
                from: process.env.SENDGRID_FROM_EMAIL,
                to,
                subject,
                html
            });
            logger.info(`Email sent to ${to}`);
        }
        catch (error) {
            logger.error("email sending failed:", error);
        }
    }
    async sendPasswordResetEmail(email, token) {
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
        const html = `
      <h1>Reset Your Password</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link expires in 1 hour.</p>
    `;
        await this.sendEmail(email, 'Password Reset - Heartly', html);
    }
    async sendAppointmentConfirmation(appointmentId) {
        const appointment = await Appointment.findById(appointmentId)
            .populate('patient')
            .populate('doctor')
            .populate('hospital');
        if (!appointment)
            return;
        const html = `
      <h1>Appointment Confirmed</h1>
      <p>Dear ${appointment.patient.name},</p>
      <p>Your appointment has been confirmed.</p>
      <ul>
        <li>Doctor: Dr. ${appointment.doctor.name}</li>
        <li>Date: ${appointment.appointmentDate.toLocaleDateString()}</li>
        <li>Time: ${appointment.timeSlot}</li>
        <li>Hospital: ${appointment.hospital.hospitalName}</li>
      </ul>
    `;
        await this.sendEmail(appointment.patient.email, 'Appointment Confirmation - Heartly', html);
    }
}
