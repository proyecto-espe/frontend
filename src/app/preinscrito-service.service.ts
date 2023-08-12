import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

interface email {
  emailData: {
    email: string,
    subject: string,
    text: string,
    type: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class PreinscritoServiceService {

  //Se crea una variable comun para todos los servicios
  //url = "http://localhost:3000/"
  url = "http://44.203.172.51:3000/"


  constructor(public http: HttpClient , public https: HttpClient) { }


  //Funcion para recuperar preinscritos
  getPreinscritos() {
    return new Promise(resolve => {
      this.http.get(this.url + 'preinscritos').subscribe({
        next: (data) => {
          resolve(data)
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  //Funcion para recuperar inscritos aprobados
  getPreinscritosAprobados() {
    //Promesa para manejar programacion asincrona
    return new Promise(resolve => {
      this.http.get(this.url + 'preinscritosaprobados').subscribe({
        //Al subscribe se le pasa dos parametros,
        next: (data) => {
          resolve(data)
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  //Funcion para guardad preinscrito
  savePreinscrito(preinscrito: any) {
    return new Promise(resolve => {
      this.http.post(this.url + 'preinscrito', preinscrito).subscribe({
        next: (data) => {
          resolve(data)
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  //Funcion para eliminar preinscrito
  deletePreinscritoById(id: number) {
    // Promesa para manejar programación asíncrona
    return new Promise(resolve => {
      this.http.delete(this.url + 'preinscrito/eliminar/' + id).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  //Funcion para eliminar preinscrito
  deleteInscritoByCedula(cedula: number) {
    // Promesa para manejar programación asíncrona
    return new Promise(resolve => {
      this.http.delete(this.url + 'inscrito/eliminar-cedula/' + cedula).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  //Funcion para actualizar preinscrito
  updateEstadoPreinscrito(id: number, nuevoEstado: string, foto: any) {
    return new Promise(resolve => {
      const data = { estadopreinscrito: nuevoEstado, fotopreinscrito: foto};
      this.http.put(this.url + 'preinscrito/actualizar/' + id, data).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  //Funcion para actualizar preinscrito
  updateEstadoPreinscrito1(id: number, nuevoEstado: string) {
    return new Promise(resolve => {
      const data = { estadopreinscrito1: nuevoEstado};
      this.http.put(this.url + 'preinscrito/actualizar1/' + id, data).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  //Funcion para guardad pago
  savePago(pago: any) {
    return new Promise(resolve => {
      this.http.post(this.url + 'pago', pago).subscribe({
        next: (data) => {
          resolve(data)
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  //Funcion para guardad pago
  sendMail(data: email) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.url + 'email', data, { headers });
  }

    //Funcion para guardad pago
    doPost(path: string, data: any) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      return this.http.post<any>(this.url + path, data, { headers });
    }

  //Login
  login(data:any){
    return new Promise(resolve => {
      this.http.post(this.url + 'login', data).subscribe({
        next: (data) => {
          resolve(data)
        },
        error: (err) => {
          alert(err.error);
          console.log(err);
        }
      });
    });
  }

}
