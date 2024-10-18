import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css',
})
export class MiPerfilComponent {

  usuario: any = {};
  isEditing: boolean = false;

  constructor(private http: HttpClient) {
    let t = sessionStorage.getItem('usuario');
    if (t) {
      this.usuario = JSON.parse(t);
    }
  }

  ngOnInit(): void {
    const usuarioStr = sessionStorage.getItem("usuario");
    if (usuarioStr) {
      this.usuario = JSON.parse(usuarioStr);
    } else {
      location.href = "/"; // Redirigir si no hay usuario en localStorage
    }
  }

  // Método para activar el modo de edición
  activarEdicion() {
    this.isEditing = true;
  }

  // Método para cancelar la edición
  cancelarEdicion() {
    this.isEditing = false;
  }

  // Método para actualizar el perfil del usuario
  actualizarPerfil() {
    const url = `http://localhost:8080/usuario/actualizarPerfil/${this.usuario.idusuario}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(url, this.usuario, { headers })
      .subscribe(
        (response: any) => {
          console.log('Perfil actualizado', response);
          sessionStorage.setItem('usuario', JSON.stringify(this.usuario)); // Actualizar el localStorage
          this.isEditing = false;
        },
        (error) => {
          console.error('Error al actualizar el perfil', error);
        }
      );
  }


}
