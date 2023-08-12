export function getMessageExito(cliente: string, curso: string) {
const registroExitoso = `
<!DOCTYPE html>
<html>

<body>

  <head>
    <title>Curso de Natación</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f1f1f1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }

      .card {
        background-color: #fff;
        width: 800px;
        height: 800px;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        text-align: center;
      }

      h1 {
        color: #333;
      }

      p {
        color: #2b2a2a;
        font-size: 23px;
      }
    </style>
  </head>
  <div>
    -
    <center>
      <div class="card">
        <img src="Encabezado.png" style="width:800px">
        <img src="Sello.png" style="max-width: 50px;">
        <h2 style="text-decoration: underline;">Escuela de Natacion "SPARTAN"</h2>

        <h1>¡Formulario de Inscripcion Recibido!</h1>
        <p>Estimado <b>${cliente}</b>, hemos recibido tu formulario de preinscripción para el curso <b>${curso} de
            Natacion</b>. En este momento, se encuentra en proceso de revisión por
          nuestro equipo encargado. Próximamente, recibirás un mensaje de confirmación en el que te informaremos si tu
          formulario ha sido llenado de forma adecuada o si hay campos que no cumplen con nuestro requisitos.
        </p>
        <p>Te agradecemos tu paciencia mientras completamos este proceso de revisión. Entendemos lo importante que es
          para
          ti participar en nuestro curso y nos esforzamos por brindarte una respuesta lo antes posible.</p>
        <p>Si tienes alguna pregunta adicional o necesitas más información, no dudes en ponerte en contacto con
          nosotros.
          Estaremos encantados de ayudarte y brindarte la asistencia que necesites.</p>
        <p>Gracias por tu interés en nuestro curso de natación. Esperamos poder darte la bienvenida pronto y disfrutar
          juntos de esta experiencia acuática.</p>
        <img src="Pie.png" style="width:800px">
      </div>
    </center>
    <br>
    <div>
    </div>
  </div>
</body>
</html>
`
return registroExitoso
}

export function getMessageVoucher(cedula: string) {
  return `<!DOCTYPE html>
  <html>

  <body>

    <head>
      <title>Curso de Natación</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f1f1f1;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }

        .card {
          background-color: #fff;
          width: 800px;
          height: 600px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        h1 {
          color: #333;
        }

        p {
          color: #2b2a2a;
          font-size: 23px;
        }
      </style>
    </head>
    <div>
      -
      <center>
        <div class="card">
          <img src="Encabezado.png" style="width:800px">
          <img src="Sello.png" style="max-width: 50px;">
          <h2 style="text-decoration: underline;">Escuela de Natacion "SPARTAN"</h2>

          <h1>¡Aceptación de preinscripción!</h1>
          <p>¡Gracias por tu interés en nuestro programa! Te informamos que tu preinscripción ha sido aceptada.</p>
          <p>Tus datos han sido verificados y son correctos. Para completar el proceso de inscripción, por favor realiza el pago siguiendo las instrucciones proporcionadas a continuación.</p>
          <p>Haz clic en este link para realizar el pago:  <a href="http://localhost:4200/dashboard/voucher">Pago Curso</a></p>
          <button style="background-color: blue; color: white;">
            <a href="http://localhost:4200/dashboard/voucher/${cedula}" style="text-decoration: none; color: white;">Haz clic aquí para realizar el pago</a>
          </button> <br> <br>

          <img src="Pie.png" style="width:800px">
        </div>
      </center>
      <br>
      <div>
      </div>
    </div>
  </body>
  </html>`
}

export function getMessageRechazo() {
  return `<!DOCTYPE html>
  <html>

  <body>

    <head>
      <title>Curso de Natación</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f1f1f1;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }

        .card {
          background-color: #fff;
          width: 800px;
          height: 580px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        h1 {
          color: #333;
        }

        p {
          color: #2b2a2a;
          font-size: 23px;
        }
      </style>
    </head>
    <div>
      -
      <center>
        <div class="card">
          <img src="Encabezado.png" style="width:800px">
          <img src="Sello.png" style="max-width: 50px;">
          <h2 style="text-decoration: underline;">Escuela de Natacion "SPARTAN"</h2>

          <h1>¡Datos incorrectos!</h1>
          <p>Lamentablemente, los datos proporcionados no son correctos. Por favor, verifica la información ingresada e intenta nuevamente.</p>
          <p>Si necesitas ayuda o tienes alguna pregunta, no dudes en comunicarte con nuestro equipo de soporte.</p>
          <p>Haz clic en este link para realizar el registro nuevamente:  <a href="http://localhost:4200/dashboard/register">Registro</a></p>
          <button style="background-color: rgb(255, 0, 0); color: rgb(0, 0, 0);">
            <a href="http://localhost:4200/dashboard/register" style="text-decoration: none; color: white;">Haz clic aquí para registrarte</a>
          </button> <br> <br>

          <img src="Pie.png" style="width:800px">
        </div>
      </center>
      <br>
      <div>
      </div>
    </div>
  </body>
  </html>`
}

export function getMessageRecepcionVoucher() {
  return `<!DOCTYPE html>
  <html>

  <body>

    <head>
      <title>Curso de Natación</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f1f1f1;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }

        .card {
          background-color: #fff;
          width: 800px;
          height: 480px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        h1 {
          color: #333;
        }

        p {
          color: #2b2a2a;
          font-size: 23px;
        }
      </style>
    </head>
    <div>
      -
      <center>
        <div class="card">
          <img src="Encabezado.png" style="width:800px">
          <img src="Sello.png" style="max-width: 50px;">
          <h2 style="text-decoration: underline;">Escuela de Natacion "SPARTAN"</h2>

          <h1>¡Recepcion de Comprobante de Pago!</h1>
          <p>Gracias por enviarnos el comprobante de pago. Hemos recibido la información y procederemos a verificarla en
            nuestro sistema.</p>
          <p>Te notificaremos tan pronto como se complete la verificación y confirmemos tu inscripción.</p>

          <img src="Pie.png" style="width:800px">
        </div>
      </center>
      <br>
      <div>
      </div>
    </div>
  </body>
  </html>`
}

export function getMessageRechazoVoucher(cedula: string) {
  return `<!DOCTYPE html>
  <html>

  <body>

    <head>
      <title>Curso de Natación</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f1f1f1;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }

        .card {
          background-color: #fff;
          width: 800px;
          height: 580px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        h1 {
          color: #333;
        }

        p {
          color: #2b2a2a;
          font-size: 23px;
        }
      </style>
    </head>
    <div>
      -
      <center>
        <div class="card">
          <img src="Encabezado.png" style="width:800px">
          <img src="Sello.png" style="max-width: 50px;">
          <h2 style="text-decoration: underline;">Escuela de Natacion "SPARTAN"</h2>

          <h1>¡Pago no encontrado!</h1>
          <p>Lamentablemente, no hemos encontrado el registro del pago en nuestro sistema. Por el momento, no es posible
            completar tu inscripción.</p>
          <p>Si crees que ha habido un error, te recomendamos ponerte en contacto con nuestro equipo de soporte para
            resolver esta situación, caso contrario puedes reenviar el comprobante correcto haciendo clic en el siguiente link.</p>
          <p>Haz clic en este link para cargar el comprobante:  <a href="http://localhost:4200/dashboard/voucher/${cedula}">Cargar Comprobante</a></p>
          <img src="Pie.png" style="width:800px">
        </div>
      </center>
      <br>
      <div>
      </div>
    </div>
  </body>
  </html>`
}

export function getMessageVoucherInvalido() {
  return `<!DOCTYPE html>
  <html>

  <body>

    <head>
      <title>Curso de Natación</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f1f1f1;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }

        .card {
          background-color: #fff;
          width: 800px;
          height: 580px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        h1 {
          color: #333;
        }

        p {
          color: #2b2a2a;
          font-size: 23px;
        }
      </style>
    </head>
    <div>
      -
      <center>
        <div class="card">
          <img src="Encabezado.png" style="width:800px">
          <img src="Sello.png" style="max-width: 50px;">
          <h2 style="text-decoration: underline;">Escuela de Natacion "SPARTAN"</h2>

          <h1>¡Comprobante de pago invalido!</h1>
          <p>Lamentablemente, hemos verificado su comprobante de pago y no es válido. Por tal motivo, no es posible
            completar su inscripción por lo que si desea inscribirse tendrá que volver a registrarse nuevamente.</p>
          <p>Si crees que ha habido un error, te recomendamos ponerte en contacto con nuestro equipo de soporte para
            resolver esta situación, caso contrario puedes completar el formulario de registro nuevamente.</p>
          <p>Haz clic en este link para realizar el registro nuevamente:  <a href="http://localhost:4200/dashboard/registro">Cargar Comprobante</a></p>
          <img src="Pie.png" style="width:800px">
        </div>
      </center>
      <br>
      <div>
      </div>
    </div>
  </body>
  </html>`
}

export function getMessageInscripcionOk() {
  return `<!DOCTYPE html>
  <html>

  <body>

    <head>
      <title>Curso de Natación</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f1f1f1;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }

        .card {
          background-color: #fff;
          width: 800px;
          height: 480px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        h1 {
          color: #333;
        }

        p {
          color: #2b2a2a;
          font-size: 23px;
        }
      </style>
    </head>
    <div>
      -
      <center>
        <div class="card">
          <img src="Encabezado.png" style="width:800px">
          <img src="Sello.png" style="max-width: 50px;">
          <h2 style="text-decoration: underline;">Escuela de Natacion "SPARTAN"</h2>

          <h1>¡Inscripcion Confirmada!</h1>
          <p>Tu comprobante de pago ha sido verificado y tu inscripción ha sido confirmada exitosamente.</p>
          <p>Asiste el <b>01/JUL/2023 a las 08:00 AM</b> a nuestras dependencias para iniciar tu curso y alcanzar tus metas</p>
          <img src="Pie.png" style="width:800px">
        </div>
      </center>
      <br>
      <div>
      </div>
    </div>
  </body>
  </html>`
}
