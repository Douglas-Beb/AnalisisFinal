import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-estado-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MenuComponent],
  templateUrl: './estado-cuenta.component.html',
  styleUrl: './estado-cuenta.component.css'
})
export class EstadoCuentaComponent {
  documento: any[] = []; // Todos los datos (incluyendo nombres repetidos)
  documentosFiltrados: any[] = []; // Para mostrar en la tabla después del filtrado
  nombresUnicos: string[] = [];  // Lista de nombres únicos para el combo box
  nombreSeleccionado: string = '';  // Nombre seleccionado por el usuario
  cargar: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.buscarDocumento();  // Buscar todos los documentos al cargar el componente
  }

  buscarDocumento() {
    this.cargar = true;
    this.buscarDocumentoServicio().subscribe(
      (response: any) => this.mostrarDocumento(response)
    );
  }

  mostrarDocumento(response: any) {
    this.cargar = false;
    this.documento = response;  // Guarda todos los datos con nombres repetidos
    this.documentosFiltrados = this.documento;  // Inicialmente muestra todos los documentos en la tabla
    this.nombresUnicos = this.getNombresUnicos();  // Extrae los nombres únicos para el combo box
  }

  // Método para extraer nombres únicos
  getNombresUnicos(): string[] {
    const nombres = this.documento.map(doc => doc.nombre_persona); // Extrae solo los nombres
    return Array.from(new Set(nombres));  // Usa Set para eliminar duplicados
  }

  // Método para filtrar los documentos según el nombre seleccionado
  filtrarPorNombre() {
    if (this.nombreSeleccionado) {
      // Si hay un nombre seleccionado, filtra los documentos por ese nombre
      this.documentosFiltrados = this.documento.filter(doc => doc.nombre_persona === this.nombreSeleccionado);
    } else {
      // Si no hay nombre seleccionado, muestra todos los documentos
      this.documentosFiltrados = this.documento;
    }
  }

  buscarDocumentoServicio(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/movimientoCuenta/buscarconnombre").pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

}
