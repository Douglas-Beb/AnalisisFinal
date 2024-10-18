import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-actualizar-persona',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './actualizar-persona.component.html',
  styleUrl: './actualizar-persona.component.css'
})
export class ActualizarPersonaComponent {

  cargar:boolean = false;
  persona: any[] = [];
  nuevaPersona: any = {};
  estado: any[] = [];


  constructor(private http: HttpClient) {



  }


  obtenerEstadosCiviles() {
    this.http.get<any[]>('http://localhost:8080/estadocivil/buscar').subscribe(
      (response) => {
        this.estado = response;
      },
      (error) => {
        console.error('Error al obtener estados civiles', error);
      }
    );
  }

  ngOnInit() {
    this.obtenerPersonas();
    this.obtenerEstadosCiviles();
  }

  obtenerPersonas() {
    this.http.get<any[]>('http://localhost:8080/persona/buscar').subscribe(
      (data) => {
        this.persona = data;
      },
      (error) => {
        console.error('Error al obtener personas', error);
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
    alert("Persona actualizada exitosamente")
    location.href = "/persona";
  }

  servicioGuardar() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<any>(
      'http://localhost:8080/persona/actualizar/' + this.nuevaPersona.idpersona,
      this.nuevaPersona,
      httpOptions
    ).pipe(
      catchError((e) => 'error')
    );
  }


}
