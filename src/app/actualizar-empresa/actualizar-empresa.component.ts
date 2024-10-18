import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-actualizar-empresa',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-empresa.component.html',
  styleUrl: './actualizar-empresa.component.css',
})
export class ActualizarEmpresaComponent implements OnInit{

  cargar:boolean = false;
  empresa: any[] = [];
  nuevaEmpresa: any = {};

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.obtenerEmpresas();
  }

  obtenerEmpresas() {
    this.http.get<any[]>('http://localhost:8080/empresa/buscar').subscribe(
      (data) => {
        this.empresa = data;
      },
      (error) => {
        console.error('Error al obtener empresas', error);
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
    alert("Empresa actualizada exitosamente")
    location.href = "/empresa";
  }

  servicioGuardar() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<any>(
      'http://localhost:8080/empresa/actualizar/' + this.nuevaEmpresa.idempresa,
      this.nuevaEmpresa,
      httpOptions
    ).pipe(
      catchError((e) => 'error')
    );
  }

}

