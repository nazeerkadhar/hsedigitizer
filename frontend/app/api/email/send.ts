import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { to, subject, incident, location, incidentType } = await request.json()

    if (!to || !subject || !incident) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const htmlContent = `
      <h2>HSE Incident Alert - ESS Portal</h2>
      <p><strong>Incident Type:</strong> ${incidentType}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Description:</strong> ${incident}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString('en-AE')}</p>
      <hr/>
      <p>This is an automated alert from HSE DIGITIZER by Easy Safety Solutions.</p>
      <a href="https://hsedigitizer.vercel.app/incidents/list">View All Incidents</a>
    `

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: to,
      subject: subject,
      html: htmlContent,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: 'Email sent successfully' })
  } catch (error: any) {
    console.error('Email error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    )
  }
}
