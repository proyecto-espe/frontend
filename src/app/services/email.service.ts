import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private ses: AWS.SES;

  constructor() {
    // Configura las credenciales y la región
    AWS.config.update({
      region: 'us-east-1',
      credentials: new AWS.Credentials('AKIA4HXV6WA7MIGOUAO3', 'T2OexDRDwW0vno6wV5s6ZHeXUnaN7XCA1pP1Bzy9')
    });

    // Crea una instancia del cliente SES
    this.ses = new AWS.SES();
  }

  sendEmail(subject: string, body: string, toAddress: string): Promise<any> {
    const params = {
      Source: 'lecastro.proyectos@gmail.com',
      Destination: {
        ToAddresses: [toAddress]
      },
      Message: {
        Subject: {
          Data: subject
        },
        Body: {
          Text: {
            Data: body
          }
        }
      }
    };

    return new Promise((resolve, reject) => {
      this.ses.sendEmail(params, (err, data) => {
        if (err) {
          console.error('Error al enviar el correo:', err);
          reject(err);
        } else {
          console.log('Correo enviado exitosamente:', data);
          resolve(data);
        }
      });
    });
  }
}
