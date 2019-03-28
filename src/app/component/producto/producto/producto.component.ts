import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../../services/global';
import { UsuarioService } from '../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: 'producto',
	templateUrl: 'producto.component.html',
	styleUrls: ['producto.component.css']
})
export class ProductoComponent implements OnInit{
 	public codigo: string;
	public producto;
	public estado:boolean;
	public buscar_nombre:boolean;
	public buscar_codigo:boolean;
	public actualizar:boolean;
	public num1:string;
	public num2:string;
	public inicio:boolean;
	public registrar:boolean;
	public nombre;
	public descripcion;
	constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router){
		this.estado = true;
		this.buscar_nombre = true;
		this.buscar_codigo = true;
		this.actualizar = true;
		this.num1 = this.aleatorio(30);
		this.num2 = this.aleatorio(30);
		this.inicio = false;
		this.registrar = true;
	}
	ngOnInit(){
		this.obtenerProducto();
	}
	showSuccess(titulo,mensaje) {
    	this.toastr.success(mensaje, titulo);
  	}
  	showError(titulo,mensaje) {
    	this.toastr.error(mensaje, titulo);
  	}
	obtenerProducto(){
		this.actualizar = false;
		this._usuarioService.obtenerProducto().subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].productos){
						this.producto = res["mensaje"].productos;
						this.actualizar = true;
						this.inicio = true;
					}else{
						this.producto = "No hay productos...";
						this.actualizar = true;
						this.inicio = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.actualizar = true;
				this.inicio = false;
			}
		);
	}
	registrarProducto(){

		if(this.nombre == undefined){
			this.showError("Alerta","Ingresar el Nombre del Producto");
			return;
		}else{
			this.registrar = false;
			this._usuarioService.registrarProducto(this.nombre,this.descripcion).subscribe(
				res => {
					if(res["mensaje"].terminar){
					  	localStorage.clear();
					  	this._router.navigate(['/login']);
					}else{
						if(res["mensaje"].codigo == "success"){
							this.registrar = true;
							this.showSuccess("Alerta","Se Agregó Correctamente");
							this.obtenerProducto();
							this.nombre = "";
							this.descripcion = "";
						}else{
							this.showError("Alerta","Conexión Lenta, volver a Intentar");
							this.registrar = true;
						}	
					}
				},
				error => {
					this.showError("Alerta","Error de Internet");
					this.registrar = true;
				}
			);
		}
	}
	desactivar(id){
		this.inicio = false;
		this.estado = false;
		this._usuarioService.desactivarProducto(id).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == "success"){
						this.showSuccess("Alerta","Se Actualizó Correctamente");
						this.obtenerProducto();
						this.estado = true;
						this.inicio = true;
					}else{
						this.showError("Alerta","Conexión Lenta, volver a Intentar");
						this.estado = true;
						this.inicio = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.estado = true;
				this.inicio = true;
			}
		);
	}
	activar(id){
		this.inicio = false;
		this.estado = false;
		this._usuarioService.activarProducto(id).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == "success"){
						this.showSuccess("Alerta","Se Actualizó Correctamente");
						this.obtenerProducto();
						this.estado = true;
						this.inicio = true;
					}else{
						this.showError("Alerta","Conexión Lenta, volver a Intentar");
						this.estado = true;
						this.inicio = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.estado = true;
				this.inicio = true;
			}
		);
	}
	buscarNombre(nombre){
		this.inicio = false;
		this.buscar_nombre = false;
		this._usuarioService.buscarProductoNombre(nombre).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].buscados){
						this.producto = res["mensaje"].buscados;
						this.buscar_nombre = true;
						this.inicio = true;
					}else{
						this.showError("Alerta","No se encontró Productos");
						this.buscar_nombre = true;
						this.inicio = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.buscar_nombre = true;
				this.inicio = true;
			}
		);
	}
	buscarCodigo(codigo){
		this.inicio = false;
		this.buscar_codigo = false;
		this._usuarioService.buscarProductoCodigo(codigo).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].buscados){
						this.producto = res["mensaje"].buscados;
						this.buscar_codigo = true;
						this.inicio = true;
					}else{
						this.showError("Alerta","No se encontró Productos");
						this.buscar_codigo = true;
						this.inicio = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.buscar_codigo = true;
				this.inicio = true;
			}
		);
	}
	aleatorio(numero) { 
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";  
		var randomstring = ''; 
		for (var i=0; i<numero; i++) { 
			var rnum = Math.floor(Math.random() * chars.length); 
			randomstring += chars.substring(rnum,rnum+1); 
		} 
		return randomstring; 
	}
}