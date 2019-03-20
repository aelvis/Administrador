import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../../services/global';
import { UsuarioService } from '../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: 'producto-editar',
	templateUrl: 'producto-editar.component.html',
	styleUrls: ['producto-editar.component.css']
})
export class ProductoEditarComponent implements OnInit{
	public obtener_producto_editar;
	public id_producto;
	public sucursal;
	public obtener_producto_sucursal;
	public nombre_sucursal;
	public agregar_sucursal_botton:boolean;
	public actualizar_producto:boolean;
	public estado_pro_sucu;
	public producto_sucursal_id;
	public sucursal_id;
	public productos_precio_su;
	public estado_pro_sucu_pre;
	public unidad_pro;
	constructor(private toastr: ToastrService,private _usuarioService: UsuarioService, private _router: Router, private route:ActivatedRoute){
		this.route.params.forEach(x => this. id_producto = x['id_producto']);
		this.agregar_sucursal_botton = true;
		this.actualizar_producto = true;
		this.estado_pro_sucu = true;
		this.estado_pro_sucu_pre = true;
	}
	showSuccess(titulo,mensaje) {
    	this.toastr.success(mensaje, titulo);
  	}
  	showError(titulo,mensaje) {
    	this.toastr.error(mensaje, titulo);
  	}
	ngOnInit(){
		this.obtenerProducto();
	}
	obtenerProducto(){
		this._usuarioService.obtenerProductosEditar(this.id_producto).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].obtener_producto_editar){
						this.obtener_producto_editar = res["mensaje"].obtener_producto_editar;
						this.sucursal = res["mensaje"].sucursal;
						this.obtener_producto_sucursal = res["mensaje"].producto_sucursal;
					}else{
						this.showError("Alerta","Error de Internet");
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
			}
		);
	}
	actualizarProducto(nombre,codigo,descripcion){
		this.actualizar_producto = false;
		this._usuarioService.actualizarProductosEditar(this.id_producto,nombre,codigo,descripcion).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.showSuccess("Alerta","Actualizado");
						this.obtenerProducto();
						this.actualizar_producto = true;
					}else{
						this.showError("Alerta","Error de Internet");
						this.obtenerProducto();
						this.actualizar_producto = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.actualizar_producto = true;
			}
		);
	}
	agregarSucursal(stock,sucursal){
		this.agregar_sucursal_botton = false;
		if(stock.length > 0 && sucursal.length > 0){
			this._usuarioService.agregarSucursalesProductosEditar(stock,sucursal,this.id_producto).subscribe(
				res => {
					if(res["mensaje"].terminar){
					  	localStorage.clear();
					  	this._router.navigate(['/login']);
					}else{
						if(res["mensaje"].codigo == 'success'){
							$('#sucursalesAgregar').modal('hide')
							this.showSuccess("Alerta","Agregar");
							this.obtenerProducto();
							this.nombre_sucursal = "";
							this.agregar_sucursal_botton = true;
						}else{
							this.showError("Alerta","Error de Internet");
							this.obtenerProducto();
							this.agregar_sucursal_botton = true;
						}
					}
				},
				error => {
					this.showError("Alerta","Error de Internet");
					this.agregar_sucursal_botton = true;
				}
			);
		}else{
			this.showError("Alerta","Ingresar Datos");
			this.agregar_sucursal_botton = true;
		}
	}
	modalAgregarPrecio(producto_sucursal_id,sucursal_id){
		this.producto_sucursal_id = producto_sucursal_id;
		this.sucursal_id = sucursal_id;
		$('#modalAgregarPrecio').modal('show');
		this._usuarioService.obtenerPreciosProductoSucursales(this.producto_sucursal_id).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].productospreciosu){
						this.productos_precio_su = res["mensaje"].productospreciosu;
						this.unidad_pro = res["mensaje"].unidad_pro;
					}else{
						this.showError("Alerta","No hay Precios de Productos");
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
			}
		);
	}
	desactivarPrecioSucursal(id){
		this.estado_pro_sucu_pre = false;
		this._usuarioService.desactivarProductoSucursalEditarPrecio(id).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == "success"){
						this.showSuccess("Alerta","Se Actualizó Correctamente");
							this._usuarioService.obtenerPreciosProductoSucursales(this.producto_sucursal_id).subscribe(
								res => {
									if(res["mensaje"].terminar){
									  	localStorage.clear();
									  	this._router.navigate(['/login']);
									}else{
										if(res["mensaje"].productospreciosu){
											this.productos_precio_su = res["mensaje"].productospreciosu;
										}else{
											this.showError("Alerta","No hay Precios de Productos");
										}
									}
								},
								error => {
									this.showError("Alerta","Error de Internet");
								}
							);
						this.estado_pro_sucu_pre = true;
					}else{
						this.showError("Alerta","Conexión Lenta, volver a Intentar");
						this.estado_pro_sucu_pre = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.estado_pro_sucu_pre = true;
			}
		);
	}
	activarPrecioSucursal(id){
		this.estado_pro_sucu_pre = false;
		this._usuarioService.activarProductoSucursalEditarPrecio(id).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == "success"){
						this.showSuccess("Alerta","Se Actualizó Correctamente");
							this._usuarioService.obtenerPreciosProductoSucursales(this.producto_sucursal_id).subscribe(
								res => {
									if(res["mensaje"].terminar){
									  	localStorage.clear();
									  	this._router.navigate(['/login']);
									}else{
										if(res["mensaje"].productospreciosu){
											this.productos_precio_su = res["mensaje"].productospreciosu;
										}else{
											this.showError("Alerta","No hay Precios de Productos");
										}
									}
								},
								error => {
									this.showError("Alerta","Error de Internet");
								}
							);
						this.estado_pro_sucu_pre = true;
					}else{
						this.showError("Alerta","Conexión Lenta, volver a Intentar");
						this.estado_pro_sucu_pre = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.estado_pro_sucu_pre = true;
			}
		);
	}
	cerrarModalPrecio(){
		this.producto_sucursal_id = "";
		this.sucursal_id = "";
		$('#modalAgregarPrecio').modal('hide');
	}
	editarSucursalProductoPrecio(stock,id){
		this._usuarioService.actualizarSucursalesProductosEditar(stock,id).subscribe(
			res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.showSuccess("Alerta","Actualizado");
						this.obtenerProducto();
					}else{
						this.showError("Alerta","Error de Internet");
						this.obtenerProducto();
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
			}
		);
	}
	editarSucursalProducto(precio,id){
		this._usuarioService.actualizarProductoSucursalEditarPrecio(precio,id).subscribe(
			res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.showSuccess("Alerta","Actualizado");
							this._usuarioService.obtenerPreciosProductoSucursales(this.producto_sucursal_id).subscribe(
								res => {
									if(res["mensaje"].terminar){
									  	localStorage.clear();
									  	this._router.navigate(['/login']);
									}else{
										if(res["mensaje"].productospreciosu){
											this.productos_precio_su = res["mensaje"].productospreciosu;
										}else{
											this.showError("Alerta","No hay Precios de Productos");
										}
									}
								},
								error => {
									this.showError("Alerta","Error de Internet");
								}
							);
					}else{
						this.showError("Alerta","Error de Internet - volver a Intentarlo");
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
			}
		);
	}
	desactivarStockSucursal(id){
		this.estado_pro_sucu = false;
		this._usuarioService.desactivarProductoSucursalEditar(id).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == "success"){
						this.showSuccess("Alerta","Se Actualizó Correctamente");
						this.obtenerProducto();
						this.estado_pro_sucu = true;
					}else{
						this.showError("Alerta","Conexión Lenta, volver a Intentar");
						this.estado_pro_sucu = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.estado_pro_sucu = true;
			}
		);
	}
	activarStockSucursal(id){
		this.estado_pro_sucu = false;
		this._usuarioService.activarProductoSucursalEditar(id).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == "success"){
						this.showSuccess("Alerta","Se Actualizó Correctamente");
						this.obtenerProducto();
						this.estado_pro_sucu = true;
					}else{
						this.showError("Alerta","Conexión Lenta, volver a Intentar");
						this.estado_pro_sucu = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.estado_pro_sucu = true;
			}
		);
	}
}