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
	public agregar_sucursal_botton:boolean;
	public actualizar_producto:boolean;
	public estado_pro_sucu;
	public producto_sucursal_id;
	public sucursal_id;
	public productos_precio_su;
	public estado_pro_sucu_pre;
	public unidad_pro;
	public agregar_sucursal_precio_botton:boolean;
	public nombre_sucursal;
	public precio_sucursal_pro;
	public inicio:boolean;
	public alerta_productos;
	constructor(private toastr: ToastrService,private _usuarioService: UsuarioService, private _router: Router, private route:ActivatedRoute){
		this.route.params.forEach(x => this.id_producto = x['id_producto']);
		this.agregar_sucursal_botton = true;
		this.agregar_sucursal_precio_botton = true;
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
		this.inicio = false;
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
						this.inicio = true;
					}else{
						this.showError("Alerta","Error de Internet - volver a Intentarlo");
						this.inicio = false;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.inicio = false;
			}
		);
	}
	actualizarProducto(nombre,codigo,descripcion){
		this.actualizar_producto = false;
		this.inicio = false;
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
						this.showError("Alerta","Error de Internet - Volver a Intentarlo");
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
		this.inicio = false;
		this.agregar_sucursal_botton = false;
		if(stock.length > 0 && sucursal.length > 0){
			this._usuarioService.agregarSucursalesProductosEditar(stock,sucursal,this.id_producto).subscribe(
				res => {
					if(res["mensaje"].terminar){
					  	localStorage.clear();
					  	this._router.navigate(['/login']);
					}else{
						if(res["mensaje"].codigo == 'success'){
							this.showSuccess("Alerta","Agregar");
							this.obtenerProducto();
							this.nombre_sucursal = "";
							this.agregar_sucursal_botton = true;
							$('#sucursalesAgregar').modal('hide');
						}else{
							this.showError("Alerta","Error - Volver a Intentarlo");
							this.obtenerProducto();
							this.agregar_sucursal_botton = true;
							this.inicio = true;
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
			this.inicio = true;
		}
	}
	modalAgregarPrecio(producto_sucursal_id,sucursal_id){
		this.inicio = false;
		this.producto_sucursal_id = producto_sucursal_id;
		this.sucursal_id = sucursal_id;
		this._usuarioService.obtenerPreciosProductoSucursales(this.producto_sucursal_id).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].productospreciosu){
						this.productos_precio_su = res["mensaje"].productospreciosu;
						this.unidad_pro = res["mensaje"].unidad_pro;
						$('#modalAgregarPrecio').modal('show');
						this.inicio = true;
					}else{
						this.alerta_productos = "No hay Productos para mostrar";
						this.productos_precio_su = [];
						this.unidad_pro = res["mensaje"].unidad_pro;
						$('#modalAgregarPrecio').modal('show');
						this.inicio = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				$('#modalAgregarPrecio').modal('hide');
				this.inicio = true;
			}
		);
	}
	desactivarPrecioSucursal(id){
		this.inicio = false;
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
											this.inicio = true;
											this.productos_precio_su = res["mensaje"].productospreciosu;
										}else{
											this.showError("Alerta","No hay Precios de Productos");
											this.inicio = true;
										}
									}
								},
								error => {
									this.showError("Alerta","Error de Internet");
									this.inicio = true;
								}
							);
						this.estado_pro_sucu_pre = true;
					}else{
						this.showError("Alerta","Conexión Lenta, volver a Intentar");
						this.estado_pro_sucu_pre = true;
						this.inicio = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.estado_pro_sucu_pre = true;
				this.inicio = true;
			}
		);
	}
	activarPrecioSucursal(id){
		this.inicio = false;
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
											this.inicio = true;
											this.productos_precio_su = res["mensaje"].productospreciosu;
										}else{
											this.inicio = true;
											this.showError("Alerta","No hay Precios de Productos");
										}
									}
								},
								error => {
									this.inicio = true;
									this.showError("Alerta","Error de Internet");
								}
							);
						this.estado_pro_sucu_pre = true;
					}else{
						this.showError("Alerta","Conexión Lenta, volver a Intentar");
						this.estado_pro_sucu_pre = true;
						this.inicio = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.estado_pro_sucu_pre = true;
				this.inicio = true;
			}
		);
	}
	cerrarModalPrecio(){
		this.producto_sucursal_id = "";
		this.sucursal_id = "";
		this.productos_precio_su = [];
		this.unidad_pro = [];
		$('#modalAgregarPrecio').modal('hide');
	}
	editarSucursalProductoPrecio(stock,id){
		this.inicio = false;
		this._usuarioService.actualizarSucursalesProductosEditar(stock,id).subscribe(
			res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.showSuccess("Alerta","Actualizado");
						this.obtenerProducto();
						this.inicio = true;
					}else{
						this.showError("Alerta","Error de Internet");
						this.obtenerProducto();
						this.inicio = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.inicio = true;
			}
		);
	}
	editarSucursalProducto(precio,id){
		this.inicio = false;
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
											this.inicio = true;
											this.productos_precio_su = res["mensaje"].productospreciosu;
										}else{
											this.showError("Alerta","No hay Precios de Productos");
											this.inicio = true;
										}
									}
								},
								error => {
									this.showError("Alerta","Error de Internet");
									this.inicio = true;
								}
							);
					}else{
						this.showError("Alerta","Error de Internet - volver a Intentarlo");
						this.inicio = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.inicio = true;
			}
		);
	}
	desactivarStockSucursal(id){
		this.inicio = false;
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
						this.inicio = true;
					}else{
						this.showError("Alerta","Conexión Lenta, volver a Intentar");
						this.estado_pro_sucu = true;
						this.inicio = true;
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
		this.inicio = false;
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
						this.inicio = true;
					}else{
						this.showError("Alerta","Conexión Lenta, volver a Intentar");
						this.estado_pro_sucu = true;
						this.inicio = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.estado_pro_sucu = true;
				this.inicio = true;
			}
		);
	}
	agregarPrecioProductoSucursal(precio,unidad_agregar){
		this.inicio = false;
		this.agregar_sucursal_precio_botton = false;
		if(precio.length > 0 && unidad_agregar.length > 0){
			this._usuarioService.agregarSucursalesPrecioProductosEditar(this.producto_sucursal_id,unidad_agregar,precio,this.id_producto,this.sucursal_id).subscribe(
				res => {
					if(res["mensaje"].terminar){
					  	localStorage.clear();
					  	this._router.navigate(['/login']);
					}else{
						if(res["mensaje"].codigo == 'success'){
							this._usuarioService.obtenerPreciosProductoSucursales(this.producto_sucursal_id).subscribe(
								res => {
									if(res["mensaje"].terminar){
									  	localStorage.clear();
									  	this._router.navigate(['/login']);
									}else{
										if(res["mensaje"].productospreciosu){
											this.showSuccess("Alerta","Agregado");
											this.alerta_productos = "";
											this.productos_precio_su = res["mensaje"].productospreciosu;
											this.unidad_pro = res["mensaje"].unidad_pro;
											this.precio_sucursal_pro = "";
											this.agregar_sucursal_precio_botton = true;
											this.inicio = true;
										}else{
											this.showError("Alerta","No hay Precios de Productos");
											this.agregar_sucursal_precio_botton = true;
											this.inicio = true;
										}
									}
								},
								error => {
									this.showError("Alerta","Error de Internet");
									this.agregar_sucursal_precio_botton = true;
								}
							);
						}else{
							this.showError("Alerta","Error de Internet - Volver a intentarlo");
							this.agregar_sucursal_precio_botton = true;
							this.inicio = true;
						}
					}
				},
				error => {
					this.showError("Alerta","Error de Internet");
					this.agregar_sucursal_precio_botton = true;
					this.inicio = true;
				}
			);
		}else{
			this.showError("Alerta","Agregrar por favor campos");
			this.agregar_sucursal_precio_botton = true;
			this.inicio = true;
		}
	}
}