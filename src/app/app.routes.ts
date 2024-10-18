import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RegistroComponent } from './registro/registro.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { PreguntaSeguridadComponent } from './pregunta-seguridad/pregunta-seguridad.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { RegistroEmpresaComponent } from './registro-empresa/registro-empresa.component';
import { ActualizarEmpresaComponent } from './actualizar-empresa/actualizar-empresa.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { RegistroSucursalComponent } from './registro-sucursal/registro-sucursal.component';
import { ActualizarSucursalComponent } from './actualizar-sucursal/actualizar-sucursal.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { GeneroComponent } from './genero/genero.component';
import { RegistroGeneroComponent } from './registro-genero/registro-genero.component';
import { EstadoCuentaComponent } from './estado-cuenta/estado-cuenta.component';
import { MovimientoCuentaComponent } from './movimiento-cuenta/movimiento-cuenta.component';
import { StatusCuentaComponent } from './status-cuenta/status-cuenta.component';
import { TablaStatusCuentaComponent } from './tabla-status-cuenta/tabla-status-cuenta.component';
import { ActualizarStatusCuentaComponent } from './actualizar-status-cuenta/actualizar-status-cuenta.component';
import { TablaTipoMovimientoCxcComponent } from './tabla-tipo-movimiento-cxc/tabla-tipo-movimiento-cxc.component';
import { TipoMovimientoCxcComponent } from './tipo-movimiento-cxc/tipo-movimiento-cxc.component';
import { ActualizarTipoMovimientoCxcComponent } from './actualizar-tipo-movimiento-cxc/actualizar-tipo-movimiento-cxc.component';
import { TablaSaldoCuentaComponent } from './tabla-saldo-cuenta/tabla-saldo-cuenta.component';
import { PersonaComponent } from './persona/persona.component';
import { RegistroPersonaComponent } from './registro-persona/registro-persona.component';
import { ActualizarPersonaComponent } from './actualizar-persona/actualizar-persona.component';
import { DocumentoPersonaComponent } from './documento-persona/documento-persona.component';
import { RegistroDocumentoComponent } from './registro-documento/registro-documento.component';
import { ActualizarDocumentoComponent } from './actualizar-documento/actualizar-documento.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';




export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'menu', component: MenuComponent},
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperarPassword', component: RecuperarPasswordComponent },
  { path: 'preguntaSeguridad', component: PreguntaSeguridadComponent },
  { path: 'empresa', component: EmpresaComponent },
  { path: 'registroempresa', component: RegistroEmpresaComponent },
  { path: 'actualizarempresa', component: ActualizarEmpresaComponent },
  { path: 'sucursal', component: SucursalComponent },
  { path: 'registrosucursal', component: RegistroSucursalComponent },
  { path: 'actualizarsucursal', component: ActualizarSucursalComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'genero', component: GeneroComponent },
  { path: 'registrogenero', component: RegistroGeneroComponent },
  { path: 'estadocuenta', component: EstadoCuentaComponent },
  { path: 'movcuenta', component: MovimientoCuentaComponent },
  { path: 'statuscuenta', component: StatusCuentaComponent },
  { path: 'tablastatuscuenta', component: TablaStatusCuentaComponent},
  { path: 'actualizarstatuscuenta', component: ActualizarStatusCuentaComponent},
  { path: 'tablatipomovimientocxc', component: TablaTipoMovimientoCxcComponent},
  { path: 'tipomovimientocxc', component: TipoMovimientoCxcComponent},
  { path: 'actualizartipomovimientocxc', component: ActualizarTipoMovimientoCxcComponent},
  { path: 'tablasaldocuenta', component: TablaSaldoCuentaComponent},
  { path: 'persona', component: PersonaComponent },
  { path: 'registropersona', component: RegistroPersonaComponent },
  { path: 'actualizarpersona', component: ActualizarPersonaComponent },
  { path: 'documentopersona', component: DocumentoPersonaComponent },
  { path: 'registrodocumento', component: RegistroDocumentoComponent },
  { path: 'actualizardocumento', component: ActualizarDocumentoComponent },
  { path: 'miperfil', component: MiPerfilComponent }
]

