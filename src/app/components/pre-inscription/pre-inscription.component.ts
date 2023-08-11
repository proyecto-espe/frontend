import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreinscritoServiceService } from 'src/app/preinscrito-service.service';
import { Buffer } from 'buffer';
import { getMessageRechazo, getMessageVoucher } from 'src/app/utils/messages';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-pre-inscription',
  templateUrl: './pre-inscription.component.html',
  styleUrls: ['./pre-inscription.component.css']
})

export class PreInscriptionComponent implements OnInit {

  public preinscritos: any;
  public id: number;
  public nuevoEstado: string = '';

  foto!: any;

  constructor(
    public PreinscritosService: PreinscritoServiceService,
    public router: Router,
    private app: AppComponent) {
      if (!app.isLogged()) {
        alert('No tienes permisos para usar este módulo');
        router.navigate(['login']);
      }

  }

  ngOnInit(): void {
    this.cargarPreinscritos();
  }


  async eliminarPreinscrito(id: number) {
    try {
      this.id = id;
      await this.PreinscritosService.deletePreinscritoById(this.id);
      console.log('Eliminación exitosa');
      this.alerta('Registro eliminado');
      this.cargarPreinscritos();
    } catch (error) {
      console.log(error);
    }
  }


  async actualizarEstadoPreinscrito(preinscrito: any) {
    try {
      const nuevoEstado = preinscrito.estadopreinscrito; // Nuevo estado seleccionado
      let foto = null;
      if (this.foto != null) {
        foto = await this.toBase64(this.foto);
      } else {
        foto = preinscrito.fotopreinscrito;
      }

      await this.PreinscritosService.updateEstadoPreinscrito(preinscrito.idpreinscrito, nuevoEstado, foto);
      if(nuevoEstado !== "Revision") {
        this.PreinscritosService.sendMail({
          emailData: this.generateMessage(
            preinscrito.cedulapreinscrito,
            preinscrito.correopreinscrito, nuevoEstado
            )
          }).subscribe(res => {
            if(res.result) {
            console.log('Actualización exitosa');
            this.alerta('El registro se ha actualizado correctamente.');
            this.cargarPreinscritos();
          } else {
            alert("Error al actualizar")
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  generateMessage(cedulapreinscrito: string, emailpreinscrito: string, tipo:string) {
    if(tipo === "Aprobado") {
      return {
        email: emailpreinscrito,
        subject: "¡Aceptación de preinscripción!",
        type: "html",
        text: getMessageVoucher(cedulapreinscrito)
      }
    } else {
      return {
        email: emailpreinscrito,
        subject: "¡Datos incorrectos!",
        type: "html",
        text: getMessageRechazo()
      }
    }
  }

  alerta(mensaje: string) {
    alert(mensaje);
  }

  cargarPreinscritos() {
    this.PreinscritosService.getPreinscritos().then(data => {
      this.preinscritos = data;
    })
  }

  onFileSelected(event: any) {
    this.foto = event.target.files[0];
    console.log(this.foto);
  }

  toBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }
}



