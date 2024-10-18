import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  
  usuario: any[] = [];
  cargar: boolean = false;
  sucursal: any[] = [];


  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.buscarUsuario();
    this.cargarSucursal();
  }

  cargarSucursal() {
    this.http.get<any[]>("http://localhost:8080/sucursal/buscar").subscribe(
      data => this.sucursal = data,
      error => console.error("Error al cargar las empresas", error)
    );
  }

  buscarUsuario() {
    this.cargar = true;
    this.buscarUsuarioServicio().subscribe(
      (response: any) => this.mostrarUsuario(response)
    );
  }

  mostrarUsuario(response: any) {
    this.cargar = false;
    this.usuario = response;
  }

  buscarUsuarioServicio(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/usuario/buscar").pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

  eliminar(idusuario: any) {
    this.cargar = true;
    this.eliminarUsuarioServicio(idusuario).subscribe(
      (response: any) => {
        // Mostrar el cuadro de diálogo
        alert('Usuario eliminado exitosamente.');
        // Actualizar la lista de empresas
        this.buscarUsuario();
      },
      (error: any) => {
        console.error('Error al eliminar el usuario:', error);
        this.cargar = false; // Ocultar la barra de progreso si hay un error
      }
    );
  }
  

  eliminarUsuarioServicio(id: any): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/usuario/eliminar/${id}`).pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

  actualizar(){
    this.router.navigate(['/actualizarusuario']);
  }

  cambiarEstatus(usuario: any) {
    usuario.idstatususuario = usuario.idstatususuario === 1 ? 2 : 1;
    this.actualizarEstatusUsuario(usuario.idusuario, usuario.idstatususuario).subscribe(
      (response: any) => {
      },
      (error: any) => {
        console.error('Error al actualizar el estatus:', error);
        alert('Error al actualizar el estatus.');
      }
    );
  }
  
  actualizarEstatusUsuario(idusuario: number, estatus: number): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/usuario/actualizarestatus`, { idusuario, estatus }).pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

  getSucursal(id: any): string {
    const sucursal = this.sucursal.find(p => p.idsucursal === id);
    return sucursal ? sucursal.nombre : 'Desconocido';
  } 

}
