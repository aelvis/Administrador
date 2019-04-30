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
import { CitaComponent } from './component/cita/cita.component';
import { ProductoServicioComponent } from './component/producto-servicio/producto-servicio.component';
import { UnidadComponent } from './component/unidad/unidad.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { NotaCreditoFacturaComponent } from './component/nota-credito-factura/nota-credito-factura.component';
import { NotaCreditoBoletaComponent } from './component/nota-credito-boleta/nota-credito-boleta.component';
import { MelvinComponent } from './component/melvin/melvin.component';
import { PruebaComponent } from './component/prueba/prueba.component';

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
	VentaVerComponent,
	CitaComponent,
	ProductoServicioComponent,
	UnidadComponent,
	UsuarioComponent,
	NotaCreditoFacturaComponent,
	NotaCreditoBoletaComponent,
	MelvinComponent,
	PruebaComponent
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
