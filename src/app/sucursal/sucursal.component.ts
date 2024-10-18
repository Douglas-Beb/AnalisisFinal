import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';


@Component({
  selector: 'app-sucursal',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent {
  empresa: any[] = [];
  sucursal: any[] = [];
  cargar: boolean = false;


  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.buscarSucursal();
    this.cargarEmpresa();
  }

  cargarEmpresa() {
    this.http.get<any[]>("http://localhost:8080/empresa/buscar").subscribe(
      data => this.empresa = data,
      error => console.error("Error al cargar las empresas", error)
    );
  }

  buscarSucursal() {
    this.cargar = true;
    this.buscarSucursalServicio().subscribe(
      (response: any) => this.mostrarSucursal(response)
    );
  }

  mostrarSucursal(response: any) {
    this.cargar = false;
    this.sucursal = response;
  }

  buscarSucursalServicio(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/sucursal/buscar").pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

  eliminar(idsucursal: any) {
    this.cargar = true;
    this.eliminarSucursalServicio(idsucursal).subscribe(
      (response: any) => {
        // Mostrar el cuadro de diálogo
        alert('Sucursal eliminada exitosamente.');
        // Actualizar la lista de empresas
        this.buscarSucursal();
      },
      (error: any) => {
        console.error('Error al eliminar la sucursal:', error);
        this.cargar = false; // Ocultar la barra de progreso si hay un error
      }
    );
  }
  

  eliminarSucursalServicio(id: any): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/sucursal/eliminar/${id}`).pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

  actualizar(){
    this.router.navigate(['/actualizarsucursal']);
  }

  getEmpresa(id: any): string {
    const empresa = this.empresa.find(p => p.idempresa === id);
    return empresa ? empresa.nombre : 'Desconocido';
  } 

}
