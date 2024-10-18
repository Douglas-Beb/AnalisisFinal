import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RegistroComponent } from './registro/registro.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { PreguntaSeguridadComponent } from './pregunta-seguridad/pregunta-seguridad.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'menu', component: MenuComponent},
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperarPassword', component: RecuperarPasswordComponent },
  { path: 'preguntaSeguridad', component: PreguntaSeguridadComponent }
]

