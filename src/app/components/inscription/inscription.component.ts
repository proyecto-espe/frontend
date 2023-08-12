import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { PreinscritoServiceService } from 'src/app/preinscrito-service.service';

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
    /* if (!app.isLogged()) {
      alert('No tienes permisos para usar este módulo');
      router.navigate(['login']);
    } */
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
      const nuevoEstado = preinscrito.estadopreinscrito1; // Nuevo estado seleccionado
      let fotovoucher = null;
      if (this.voucher != null) {
        fotovoucher = await this.toBase64(this.voucher);
      } else {
        fotovoucher = preinscrito.vaucherinscrito;
      }

      let foto = null;
      if (this.foto != null) {
        foto = await this.toBase64(this.foto);
      } else {
        foto = preinscrito.fotopreinscrito;
      }

      await this.PreinscritosService.updateEstadoPreinscrito1(preinscrito.idpreinscrito, nuevoEstado, foto, fotovoucher);
      console.log('Actualización exitosa');
      this.alerta('Registro actualizado');
      this.cargarPreinscritos();
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
      console.log(data)
    })
  }
}
