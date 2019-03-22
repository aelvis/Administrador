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

import { AdminGuard } from './services/admin.guard';

const appRoutes: Routes = [
	{path: '', component: LoginComponent},
	{path: '', redirectTo: 'login', pathMatch: 'full'},
	{path: 'login', component: LoginComponent},
	{path: 'inicio', component: InicioComponent, canActivate: [AdminGuard]},
	{path: 'producto', component: ProductoComponent, canActivate: [AdminGuard]},
	{path: 'producto-editar/:id_producto', component: ProductoEditarComponent, canActivate: [AdminGuard]},
	{path: 'producto-reporte/:id_producto', component: ReporteProductoComponent, canActivate: [AdminGuard]},
	{path: 'venta', component: VentaComponent, canActivate: [AdminGuard]},
	{path: 'venta/:id_venta', component: VentaVerComponent, canActivate: [AdminGuard]},
	{path: '**', component: LoginComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { enableTracing: true, useHash:true });