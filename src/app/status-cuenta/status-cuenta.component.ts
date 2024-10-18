import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-status-cuenta',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './status-cuenta.component.html',
  styleUrl: './status-cuenta.component.css'
})
export class StatusCuentaComponent{

  cargar: boolean = false;
  statuscuenta: any[] = [];
  nuevaStatusCuenta: any = {};

  constructor(private http: HttpClient) {}

  agregar() {
    let formulario: any = document.getElementById("formulario");
    if (formulario.reportValidity()) {
      this.cargar = true;
      this.servicioGuardar().subscribe(
        (response: any) => this.resultadoServicio(response),
        (error: any) => {
          this.cargar = false; // Detiene el estado de carga
          console.error("Error al agregar el status cuenta", error);
          alert("Error al agregar el status cuenta");
        }
      );
    }
  }

  resultadoServicio(res: any) {
    this.cargar = false;
    alert("Status cuenta creada exitosamente");
    location.href = "/statuscuenta"; // Redirige a la lista de status cuentas
  }

  servicioGuardar() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>("http://localhost:8080/statuscuenta/guardar", this.nuevaStatusCuenta, httpOptions).pipe(
      catchError(e => {
        console.error("Error al guardar el status cuenta", e);
        return "error"; // Manejo de errores simplificado
      })
    );
  }
}
