import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { UsuarioService } from './services/usuario.service';
import { InicioComponent} from './component/inicio/inicio.component';
import { NavAdminComponent} from './component/partial/partial.component';
import { ProductoComponent } from './component/producto/producto/producto.component';
import { ProductoEditarComponent } from './component/producto/producto-editar/producto-editar.component';
import { ReporteProductoComponent } from './component/producto/reporte/reporte.component';

import { AdminGuard } from './services/admin.guard';
import { VentaComponent } from './component/venta/venta.component';
import { VentaVerComponent } from './component/venta-ver/venta-ver.component';

@NgModule({
  declarations: [
  AppComponent,
  LoginComponent,
  InicioComponent,
  NavAdminComponent,
  ProductoComponent,
	ProductoEditarComponent,
	ReporteProductoComponent,
	VentaComponent,
	VentaVerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
	HttpClientModule,
	routing,
	CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    appRoutingProviders,
  	UsuarioService,
  	AdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
