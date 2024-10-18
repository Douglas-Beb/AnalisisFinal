import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';


@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent {
  
  empresa: any[] = [];
  cargar: boolean = false;


  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.buscarEmpresa();
  }

  buscarEmpresa() {
    this.cargar = true;
    this.buscarEmpresaServicio().subscribe(
      (response: any) => this.mostrarEmpresa(response)
    );
  }

  mostrarEmpresa(response: any) {
    this.cargar = false;
    this.empresa = response;
  }

  buscarEmpresaServicio(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/empresa/buscar").pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

  eliminar(idempresa: any) {
    this.cargar = true;
    this.eliminarEmpresaServicio(idempresa).subscribe(
      (response: any) => {
        // Mostrar el cuadro de diálogo
        alert('Empresa eliminada exitosamente.');
        // Actualizar la lista de empresas
        this.buscarEmpresa();
      },
      (error: any) => {
        console.error('Error al eliminar la empresa:', error);
        this.cargar = false; // Ocultar la barra de progreso si hay un error
      }
    );
  }
  

  eliminarEmpresaServicio(id: any): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/empresa/eliminar/${id}`).pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

  actualizar(){
    this.router.navigate(['/actualizarempresa']);
  }

}
