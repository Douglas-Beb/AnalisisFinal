import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-actualizar-tipo-movimiento-cxc',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-tipo-movimiento-cxc.component.html',
  styleUrl: './actualizar-tipo-movimiento-cxc.component.css'
})
export class ActualizarTipoMovimientoCxcComponent {

  cargar:boolean = false;
  tipomovimientocxc: any[] = [];
  actualizarTipoMovimientocxc: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerTipoMovimientoCxc();
  }

  obtenerTipoMovimientoCxc() {
    this.http.get<any[]>('http://localhost:8080/tipomovimientocxc/buscar').subscribe(
      (data) => {
        this.tipomovimientocxc = data;
      },
      (error) => {
        console.error('Error al obtener el tipo movimiento cxc', error);
      }
    );
  }

    agregar() {
    let formulario: any = document.getElementById('formulario');
    if (formulario.reportValidity()) {
      this.cargar = true;
      this.servicioActualizarTipoMovimientoCxc().subscribe((response: any) => this.resultadoServicio(response));
    }
  }
  resultadoServicio(res:any){
    this.cargar=false;
    alert("Tipo movimiento actualizado exitosamente")
    location.href = "/tablatipomovimientocxc";
  }

  servicioActualizarTipoMovimientoCxc() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<any>(
      'http://localhost:8080/tipomovimientocxc/actualizar/' + this.actualizarTipoMovimientocxc.idtipomovimientocxc,
      this.actualizarTipoMovimientocxc,
      httpOptions
    ).pipe(
      catchError((e) => 'error')
    );
  }

}
