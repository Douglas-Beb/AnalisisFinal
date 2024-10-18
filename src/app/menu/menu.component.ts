import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  usuarios: any = [];
  usuario: any = {};

  constructor(private http: HttpClient) {
    let t = sessionStorage.getItem('usuario');
    if (t) {
      this.usuario = JSON.parse(t);
    }
    this.buscarUsuario();
  }

  ngOnInit(): void {
    const usuarioStr = sessionStorage.getItem("usuario");
    if (usuarioStr) {
      this.usuario = JSON.parse(usuarioStr);
    } else {
      location.href = "/"; 
    }
  }

  buscarUsuario() {
    this.servicioBuscarUsuario().subscribe((an: any) => (this.usuarios = an));
  }

  servicioBuscarUsuario(): Observable<any> {
    return this.http.get('http://localhost:8080/usuario/buscar');
  }

  logout() {
    const usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    if (usuario) {
      this.servicioLogout(usuario).subscribe({
        next: () => {
          sessionStorage.removeItem('usuario'); // Limpiar datos del usuario
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

  activeSubmenu: string | null = null; // Para rastrear el submenú activo

  toggleSubmenu(submenu: string): void {
    this.activeSubmenu = this.activeSubmenu === submenu ? null : submenu;
  }
  
}
