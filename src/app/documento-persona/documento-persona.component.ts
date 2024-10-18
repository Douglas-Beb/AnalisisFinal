import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-documento-persona',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './documento-persona.component.html',
  styleUrls: ['./documento-persona.component.css']
})
export class DocumentoPersonaComponent {

  documento: any[] = [];
  cargar: boolean = false;
  nombresUnicos: string[] = [];
  nombreSeleccionado: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.buscarDocumento();
  }

  buscarDocumento() {
    this.cargar = true;
    this.buscarDocumentoServicio().subscribe(
      (response: any) => this.mostrarDocumento(response)
    );
  }

  mostrarDocumento(response: any) {
    this.cargar = false;
    this.documento = response;
    this.extraerNombresUnicos(); // Obtener nombres únicos después de cargar los documentos
  }

  extraerNombresUnicos() {
    const nombresSet = new Set(this.documento.map(doc => doc.nombre)); // Obtener nombres únicos
    this.nombresUnicos = Array.from(nombresSet); // Convertir Set a Array
  }

  filtrarPorPersona() {
    if (this.nombreSeleccionado) {
      const documentosFiltrados = this.documento.filter(doc => doc.nombre === this.nombreSeleccionado);
      this.documento = documentosFiltrados;
    } else {
      this.buscarDocumento(); // Recargar todos los documentos si no hay selección
    }
  }

  buscarDocumentoServicio(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/documentopersona/buscarconnombre").pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

  eliminar(idtipodocumento: any, idpersona: any) {
    this.cargar = true;
    this.eliminarDocumentoServicio(idtipodocumento, idpersona).subscribe(
      (response: any) => {
        alert('Documento eliminado exitosamente.');
        this.buscarDocumento(); // Actualizar la lista de documentos
      },
      (error: any) => {
        console.error('Error al eliminar el documento:', error);
        this.cargar = false; // Ocultar la barra de progreso si hay un error
      }
    );
  }

  eliminarDocumentoServicio(IdTipoDocumento: any, IdPersona: any): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/documentopersona/eliminar/${IdTipoDocumento}/${IdPersona}`).pipe(
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
      responseType: 'text' as 'json',
    };
    return this.http.post<any>('http://localhost:8080/usuario/logout', usuario, httpOptions);
  }

  actualizar() {
    this.router.navigate(['/actualizardocumento']);
  }
}
