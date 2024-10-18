import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';


@Component({
  selector: 'app-genero',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent {
  
  genero: any[] = [];
  cargar: boolean = false;


  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.buscarGenero();
  }

  buscarGenero() {
    this.cargar = true;
    this.buscarGeneroServicio().subscribe(
      (response: any) => this.mostrarGenero(response)
    );
  }

  mostrarGenero(response: any) {
    this.cargar = false;
    this.genero = response;
  }

  buscarGeneroServicio(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/genero/buscar").pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

  eliminar(idgenero: any) {
    this.cargar = true;
    this.eliminarGeneroServicio(idgenero).subscribe(
      (response: any) => {
        // Mostrar el cuadro de diálogo
        alert('Genero eliminado exitosamente.');
        // Actualizar la lista de empresas
        this.buscarGenero();
      },
      (error: any) => {
        console.error('Error al eliminar la empresa:', error);
        this.cargar = false; // Ocultar la barra de progreso si hay un error
      }
    );
  }
  

  eliminarGeneroServicio(id: any): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/genero/eliminar/${id}`).pipe(
      catchError(e => {
        console.error(e);
        return throwError(e);
      })
    );
  }

  actualizar(){
    this.router.navigate(['/actualizargenero']);
  }

}
