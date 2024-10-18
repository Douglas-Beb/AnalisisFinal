import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-registro-persona',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-persona.component.html',
  styleUrl: './registro-persona.component.css'
})
export class RegistroPersonaComponent {

  cargar: boolean = false;
  persona: any[] = [];
  nuevaPersona: any = {};
  estado: any[] = []; // Aquí almacenaremos los estados civiles



  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerEstadosCiviles(); // Cargar los estados civiles al inicializar el componente
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
    location.href = "/persona";
  }

  servicioGuardar() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(
      "http://localhost:8080/persona/guardar",
      this.nuevaPersona,
      httpOptions
    ).pipe(
      catchError(e => "error")
    );
  }
}
