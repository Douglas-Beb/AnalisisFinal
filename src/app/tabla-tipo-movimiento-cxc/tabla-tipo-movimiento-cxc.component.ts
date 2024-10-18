import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-tabla-tipo-movimiento-cxc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-tipo-movimiento-cxc.component.html',
  styleUrl: './tabla-tipo-movimiento-cxc.component.css'
})
export class TablaTipoMovimientoCxcComponent {
  tipomovimientocxc: any[] = [];
  cargar: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.buscarTipoMovimientoCxc();
  }

  buscarTipoMovimientoCxc() {
    this.cargar = true;
    this.buscarTipoMovimientoCxcServicio().subscribe(
      (response: any) => this.mostrarTipoMovimientoCxc(response)
    );
  }

  mostrarTipoMovimientoCxc(response: any) {
    this.cargar = false;
    this.tipomovimientocxc = response;
  }

  buscarTipoMovimientoCxcServicio(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/tipomovimientocxc/buscar").pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

  eliminar(idtipomovimientocxc: any) {
    this.cargar = true;
    this.eliminarTipoMovimientoCxcServicio(idtipomovimientocxc).subscribe(
      (response: any) => {
        // Mostrar el cuadro de diálogo
        alert('Tipo movimiento cxc eliminada exitosamente.');
        // Actualizar la lista de empresas
        this.buscarTipoMovimientoCxc();
      },
      (error: any) => {
        console.error('Error al eliminar el Tipo movimiento cxc:', error);
        this.cargar = false; // Ocultar la barra de progreso si hay un error
      }
    );
  }


  eliminarTipoMovimientoCxcServicio(id: any): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/tipomovimientocxc/eliminar/${id}`).pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
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

  actualizar(){
    this.router.navigate(['/actualizartipomovimientocxc']);
  }

}
