import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registro-sucursal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-sucursal.component.html',
  styleUrl: './registro-sucursal.component.css',
})
export class RegistroSucursalComponent {

  cargar:boolean = false;
  sucursal: any[] = [];
  nuevaSucursal: any = {};
  empresa: any[] = [];

  constructor(private http: HttpClient) {
    this.cargarEmpresas();
  }

  cargarEmpresas() {
    this.http.get<any[]>("http://localhost:8080/empresa/listar").subscribe(
      data => this.empresa = data,
      error => console.error("Error al cargar las empresas", error)
    );
  }

  agregar(){
    let formulario:any = document.getElementById("formulario");
    if(formulario.reportValidity()){
      this.cargar=true;
      this.servicioGuardar().subscribe(
        (response:any) => this.resultadoServicio(response)
      )
    }
  }

  resultadoServicio(res:any){
    this.cargar=false;
    alert("Sucursal creada exitosamente")
    location.href = "/sucursal";
  }

  servicioGuardar(){
    var httpOptions = {
      headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
    return this.http.post<any>("http://localhost:8080/sucursal/guardar",this.nuevaSucursal,httpOptions).pipe(
      catchError(e=>"error")
    )
  }

}
