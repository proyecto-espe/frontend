import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormErrors } from '../interfaces/errors';
import { PreinscritoServiceService } from 'src/app/preinscrito-service.service';
import { Router } from '@angular/router';
import { getMessageExito } from 'src/app/utils/messages';
import { cedulaEcuatorianaValidator } from 'src/app/utils/validators';

/******************** */
interface PreinscritoData {
  apellidopreinscrito: string;
  nombrepreinscrito: string;
  cedulapreinscrito: string;
  edadpreinscrito: string;
  sexopreinscrito: string;
  emergenciapreinscrito: string;
  telefonopreinscrito: string;
  tutorpreinscrito: string;
  cursopreinscrito: string;
  correopreinscrito: string;
  fotopreinscrito: any;
  vaucherpreinscrito: any;
}

/*************************** */

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public apellido: string;
  public nombre: string;
  public cedula: string;
  public edad: string;
  public sexo: string;
  public emergencia: string;
  public telefono: string;
  public tutor: string;
  public curso: string;
  public correo: string;
  public estado: string;
  public estado1: string;
  public foto: any;
  public vaucher: string;

  constructor(
    public PreinscritosService: PreinscritoServiceService,
    public router: Router) {
    this.siteKey = "6LcktHomAAAAAIbJCjwl6Xpwpp7UBL2Kjifl0iwO"
  }

  /*********************************** */

  onFileSelected(event: any) {
    this.foto = event.target.files[0];
  }

  toBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  async saveNewPreinscritoOnBDD() {
    try {
      //Validamos que todos los campos estén llenos
      if(this.registro.valid) {
        let preinscrito = this.buildAndGetNewPreinscritoObject();
        preinscrito.fotopreinscrito = await this.toBase64(this.foto);
        const cedulaParaBuscar = preinscrito.cedulapreinscrito
        //Validamos que la cedula no esté registrada todavia
        this.PreinscritosService.doPost("consultar", {cedula: cedulaParaBuscar}).subscribe(async (res) =>{
          // Si la cedula ya existe no dejará registrar otra vez
          if(res.length > 0) {
            console.log(res)
            alert("Ya existe usuario registrado con esa cédula")
          } else {
            // Guardamos el usuario
            await this.PreinscritosService.savePreinscrito(preinscrito);
            // Creamos el email
            const nombre = this.registro.get("nombres")?.value
            const apellido = this.registro.get("apellidos")?.value
            const curso = this.registro.get("curso")?.value.toUpperCase()
            const emailData = {
              email: this.registro.get("email")?.value,
              subject: "Registro existoso!!",
              type: "html",
              text: getMessageExito(nombre + " " + apellido, curso)
            }
            // Enviamos el mensaje
            this.PreinscritosService.sendMail({emailData}).subscribe(res => {
              this.resetCampos();
              this.alerta();
              this.router.navigate(['/dashboard/home']);
            })
          }
        })
      } else {
        alert("Asegurese de completar todos los campos del formulario")
      }

    } catch (error) {
      console.log(error);
    }
  }

  buildAndGetNewPreinscritoObject(): PreinscritoData {
    let newPreinscrito: PreinscritoData = {
      apellidopreinscrito: this.apellido,
      nombrepreinscrito: this.nombre,
      cedulapreinscrito: this.cedula,
      edadpreinscrito: this.edad,
      sexopreinscrito: this.sexo,
      emergenciapreinscrito: this.emergencia,
      telefonopreinscrito: this.telefono,
      tutorpreinscrito: this.tutor,
      cursopreinscrito: this.curso,
      correopreinscrito: this.correo,
      //estadopreinscrito: this.estado,
      //estado1preinscrito: this.estado1,
      fotopreinscrito: 'this.foto',
      vaucherpreinscrito: null,
    }
    return newPreinscrito;
  }

  //Metodo para resetear los campos
  resetCampos() {
    this.apellido = "";
    this.nombre = "";
    this.cedula = "";
    this.edad = "";
    this.sexo = "";
    this.emergencia = "";
    this.telefono = "";
    this.tutor = "";
    this.curso = "";
    this.correo = "";
    //this.estado = "";
    //this.estado1 = "";
    this.foto = "";
    this.vaucher = "";

  }

  //Metodo para mostrar alerta
  alerta() {
    alert('El registro se ha insertado correctamente.');
  }



  //Validaciones de aqui para abajo
  errors: FormErrors = {
    foto: "",
    nombres: "",
    apellidos: "",
    cc: "",
    edad: "",
    sexo: "",
    emergenciaNombre: "",
    emergenciaTelefono: "",
    tutor: "",
    curso: "",
    email: "",
    recaptcha: ""
  }

  errorValidation: string = ""
  textRegex: RegExp = /^(?!^\s)(?!.*\s$)(?!.*\s\s)[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]+$/
  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  telefonoRegex: RegExp = /^0[1-9][0-9]{8}$/
  edadRegex: RegExp = /^(1[0-9]|20|[5-9]|10)$/
  //ccRegex: RegExp = /^[01]\d{9}$/
  ccRegex: RegExp = /^(?:\d{10}|(?:\d{3}-\d{3}-\d{4}))$/



  siteKey: string;
  registro: FormGroup = new FormGroup({
    foto: new FormControl("", [Validators.required, Validators.pattern(/\.(jpg|png)$/i)]),
    nombres: new FormControl("", [Validators.required, Validators.pattern(this.textRegex)]),
    apellidos: new FormControl("", [Validators.required, Validators.pattern(this.textRegex)]),
    cc: new FormControl("", [Validators.required, cedulaEcuatorianaValidator()]),
    edad: new FormControl("", [Validators.required, Validators.pattern(this.edadRegex)]),
    sexo: new FormControl("", [Validators.required]),
    emergenciaNombre: new FormControl("", [Validators.required, Validators.pattern(this.textRegex)]),
    emergenciaTelefono: new FormControl("", [Validators.required, Validators.pattern(this.telefonoRegex)]),
    tutor: new FormControl("", [Validators.required, Validators.pattern(this.textRegex)]),
    curso: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.pattern(this.emailRegex)]),
    recaptcha: new FormControl("", [Validators.required])
  })


  images = [
    {
      src: '../../../assets/imagenes/Sello.png',
      title: 'Sello',
      description: ''
    }
  ];

  validateFoto() {
    const name = "foto"
    const input = this.registro.get(name)
    const key = name as keyof typeof this.errors
    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('required')
    ) {
      this.errors[key] = "Debes seleccionar una foto"
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

  validateApellidos() {
    const name = "apellidos"
    const input = this.registro.get(name)
    const key = name as keyof typeof this.errors
    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('required')
    ) {
      this.errors[key] = "Debes escribir los apellidos"
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

  validateNombres() {
    const name = "nombres"
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

  validateTutor() {
    const name = "tutor"
    const input = this.registro.get(name)
    const key = name as keyof typeof this.errors
    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('required')
    ) {
      this.errors[key] = "Debes escribir los nombres del tutor"
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

  validateEmergenciaNombre() {
    const name = "emergenciaNombre"
    const input = this.registro.get(name)
    const key = name as keyof typeof this.errors
    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('required')
    ) {
      this.errors[key] = "Debes escribir los nombres del contacto de emergencia"
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

  validateEmail() {
    const name = "email"
    const input = this.registro.get(name)
    const key = name as keyof typeof this.errors
    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('required')
    ) {
      this.errors[key] = "Debes un email"
      return true;
    }

    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('pattern')
    ) {
      this.errors[key] = "Email invalido, ingresa un email válido"
      return true
    }

    return false;
  }

  validateCC() {
    const name = "cc"
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

  validateEmergenciaTelefono() {
    const name = "emergenciaTelefono"
    const input = this.registro.get(name)
    const key = name as keyof typeof this.errors
    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('required')
    ) {
      this.errors[key] = "Debes un número de telefono"
      return true;
    }

    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('pattern')
    ) {
      this.errors[key] = "Número de telono invalido, los números deben comenzar con 0 y solo se admiten 10 digitos"
      return true
    }

    return false;
  }

  validateSexo() {
    const name = "sexo"
    const input = this.registro.get(name)
    const key = name as keyof typeof this.errors
    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('required')
    ) {
      this.errors[key] = "Debes seleccionar el sexo"
      return true;
    }

    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('pattern')
    ) {
      this.errors[key] = "Selecciona un sexo válido"
      return true
    }

    return false;
  }

  validateCurso() {
    const name = "curso"
    const input = this.registro.get(name)
    const key = name as keyof typeof this.errors
    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('required')
    ) {
      this.errors[key] = "Debes seleccionar el curso"
      return true;
    }

    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('pattern')
    ) {
      this.errors[key] = "Selecciona un curso válido"
      return true
    }

    return false;
  }

  validateEdad() {
    const name = "edad"
    const input = this.registro.get(name)
    const key = name as keyof typeof this.errors
    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('required')
    ) {
      this.errors[key] = "Debes ingresar una edad"
      return true;
    }

    if (
      input?.invalid &&
      input?.touched &&
      input?.hasError('pattern')
    ) {
      this.errors[key] = "Edad debe estar entre 5 y 20 años"
      return true
    }

    return false;
  }

  validateForm() {
    if (this.registro.get('foto')?.invalid) {
      this.errorValidation = "Selecciona una foto válida"
      return false
    }
    if (this.registro.get('apellidos')?.invalid) {
      this.errorValidation = "Escribe apellidos válidos"
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
    if (this.registro.get('edad')?.invalid) {
      this.errorValidation = "Escribe una edad válida"
      return false
    }
    if (this.registro.get('sexo')?.invalid) {
      this.errorValidation = "Selecciona el sexo"
      return false
    }
    if (this.registro.get('emergenciaNombre')?.invalid) {
      this.errorValidation = "Escribe un nombre de emergencias válido"
      return false
    }
    if (this.registro.get('emergenciaTelefono')?.invalid) {
      this.errorValidation = "Escribe un número telefonico válido"
      return false
    }
    if (this.registro.get('tutor')?.invalid) {
      this.errorValidation = "Escribe un nombre de tutor válido"
      return false
    }
    if (this.registro.get('curso')?.invalid) {
      this.errorValidation = "Selecciona el curso"
      return false
    }
    if (this.registro.get('email')?.invalid) {
      this.errorValidation = "Escribe un correo válido"
      return false
    }
    if (this.registro.get('recaptcha')?.invalid) {
      this.errorValidation = "Selecciona el recaptcha"
      return false
    }

    return true
  }

  sendData() {
    if (this.validateForm()) {
      console.log("se envia");
      this.errorValidation = ""
      this.clearInputs()
    }
  }

  clearInputs() {
    this.errors.foto = ""
    this.errors.apellidos = ""
    this.errors.nombres = ""
    this.errors.cc = ""
    this.errors.email = ""
    this.errors.edad = ""
    this.errors.emergenciaNombre = ""
    this.errors.emergenciaTelefono = ""
    this.errors.curso = ""
    this.errors.tutor = ""
    this.errors.sexo = ""
    this.errors.recaptcha = ""
  }
}
