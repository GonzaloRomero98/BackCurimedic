// src/common/mailer/mailer.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "curimedcurico559@gmail.com",
      pass:"admin_curimed",
    },
  });

  async enviarAgendamiento(
    to: string,
    nombrePaciente: string,
    fecha: string,
    nombreMedico?: string,
  ) {
    await this.transporter.sendMail({
      from: `"CuriMedic"`,
      to,
      subject: 'Cita médica agendada',
      html: `
        <h2>Hola ${nombrePaciente}</h2>
        <p>Tu cita ha sido agendada correctamente.</p>
        <p><strong>Fecha:</strong> ${fecha}</p>
        ${
          nombreMedico
            ? `<p><strong>Médico:</strong> ${nombreMedico}</p>`
            : ''
        }
        <p>Gracias por usar nuestra plataforma.</p>
      `,
    });
  }
}