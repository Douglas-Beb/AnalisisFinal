import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-actualizar-documento',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-documento.component.html',
  styleUrl: './actualizar-documento.component.css'
})
export class ActualizarDocumentoComponent {
  cargar:boolean = false;
  documento: any[] = [];


  nuevaDocumento: any = {};

  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    this.obtenerDocumento();



  }

  obtenerDocumento() {
    this.http.get<any[]>('http://localhost:8080/documentopersona/buscarconnombre').subscribe(
      (data) => {
        this.documento = data;
      },
      (error) => {
        console.error('Error al obtener documento', error);
      }
    );
 }






  agregar() {
    let formulario: any = document.getElementById('formulario');
    if (formulario.reportValidity()) {
      this.cargar = true;
      this.servicioGuardar().subscribe((response: any) => this.resultadoServicio(response));
    }
  }

  resultadoServicio(res: any) {
    this.cargar = false;
    alert("Documento actualizado exitosamente");
    location.href = "/documentopersona";
  }

  servicioGuardar() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    // Asegúrate de que idtipodocumento y idpersona estén definidos en nuevaDocumento
    return this.http.put<any>(
    'http://localhost:8080/documentopersona/actualizar/' + this.nuevaDocumento.IdTipoDocumento + '/' + this.nuevaDocumento.IdPersona,
      this.nuevaDocumento,
      httpOptions
    ).pipe(
      catchError((e) => {
        console.error('Error al actualizar el documento', e);
        this.cargar = false; // Asegúrate de ocultar la barra de carga en caso de error
        return 'error'; // Cambia esto según cómo quieras manejar el error
      })
    );
  }


}
