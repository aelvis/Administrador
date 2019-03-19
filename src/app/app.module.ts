import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { UsuarioService } from './services/usuario.service';
import { InicioComponent} from './component/inicio/inicio.component';
import { NavAdminComponent} from './component/partial/partial.component';
import { ProductoComponent } from './component/producto/producto/producto.component';
import { ProductoEditarComponent } from './component/producto/producto-editar/producto-editar.component';
import { ReporteProductoComponent } from './component/producto/reporte/reporte.component';

import { AdminGuard } from './services/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    NavAdminComponent,
    ProductoComponent,
	ProductoEditarComponent,
	ReporteProductoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
	  HttpClientModule,
	  routing
  ],
  providers: [
    appRoutingProviders,
  	UsuarioService,
  	AdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
