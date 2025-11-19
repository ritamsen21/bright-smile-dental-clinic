import nodemailer from 'nodemailer';

// Email configuration
export const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
};

// Create transporter
export const transporter = nodemailer.createTransport(emailConfig);

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Email templates
export const emailTemplates = {
  appointmentConfirmation: (patientName: string, doctorName: string, date: string, time: string) => ({
    subject: '✅ Appointment Confirmation - Bright Smile Dental Clinic',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #00b4d8, #0077b6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .appointment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00b4d8; }
          .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
          .label { font-weight: bold; color: #00b4d8; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .button { display: inline-block; background: #00b4d8; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🦷 Bright Smile Dental Clinic</h1>
            <p>Appointment Confirmed</p>
          </div>
          <div class="content">
            <h2>Hello ${patientName},</h2>
            <p>Your appointment has been successfully booked!</p>
            
            <div class="appointment-details">
              <h3>Appointment Details</h3>
              <div class="detail-row">
                <span class="label">Doctor:</span>
                <span>${doctorName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Date:</span>
                <span>${date}</span>
              </div>
              <div class="detail-row">
                <span class="label">Time:</span>
                <span>${time}</span>
              </div>
              <div class="detail-row">
                <span class="label">Consultation Fee:</span>
                <span>₹200</span>
              </div>
            </div>

            <p><strong>Important:</strong> Please arrive 10 minutes before your appointment time.</p>
            <p>If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>

            <div style="text-align: center;">
              <a href="http://localhost:4200/appointments" class="button">View My Appointments</a>
            </div>
          </div>
          <div class="footer">
            <p>📞 Contact: +91 98765 43210 | 📧 Email: contact@brightsmiledental.com</p>
            <p>📍 Katulpur, West Bengal</p>
            <p>&copy; 2025 Bright Smile Dental Clinic. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  doctorNotification: (patientName: string, patientEmail: string, patientPhone: string, date: string, time: string, notes: string) => ({
    subject: '🔔 New Appointment Booking - Bright Smile Dental Clinic',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #00b4d8, #0077b6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .patient-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00b4d8; }
          .detail-row { margin: 10px 0; }
          .label { font-weight: bold; color: #00b4d8; display: inline-block; min-width: 120px; }
          .button { display: inline-block; background: #00b4d8; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 New Appointment</h1>
          </div>
          <div class="content">
            <h2>Dear Dr. Arna Mal,</h2>
            <p>A new appointment has been booked.</p>
            
            <div class="patient-details">
              <h3>Patient Information</h3>
              <div class="detail-row">
                <span class="label">Name:</span>
                <span>${patientName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Email:</span>
                <span>${patientEmail}</span>
              </div>
              <div class="detail-row">
                <span class="label">Phone:</span>
                <span>${patientPhone}</span>
              </div>
              <div class="detail-row">
                <span class="label">Date:</span>
                <span>${date}</span>
              </div>
              <div class="detail-row">
                <span class="label">Time:</span>
                <span>${time}</span>
              </div>
              ${notes ? `
              <div class="detail-row">
                <span class="label">Notes:</span>
                <span>${notes}</span>
              </div>
              ` : ''}
            </div>

            <div style="text-align: center;">
              <a href="http://localhost:4200/doctor/login" class="button">View Dashboard</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  })
};

// Send email function
export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Bright Smile Dental Clinic" <${emailConfig.auth.user}>`,
      to,
      subject,
      html
    });
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};
