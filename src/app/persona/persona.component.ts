import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';


@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent {

  persona: any[] = [];
  cargar: boolean = false;


  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.buscarPersona();
  }

  buscarPersona() {
    this.cargar = true;
    this.buscarPersonaServicio().subscribe(
      (response: any) => this.mostrarPersona(response)
    );
  }

  mostrarPersona(response: any) {
    this.cargar = false;
    this.persona = response;
  }

  buscarPersonaServicio(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/persona/buscar").pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

  eliminar(idpersona: any) {
    this.cargar = true;
    this.eliminarPersonaServicio(idpersona).subscribe(
      (response: any) => {

        alert('Persona eliminada exitosamente.');
        this.buscarPersona();
      },
      (error: any) => {
        console.error('Error al eliminar la persona:', error);
        this.cargar = false;
      }
    );
  }


  eliminarPersonaServicio(id: any): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/persona/eliminar/${id}`).pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }


  logout() {
    const usuario = JSON.parse(sessionStorage.getItem('usuario')!);
    if (usuario) {
      this.servicioLogout(usuario).subscribe({
        next: () => {
          sessionStorage.removeItem('usuario');
          alert('Sesión cerrada correctamente.');
          location.href = '/';
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
    this.router.navigate(['/actualizarpersona']);
  }

}
