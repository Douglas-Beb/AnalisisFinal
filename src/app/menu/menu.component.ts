import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  usuarios: any = [];
  usuario: any = {};

  constructor(private http: HttpClient) {
    let t = localStorage.getItem('usuario');
    if (t) {
      this.usuario = JSON.parse(t);
    }
    this.buscarUsuario();
  }

  buscarUsuario() {
    this.servicioBuscarUsuario().subscribe((an: any) => (this.usuarios = an));
  }

  servicioBuscarUsuario(): Observable<any> {
    return this.http.get('http://localhost:8080/usuario/buscar');
  }

  logout() {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    if (usuario) {
      this.servicioLogout(usuario).subscribe({
        next: () => {
          localStorage.removeItem('usuario'); // Limpiar datos del usuario
          alert('Sesión cerrada correctamente.');
          location.href = '/'; // Redirigir a la página de inicio de sesión
        },
        error: (error) => {
          console.error('Error al cerrar sesión:', error);
          alert('Error al cerrar sesión. Intente nuevamente.');
        },
      });
    } else {
      alert('No hay sesión activa.');
    }
  }

  servicioLogout(usuario: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json', // Indicar que la respuesta esperada es texto
    };
    return this.http.post<any>(
      'http://localhost:8080/usuario/logout',
      usuario,
      httpOptions
    );
  }

}
