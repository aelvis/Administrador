import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Admin
import { InicioComponent} from './component/inicio/inicio.component';
import { LoginComponent} from './component/login/login.component';
import { ProductoComponent } from './component/producto/producto/producto.component';
import { ProductoEditarComponent } from './component/producto/producto-editar/producto-editar.component';
import { ReporteProductoComponent } from './component/producto/reporte/reporte.component';
import { VentaComponent } from './component/venta/venta.component';
import { VentaVerComponent } from './component/venta-ver/venta-ver.component';
import { CitaComponent } from './component/cita/cita.component';
import { ProductoServicioComponent } from './component/producto-servicio/producto-servicio.component';
import { UnidadComponent } from './component/unidad/unidad.component';
import { AdminGuard } from './services/admin.guard';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { NotaCreditoFacturaComponent } from './component/nota-credito-factura/nota-credito-factura.component';
import { NotaCreditoBoletaComponent } from './component/nota-credito-boleta/nota-credito-boleta.component';
import { MelvinComponent } from './component/melvin/melvin.component';
const appRoutes: Routes = [
	{path: '', component: LoginComponent},
	{path: '', redirectTo: 'login', pathMatch: 'full'},
	{path: 'login', component: LoginComponent},
	{path: 'melvin', component: MelvinComponent},
	{path: 'inicio', component: InicioComponent, canActivate: [AdminGuard]},
	{path: 'producto', component: ProductoComponent, canActivate: [AdminGuard]},
	{path: 'nota-credito-factura', component: NotaCreditoFacturaComponent, canActivate: [AdminGuard]},
	{path: 'nota-credito-boleta', component: NotaCreditoBoletaComponent, canActivate: [AdminGuard]},
	{path: 'usuario', component: UsuarioComponent, canActivate: [AdminGuard]},
	{path: 'unidad', component: UnidadComponent, canActivate: [AdminGuard]},
	{path: 'producto-editar/:id_producto', component: ProductoEditarComponent, canActivate: [AdminGuard]},
	{path: 'producto-reporte/:id_producto', component: ReporteProductoComponent, canActivate: [AdminGuard]},
	{path: 'venta', component: VentaComponent, canActivate: [AdminGuard]},
	{path: 'venta/:id_venta', component: VentaVerComponent, canActivate: [AdminGuard]},
	{path: 'cita', component: CitaComponent, canActivate: [AdminGuard]},
	{path: 'producto-servicio', component: ProductoServicioComponent, canActivate: [AdminGuard]},
	{path: '**', component: LoginComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { enableTracing: false, useHash:true });