import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-actualizar-sucursal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-sucursal.component.html',
  styleUrl: './actualizar-sucursal.component.css',
})
export class ActualizarSucursalComponent implements OnInit{

  cargar:boolean = false;
  sucursal: any[] = [];
  nuevaSucursal: any = {};

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.obtenerSucursal();
  }

  obtenerSucursal() {
    this.http.get<any[]>('http://localhost:8080/sucursal/buscar').subscribe(
      (data) => {
        this.sucursal = data;
      },
      (error) => {
        console.error('Error al obtener sucursal', error);
      }
    );
  }


  agregar() {
    let formulario: any = document.getElementById('formulario');
    if (formulario.reportValidity()) {
      this.cargar = true;
      this.servicioGuardar().subscribe((response: any) => this.resultadoServicio(response));
    }
  }

  resultadoServicio(res:any){
    this.cargar=false;
    alert("Sucursal actualizada exitosamente")
    location.href = "/sucursal";
  }

  servicioGuardar() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<any>(
      'http://localhost:8080/sucursal/actualizar/' + this.nuevaSucursal.idsucursal,
      this.nuevaSucursal,
      httpOptions
    ).pipe(
      catchError((e) => 'error')
    );
  }

}

