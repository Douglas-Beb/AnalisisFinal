import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-registro-documento',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './registro-documento.component.html',
  styleUrl: './registro-documento.component.css'
})
export class RegistroDocumentoComponent {
  cargar: boolean = false;
  docpersona: any[] = [];
  nuevaDocumento: any = {};
  docidpersona: any[] = [];


  constructor(private http: HttpClient) {

       this.obtenerIdpersona();

  }




  obtenerIdpersona() {
    this.http.get<any[]>('http://localhost:8080/persona/buscar').subscribe(

      data =>  this.docidpersona =data,


        error=>console.error('Error al obtener al id persona', error)
    );

  }


  agregar() {
    let formulario: any = document.getElementById("formulario");
    if (formulario.reportValidity()) {
      this.cargar = true;
      this.servicioGuardar().subscribe(
        (response: any) => this.resultadoServicio(response)
      );
    }
  }

  resultadoServicio(res: any) {
    this.cargar = false;
    alert("Persona creada exitosamente");
    location.href = "/documentopersona";
  }


  servicioGuardar() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(
      "http://localhost:8080/documentopersona/guardar",
      this.nuevaDocumento,
      httpOptions
    ).pipe(
      catchError(e => "error")
    );
  }




}


