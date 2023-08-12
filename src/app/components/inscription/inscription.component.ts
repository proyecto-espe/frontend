import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { PreinscritoServiceService } from 'src/app/preinscrito-service.service';
import { getMessageInscripcionOk, getMessageRechazoVoucher } from 'src/app/utils/messages';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  public preinscritos: any;
  public id: number;
  public nuevoEstado: string = '';

  voucher!: any;
  foto!: any;
  sinFoto: string = "../../../assets/imagenes/no.png"

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

  onFileSelected(event: any) {
    this.voucher = event.target.files[0];
    console.log(this.voucher);
  }

  onFileSelectedFoto(event: any) {
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

  async actualizarEstadoPreinscrito(preinscrito: any) {
    try {
      const nuevoEstado = preinscrito.estadopreinscrito1; // Nuevo estado
      if (preinscrito.fotopago !== null) {
        if(nuevoEstado === "Aprobado") {
          await this.PreinscritosService.updateEstadoPreinscrito1(preinscrito.idpreinscrito, nuevoEstado).then((res: any) => {
            if(res.status !== "") {
              const emailData = {
                email: preinscrito.correopreinscrito,
                subject: "¡Inscripcion Confirmada!",
                type: "html",
                text: getMessageInscripcionOk()
              }
              this.PreinscritosService.sendMail({emailData}).subscribe(data => {
              })
            } else {
              alert("ERROR: No se ha podido actualizar el registro")
            }
          });
          this.alerta('Registro actualizado');
          this.cargarPreinscritos();
        } else {
          if(nuevoEstado !== "Rechazado") {
            await this.PreinscritosService.updateEstadoPreinscrito1(preinscrito.idpreinscrito, nuevoEstado);
            this.alerta('Registro actualizado');
            this.cargarPreinscritos();
          } else {
            this.PreinscritosService.deletePreinscritoById(preinscrito.idpreinscrito)
            this.alerta('Comprobante de pago ha sido rechazado y posteriormente se ha eliminado el registro');
            this.cargarPreinscritos();
          }
        }

      } else {
        if(nuevoEstado === "Rechazado") {
          const emailData = {
            email: preinscrito.correopreinscrito,
            subject: "¡Pago no encontrado!",
            type: "html",
            text: getMessageRechazoVoucher(preinscrito.cedulapreinscrito)
          }
          await this.PreinscritosService.updateEstadoPreinscrito1(preinscrito.idpreinscrito, nuevoEstado);
          this.PreinscritosService.sendMail({emailData}).subscribe(res => {
            if(res.result) {
              this.alerta('Pago rechazado, porque no se ha encontrado comprobante. Se ha enviado un mensaje a este usuario para que pueda realizar el pago');
              this.cargarPreinscritos();
            } else {
              alert("No se ha podido actualizar el registro")
            }
          })
        } else {
          alert("Atención: No es posible actualizar el registro. No hay voucher cargado")
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  readImage(data: any) {
    const datosUint8 = new Uint8Array(data);
    const blobImagen = new Blob([datosUint8], { type: 'image/jpeg' });
    return URL.createObjectURL(blobImagen);
  }

  alerta(mensaje: string) {
    alert(mensaje);
  }

  async cargarPreinscritos() {
    this.foto = null;
    await this.PreinscritosService.getPreinscritosAprobados().then((data: any) => {
      this.preinscritos = data;
    })
  }
}
