import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registro-genero',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-genero.component.html',
  styleUrl: './registro-genero.component.css',
})
export class RegistroGeneroComponent {

  cargar:boolean = false;
  genero: any[] = [];
  nuevoGenero: any = {};

  constructor(private http: HttpClient) {

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
    alert("Genero creada exitosamente")
    location.href = "/genero";
  }

  servicioGuardar(){
    var httpOptions = {
      headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
    return this.http.post<any>("http://localhost:8080/genero/guardar",this.nuevoGenero,httpOptions).pipe(
      catchError(e=>"error")
    )
  }

}
