# Email Service Setup Guide

## 📧 Email Notification System

The Bright Smile Dental Clinic now has automated email notifications!

### Features:
- ✅ Patient appointment confirmation emails
- ✅ Doctor notification emails for new bookings
- ✅ Professional HTML email templates
- ✅ Appointment details included

---

## Setup Instructions

### Option 1: Using Gmail (Recommended for Testing)

1. **Enable 2-Step Verification**
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Visit https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Bright Smile Dental"
   - Copy the 16-character password

3. **Update .env File**
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```

4. **Restart Backend Server**
   ```bash
   cd backend
   npm start
   ```

---

### Option 2: Using Outlook/Hotmail

```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

---

### Option 3: Using Custom SMTP

```env
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASSWORD=your-password
```

---

## Testing

1. Book an appointment through the frontend
2. Check the email addresses:
   - **Patient email**: Receives confirmation
   - **Doctor email**: Receives notification

3. Check backend console for email status:
   ```
   Email server is ready to send messages
   Patient confirmation email sent to: patient@example.com
   Doctor notification email sent to: doctor@example.com
   ```

---

## Email Templates

### Patient Confirmation Email
- 🦷 Clinic branding
- 📅 Appointment details (date, time, doctor)
- 💰 Fee information
- 🔗 View appointments button
- 📞 Contact information

### Doctor Notification Email
- 👤 Patient information
- 📧 Contact details
- 📅 Appointment schedule
- 📝 Patient notes
- 🔗 Dashboard access button

---

## Troubleshooting

### "Invalid login" error
- Make sure you're using an App Password (not regular password) for Gmail
- Enable "Less secure app access" or use App Passwords

### Emails not sending
- Check .env file has correct credentials
- Verify EMAIL_HOST and EMAIL_PORT
- Check console logs for errors
- Test with: `node -e "require('./src/config/email').transporter.verify().then(console.log).catch(console.error)"`

### Emails going to spam
- Add SPF records to your domain
- Use a verified email address
- Warm up your email account by sending gradually

---

## Production Recommendations

For production, consider using:
- **SendGrid** (99% deliverability)
- **AWS SES** (Cost-effective)
- **Mailgun** (Developer-friendly)
- **Postmark** (Transaction emails)

---

## Environment Variables

Required in `.env`:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

---

## Notes

- Emails are sent asynchronously (won't block appointment booking)
- Failed email sends are logged but don't prevent appointment creation
- Email templates are responsive and mobile-friendly
- All emails include clinic branding and contact information
