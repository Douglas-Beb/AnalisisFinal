import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-actualizar-status-cuenta',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-status-cuenta.component.html',
  styleUrl: './actualizar-status-cuenta.component.css'
})
export class ActualizarStatusCuentaComponent {

  cargar:boolean = false;
  statuscuenta: any[] = [];
  actualizarStatusCuenta: any = {};

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.obtenerStatusCuenta();
  }

  obtenerStatusCuenta() {
    this.http.get<any[]>('http://localhost:8080/statuscuenta/buscar').subscribe(
      (data) => {
        this.statuscuenta = data;
      },
      (error) => {
        console.error('Error al obtener el status cuenta', error);
      }
    );
  }

    agregar() {
    let formulario: any = document.getElementById('formulario');
    if (formulario.reportValidity()) {
      this.cargar = true;
      this.servicioActualizarStatusCuenta().subscribe((response: any) => this.resultadoServicio(response));
    }
  }
  resultadoServicio(res:any){
    this.cargar=false;
    alert("Status cuenta actualizada exitosamente")
    location.href = "/tablastatuscuenta";
  }

  servicioActualizarStatusCuenta() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<any>(
      'http://localhost:8080/statuscuenta/actualizar/' + this.actualizarStatusCuenta.idstatuscuenta,
      this.actualizarStatusCuenta,
      httpOptions
    ).pipe(
      catchError((e) => 'error')
    );
  }

}
