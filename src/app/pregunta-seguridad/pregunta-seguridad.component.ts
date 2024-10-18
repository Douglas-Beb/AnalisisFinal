import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pregunta-seguridad',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pregunta-seguridad.component.html',
  styleUrl: './pregunta-seguridad.component.css'
})
export class PreguntaSeguridadComponent {

  nuevoUsuario: any = {};
  usuario: any = {};

  constructor(private http: HttpClient) {

    this.cargarUsuarios();

    const t = sessionStorage.getItem('usuario');
    if (t) {
      this.usuario = JSON.parse(t);
      this.nuevoUsuario.idusuario = this.usuario.idusuario; 
    }
  }

  cargarUsuarios() {
    this.http.get<any[]>("http://localhost:8080/usuario/buscar").subscribe(
      data => this.usuario = data,
      error => console.error("Error al cargar usuarios", error)
    );
  }

  guardarUsuario() {
    this.servicioGuardarUsuario(this.nuevoUsuario).subscribe(
      (respuesta: any) => {
        alert('Pregunta de seguridad guardada con éxito');
        this.nuevoUsuario = {};
        window.history.back();
      },
      (error: any) => {
        alert('Error al guardar la pregunta de seguridad');
      }
    );
  }

  servicioGuardarUsuario(nuevoUsuario: any): Observable<any> {
    return this.http.post('http://localhost:8080/usuarioPregunta/guardar', nuevoUsuario);
  }

}
