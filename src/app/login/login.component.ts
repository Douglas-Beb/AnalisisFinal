import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  usuario: any = {};

  constructor(private http: HttpClient) {}

  login() {
    const validarFormulario: any = document.getElementById('loginForm');
    if (validarFormulario.reportValidity()) {
      this.servicioLogin().subscribe(
        (usuario: any) => this.darBienvenida(usuario),
        (error) => this.registrarIntentoFallido(error)
      );
    }
  }

  darBienvenida(resultado: any) {
    if (resultado) {
      sessionStorage.setItem('usuario', JSON.stringify(resultado));
      this.usuario = {};
      location.href = '/menu';
    }
  }

  servicioLogin() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(
        'https://72.44.46.16//usuario/login',
        this.usuario,
        httpOptions
      )
      .pipe(catchError((error) => throwError(() => error)));
  }

  registrarIntentoFallido(error: any) {
    if (error.status === 423) {
      alert('Cuenta bloqueada temporalmente. Intente de nuevo en 1 minuto.');
    } else if (error.status === 401) {
      this.usuario.idusuario = '';
    this.usuario.password = '';
      alert('Usuario o contraseña incorrectos.');
    } else {
      alert('Ocurrió un error. Intente nuevamente.');
    }
  }

}
