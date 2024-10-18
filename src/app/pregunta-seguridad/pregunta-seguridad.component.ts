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
    const t = localStorage.getItem('usuario');
    if (t) {
      this.usuario = JSON.parse(t);
      this.nuevoUsuario.idusuario = this.usuario.idusuario; // Asignar el ID de usuario por defecto
    }
  }

  guardarUsuario() {
    this.servicioGuardarUsuario(this.nuevoUsuario).subscribe(
      (respuesta: any) => {
        console.log('Pregunta de seguridad guardada con éxito', respuesta);
        this.nuevoUsuario = {};
        window.history.back();
      },
      (error: any) => {
        console.error('Error al guardar la pregunta de seguridad', error);
      }
    );
  }

  servicioGuardarUsuario(nuevoUsuario: any): Observable<any> {
    return this.http.post('http://localhost:8080/usuarioPregunta/guardar', nuevoUsuario);
  }

}
