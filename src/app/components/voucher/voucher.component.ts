import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VoucherErrors } from '../interfaces/errors';
import { PreinscritoServiceService } from 'src/app/preinscrito-service.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { cedulaEcuatorianaValidator } from 'src/app/utils/validators';
import { getMessageRecepcionVoucher } from 'src/app/utils/messages';

/******************** */
interface PagoData {
  cedulapago: string;
  nombrepago: string;
  cedulaestudiante: string;
  nombreestudiante: string;
  fotopago: any;
}
/*************************** */
@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {

  public ccPagador: string;
  public nombresPagador: string;
  public ccCursante: string;
  public nombresCursante: string;
  public vaucher: any; ///Cambie esto
  siteKey: string = ""
  email: string = ""
  constructor(
    public PreinscritosService: PreinscritoServiceService,
    public router: Router,
    private route: ActivatedRoute
    ) {
    this.siteKey = "6LcktHomAAAAAIbJCjwl6Xpwpp7UBL2Kjifl0iwO"
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const cedula = params.get('cedula');
      this.PreinscritosService.doPost("consultar", {cedula}).subscribe(res => {
        if(res.length === 0) {
          this.router.navigate(["/dashboard/home"])
        } else {
          const nombre = res[0].apellidopreinscrito + " " + res[0].nombrepreinscrito
          this.email = res[0].correopreinscrito
          console.log(res[0].correopreinscrito
            )
          this.registro.get("ccCursante")?.setValue(cedula)
          this.registro.get("nombresCursante")?.setValue(nombre)
        }
      })
    })

  }

  onFileSelected(event: any) {
    this.vaucher = event.target.files[0];
  }

  toBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  async saveNewPagoOnBDD() {
    try {
      if(this.registro.valid) {
        let pagoData: PagoData = this.buildAndGetNewPagoObject();
        pagoData.fotopago = await this.toBase64(this.vaucher);
        const cedulaParaBuscar = this.registro.get("ccCursante")?.value
        const emailData = {
          email: this.email,
          subject: "¡Recepcion de Comprobante de Pago!",
          type: "html",
          text: getMessageRecepcionVoucher()
        }

        this.PreinscritosService.doPost("consultar-voucher", {cedula: cedulaParaBuscar}).subscribe(async(res) => {
          // Si el vaucher ya ha sido cargado antes
          if(res.length > 0) {
            alert("Error: Enlace ya ha sido utilizado.")
            this.router.navigate(['/dashboard/home']);
          } else {
            // Se sube el vaucher por primera vez
            await this.PreinscritosService.savePago(pagoData).then((res:any)=> {
              if(res.result) {
                this.resetCampos();
                this.clearInputs()
                // Se envia el correo
                this.PreinscritosService.sendMail({emailData}).subscribe(res=>{
                  alert('El comprobante de pago ha sido recibido.');
                  this.router.navigate(['/dashboard/home']);
                })
              } else {
                alert("Error: Comprobante no se ha podido cargar correctamente")
              }
            });
          }
        })
      } else {
        alert("Debe rellenar todos los campos")
      }
    } catch (error) {
      console.log(error);
      alert("Error: Comprobante no se ha podido cargar correctamente")
    }
  }

  buildAndGetNewPagoObject(): PagoData {
    let newPago: PagoData = {
      cedulapago: this.ccPagador,
      nombrepago: this.nombresPagador,
      cedulaestudiante: this.ccCursante,
      nombreestudiante: this.nombresCursante,
      fotopago: null,
    };
    return newPago;
  }

  //Metodo para resetear los campos
  resetCampos() {
    this.ccPagador = "";
    this.nombresPagador = "";
    this.ccCursante = "";
    this.nombresCursante = "";
    this.vaucher = "";
  }

  //Validaciones de aqui para abajo
  errors: VoucherErrors = {
    ccPagador: "",
    nombresPagador: "",
    ccCursante: "",
    nombresCursante: "",
    voucher: '',
    recaptcha: ''
  }

  errorValidation: string = ""
  textRegex: RegExp = /^(?!^\s)(?!.*\s$)(?!.*\s\s)[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]+$/
  ccRegex: RegExp = /^[01]\d{9}$/

  registro: FormGroup = new FormGroup({
    ccPagador: new FormControl("", [Validators.required, cedulaEcuatorianaValidator()]),
    nombresPagador: new FormControl("", [Validators.required, Validators.pattern(this.textRegex)]),
    ccCursante: new FormControl("", [Validators.required, Validators.pattern(this.ccRegex)]),
    nombresCursante: new FormControl("", [Validators.required, Validators.pattern(this.textRegex)]),
    voucher: new FormControl("", [Validators.required, Validators.pattern(/\.(jpg|png)$/i)]),
    recaptcha: new FormControl("", [Validators.required])
  })

  images = [
    {
      src: '../../../assets/imagenes/Sello.png',
      title: 'Sello',
      description: ''
    }
  ];

  validateVoucher() {
    const name = "voucher"
    const input = this.registro.get(name)
    const key = name as keyof typeof this.errors
    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('required')
      ) {
        this.errors[key] = "Debes cargar el voucher del pago"
        return true;
      }

    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('pattern')
    ) {
      this.errors[key] = "Solo se permiten imagenes con formato jgp y png"
      return true
    }

    return false;
  }

  validateNombresPagador() {
    const name = "nombresPagador"
    const input = this.registro.get(name)
    const key = name as keyof typeof this.errors
    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('required')
    ) {
      this.errors[key] = "Debes escribir los nombres"
      return true;
    }

    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('pattern')
    ) {
      this.errors[key] = "Solo se permiten letras mayusculas y minusculas, no se admiten espacios al comienzo, al final ni al espacios dobles"
      return true
    }

    return false;
  }

  validateNombresCursante() {
    const name = "nombresCursante"
    const input = this.registro.get(name)
    const key = name as keyof typeof this.errors
    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('required')
    ) {
      this.errors[key] = "Debes escribir los nombres"
      return true;
    }

    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('pattern')
    ) {
      this.errors[key] = "Solo se permiten letras mayusculas y minusculas, no se admiten espacios al comienzo, al final ni al espacios dobles"
      return true
    }

    return false;
  }

  validateCCPagador() {
    const name = "ccPagador"
    const input = this.registro.get(name)
    const key = name as keyof typeof this.errors
    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('required')
    ) {
      this.errors[key] = "Debes un número de cédula de identidad"
      return true;
    }

    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('cedulaEcuatoriana')
    ) {
      this.errors[key] = "Cedula invalida, asegurese de ingresar cédula valida con 10 dígitos"
      return true
    }

    return false;
  }

  validateCCCursante() {
    const name = "ccCursante"
    const input = this.registro.get(name)
    const key = name as keyof typeof this.errors
    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('required')
    ) {
      this.errors[key] = "Debes un número de cédula de identidad"
      return true;
    }

    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('pattern')
    ) {
      this.errors[key] = "Cedula invalida, cedula debe comenzar por 0 o 1 y solo debe tener 10 digitos"
      return true
    }

    return false;
  }

  validateForm() {
    if (this.registro.get('foto')?.invalid) {
      this.errorValidation = "Selecciona una foto válida"
      return false
    }
    if (this.registro.get('nombres')?.invalid) {
      this.errorValidation = "Escribe nombres válidos"
      return false
    }
    if (this.registro.get('cc')?.invalid) {
      this.errorValidation = "Escribe un número de cédula válido"
      return false
    }
    if (this.registro.get('recaptcha')?.invalid) {
      this.errorValidation = "Selecciona el recaptcha"
      return false
    }

    return true
  }

  clearInputs() {
    this.errors.ccPagador = ""
    this.errors.nombresPagador = ""
    this.errors.ccCursante = ""
    this.errors.nombresPagador = ""
    this.errors.recaptcha = ""
  }

}
