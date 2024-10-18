  import { CommonModule } from '@angular/common';
  import { HttpClient } from '@angular/common/http';
  import { Component } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { Router } from '@angular/router';
  import { Observable } from 'rxjs';

  @Component({
    selector: 'app-recuperar-password',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './recuperar-password.component.html',
    styleUrl: './recuperar-password.component.css'
  })
  export class RecuperarPasswordComponent {

    nuevoUsuario: any = {};
    idusuario: string = '';
    usuario: any[] = [];
    preguntas: string[] = [];
    respuestaCorrecta: boolean = false;
    esPasswordValido: boolean = true;
    nuevaPasswordNoCoincide: boolean = false;

    constructor(private http: HttpClient, private router: Router) {}

    buscarUsuarioPorId(): void {
      if (this.idusuario) {
        this.servicioBuscarUsuarioPorId(this.idusuario).subscribe(
          (us: any) => {
            this.usuario = us;
            if (this.usuario.length) {
              this.preguntas = this.usuario.map(u => u.pregunta);
              this.nuevoUsuario.pregunta = this.preguntas[0];
            }
          },
          () => console.error('Error al buscar usuario.')
        );
      }
    }

    verificarRespuesta(): void {
      const { idusuario, pregunta, respuesta } = this.nuevoUsuario;

      const datosVerificacion = { idusuario: this.idusuario, pregunta, respuesta };

      this.servicioVerificarRespuesta(datosVerificacion).subscribe(
        (res: any) => {
          this.respuestaCorrecta = res.message === 'Respuesta correcta.';
          if (!this.respuestaCorrecta) {
            console.warn('Respuesta incorrecta. Por favor, intente de nuevo.');
          }
        },
        () => console.error('Error al verificar la respuesta.')
      );
    }

    validarPassword(): boolean {
      const password = this.nuevoUsuario.nuevaPassword;
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
      this.esPasswordValido = regex.test(password);

      if (!this.esPasswordValido) {
        console.warn('La contraseña debe tener entre 8 y 20 caracteres, e incluir al menos una letra mayúscula, una minúscula, un número y un símbolo.');
      }
      return this.esPasswordValido;
    }

    actualizarPassword(): void {
      if (this.validarPassword()) {
        this.nuevaPasswordNoCoincide = this.nuevoUsuario.nuevaPassword !== this.nuevoUsuario.repNuevaPassword;

        if (this.respuestaCorrecta && !this.nuevaPasswordNoCoincide) {
          this.servicioActualizarPassword(this.idusuario, this.nuevoUsuario).subscribe(
            () => {
              alert('Contraseña actualizada exitosamente.');
              this.router.navigate(['/']);
            },
            () => console.error('Error al actualizar la contraseña.')
          );
        } else {
          console.warn('Las contraseñas no coinciden o la respuesta de seguridad es incorrecta.');
        }
      }
    }

    servicioBuscarUsuarioPorId(idusuario: string): Observable<any> {
      return this.http.get(`http://localhost:8080/usuarioPregunta/buscar/${idusuario}`);
    }

    servicioVerificarRespuesta(datosVerificacion: any): Observable<any> {
      return this.http.post(`http://localhost:8080/usuarioPregunta/verificarRespuesta`, datosVerificacion, { responseType: 'json' });
    }

    servicioActualizarPassword(idusuario: string, nuevoUsuario: any): Observable<any> {
      return this.http.put(`http://localhost:8080/usuario/actualizar/${idusuario}`, { password: nuevoUsuario.nuevaPassword });
    }

  }
