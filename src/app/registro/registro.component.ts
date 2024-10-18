import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  usuario: any[] = [];
  nuevoUsuario: any = { idstatususuario: 1 };
  esPasswordValido = true;

  constructor(private http: HttpClient) {
    this.buscarUsuarios();
  }

  archivoSeleccionado(evento: any) {
    const archivo: File = evento.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onload = () => {
        this.nuevoUsuario.fotografia = lector.result as string;
      };
      lector.readAsDataURL(archivo);
    }
  }

  validarPassword() {
    const password = this.nuevoUsuario.password;
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    this.esPasswordValido = regex.test(password);
  }

  guardarUsuario() {
    this.validarPassword();
    if (!this.esPasswordValido) {
      console.error('La contraseña no cumple con los requisitos.');
      return;
    }

    this.servicioGuardarUsuario(this.nuevoUsuario).subscribe(
      (respuesta: any) => {
        console.log('Usuario guardado con éxito', respuesta);
        this.nuevoUsuario = {};
        this.buscarUsuarios();
        window.history.back();
      },
      (error: any) => {
        console.error('Error al guardar el usuario', error);
      }
    );
  }

  servicioGuardarUsuario(nuevoUsuario: any): Observable<any> {
    return this.http.post(
      'http://localhost:8080/usuario/guardar',
      nuevoUsuario
    );
  }

  buscarUsuarios() {
    this.servicioBuscarUsuarios().subscribe((us: any) => (this.usuario = us));
  }

  servicioBuscarUsuarios(): Observable<any> {
    return this.http.get('http://localhost:8080/usuario/buscar');
  }

  regresar() {
    location.href = '/';
  }
}
