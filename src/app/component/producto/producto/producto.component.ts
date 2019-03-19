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
	public mensaje: string;
	public alerta: boolean;
	public producto;
	constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router){
	}
	ngOnInit(){
		this.obtenerProducto();
	}
	showSuccess(titulo,mensaje) {
    	this.toastr.success(titulo, mensaje);
  	}
  	showError(titulo,mensaje) {
    	this.toastr.error(titulo, mensaje);
  	}
	obtenerProducto(){
		this._usuarioService.obtenerProducto().subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].productos){
						this.producto = res["mensaje"].productos;
					}else{
						this.producto = "No hay productos...";
					}
				}
			},
			error => {
				this.showSuccess("Alerta","Error de Internet");
			}
		);
	}
	registrarProducto(nombre,descripcion){
		this._usuarioService.registrarProducto(nombre,descripcion).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == "success"){
						this.showSuccess("Alerta","Se Agregó Correctamente");
						this.obtenerProducto();
					}else{
						this.showSuccess("Alerta","Se Agregó Correctamente");
					}
					
				}
			},
			error => {
				this.showSuccess("Alerta","Error de Internet");
			}
		);
	}
	guardarProducto(nombre){
		console.log(nombre.length);
		this.showSuccess("Titulo",nombre);
	}
	desactivar(id){
		this._usuarioService.desactivarProducto(id).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					this.showSuccess("Alerta","Se Agregó Correctamente");
					this.obtenerProducto();
				}
			},
			error => {
				this.showSuccess("Alerta","Error de Internet");
			}
		);
	}
	activar(id){
		this._usuarioService.activarProducto(id).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					this.showSuccess("Alerta","Se Agregó Correctamente");
					this.obtenerProducto();
				}
			},
			error => {
				this.showSuccess("Alerta","Error de Internet");
			}
		);
	}
}