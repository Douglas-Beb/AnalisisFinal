import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-tipo-movimiento-cxc',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tipo-movimiento-cxc.component.html',
  styleUrl: './tipo-movimiento-cxc.component.css'
})
export class TipoMovimientoCxcComponent {
  cargar: boolean = false;
  tipomovimientocxc: any[] = [];
  nuevoTipoMovimientoCxc: any = {};

  constructor(private http: HttpClient) {}

  agregar() {
    let formulario: any = document.getElementById("formulario");
    if (formulario.reportValidity()) {
      this.cargar = true;
      this.servicioGuardar().subscribe(
        (response: any) => this.resultadoServicio(response),
        (error: any) => {
          this.cargar = false; // Detiene el estado de carga
          console.error("Error al agregar al agregar tipo documento cxc", error);
          alert("Error al agregar el tipo documento cxc");
        }
      );
    }
  }

  resultadoServicio(res: any) {
    this.cargar = false;
    alert("Tipo documento cxc creada exitosamente");
    location.href = "/tablatipomovimientocxc"; // Redirige a la lista de status cuentas
  }

  servicioGuardar() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>("http://localhost:8080/tipomovimientocxc/guardar", this.nuevoTipoMovimientoCxc, httpOptions).pipe(
      catchError(e => {
        console.error("Error al guardar el tipo documento cxc", e);
        return "error"; // Manejo de errores simplificado
      })
    );
  }
}
