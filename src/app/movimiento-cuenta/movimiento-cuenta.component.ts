import { Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-movimiento-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MenuComponent],
  templateUrl: './movimiento-cuenta.component.html',
  styleUrls: ['./movimiento-cuenta.component.css']
})
export class MovimientoCuentaComponent {
  saldoCuenta: any = {};
  saldoSeleccionado: any = {}; // Almacena el saldo de la persona seleccionada
  cuenta: any[] = []; // Almacena la lista de personas

  constructor(private http: HttpClient, private router: Router) {
    this.cargarPersona();
  }

  // Método para actualizar
  actualizar() {
    this.router.navigate(['/actualizarcuenta']);
  }

  // Método para cargar la lista de personas
  cargarPersona() {
    this.http.get<any[]>("http://localhost:8080/persona/buscar").subscribe(
      data => this.cuenta = data,
      error => console.error("Error al cargar de personas", error)
    );
  }

  // Método para cargar el saldo de la persona seleccionada
  cargarSaldoCuenta(idPersona: number) {
    this.http.get<any>(`http://localhost:8080/saldoCuenta/buscar/${idPersona}`).subscribe(
      data => this.saldoSeleccionado = data, // Almacena el saldo de la persona seleccionada
      error => console.error("Error al cargar el saldo de la persona", error)
    );
  }
}
