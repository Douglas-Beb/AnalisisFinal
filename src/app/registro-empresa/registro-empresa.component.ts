import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registro-empresa',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-empresa.component.html',
  styleUrl: './registro-empresa.component.css',
})
export class RegistroEmpresaComponent {

  cargar:boolean = false;
  empresa: any[] = [];
  nuevaEmpresa: any = {};

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
    alert("Empresa creada exitosamente")
    location.href = "/empresa";
  }

  servicioGuardar(){
    var httpOptions = {
      headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
    return this.http.post<any>("http://localhost:8080/empresa/guardar",this.nuevaEmpresa,httpOptions).pipe(
      catchError(e=>"error")
    )
  }

}
