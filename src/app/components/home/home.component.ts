import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images = [
    {
      src: '../../../assets/imagenes/nat-1.jpg',
      title: '<div style="text-align:center">Básico</div>',
      description: '<div class="center-align">Sumérgete en el apasionante mundo de la natación con nuestro curso básico. Diseñado para principiantes sin experiencia previa, te brindamos las habilidades fundamentales para sentirte cómodo y seguro en el agua. Aprende las técnicas de respiración, flotación, propulsión y mejora tu confianza en el medio acuático. Descubre también la importancia de la coordinación, el equilibrio, la resistencia y la diversión.</div><br><b>Requisitos:</b> <br>Edad: mayor a 5 años<br>Prerequisitos: Ninguno<br>Costo: $20<br>Duración: 2 semanas/4 semanas sábados y domingos<br>Certificado médico: No presentar problemas cardiacos.'
    },
    {
      src: '../../../assets/imagenes/nat-2.jpg',
      title: '<div style="text-align:center">Intermedio</div>',
      description: '<div class="center-align">Da un paso adelante en tu desarrollo como nadador con nuestro curso intermedio. Mejora tus habilidades de natación y aumenta tu resistencia en el agua. Trabajaremos en técnicas de estilo libre, espalda, pecho y mariposa, perfeccionando tu técnica y ayudándote a alcanzar una mayor eficiencia en tus movimientos. Además, exploraremos estrategias avanzadas para potenciar tu rendimiento y disfrutar de la experiencia.</div><br><b>Requisitos:</b> <br>Edad: mayor a 5 años<br>Prerequisitos: Curso básico/ Experiencia (prueba)<br>Costo: $20<br>Duración: 2 semanas /4 semanas sábados y domingos<br>Certificado médico: No presentar problemas cardiacos.'
    },
    {
      src: '../../../assets/imagenes/nat-3.jpg',
      title: '<div class="center-align">Avanzado</div>',
      description: '<div class="center-align">Para aquellos que buscan un desafío mayor o quieres competir, nuestro curso avanzado es perfecto para ti. Aquí nos enfocamos en técnicas de natación avanzadas, estrategias de competición y entrenamiento de resistencia. Prepárate para alcanzar niveles superiores de rendimiento y destreza en el agua mientras te adentras en un nuevo nivel de dominio de los diferentes estilos de natación.</div><br><b>Requisitos:</b> <br>Edad: mayor a 8 años<br>Prerequisitos: Curso intermedio / Experiencia (prueba)<br>Costo: $30<br>Duración: 4 semanas / 8 semanas sábados y domingos<br>Certificado médico: No presentar problemas cardiacos.'
    },
    {
      src: '../../../assets/imagenes/nat-4.jpg',
      title: '<div class="center-align">Intensivo Inicial</div>',
      description: '<div class="center-align">Si deseas un impulso rápido y eficaz en tu habilidad para nadar y no tienes el suficiente tiempo, nuestro curso intensivo inicial es ideal. Durante una semana intensiva, te proporcionaremos un programa estructurado y enfocado que te permitirá adquirir rápidamente las bases de la natación. Con sesiones prácticas y teóricas, acelerarás tu progreso y estarás listo para disfrutar de las aguas con confianza.</div><br><b>Requisitos:</b> <br>Edad: mayor a 5 años<br>Prerequisitos: Ninguno<br>Costo: $20<br>Duración: 1 semana / 2 semanas sábados y domingos<br>Certificado médico: No presentar problemas cardiacos.'
    }
  ];

  images1 = [
    {
      src: '../../../assets/imagenes/Sello.png',
      title: 'Sello',
      description: ''
    }
  ];
}
