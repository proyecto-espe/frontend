export interface FormErrors {
  foto: string;
  nombres: string;
  apellidos: string;
  cc: string;
  edad: string;
  sexo: string;
  emergenciaNombre: string;
  emergenciaTelefono: string;
  tutor: string;
  curso: string;
  email: string
  recaptcha: string
}

export interface VoucherErrors {
  voucher: string;
  ccPagador: string;
  ccCursante: string;
  nombresPagador: string;
  nombresCursante: string;
  recaptcha: string
}
