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
	constructor(private toastr: ToastrService,private _usuarioService: UsuarioService, private _router: Router, private route:ActivatedRoute){
		this.route.params.forEach(x => this. id_producto = x['id_producto']);
		this.agregar_sucursal_botton = true;
		this.actualizar_producto = true;
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
	modalAgregarPrecio(id){
		$('#modalAgregarPrecio').modal('show')
	}
	editarSucursalProducto(stock,id){
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
}