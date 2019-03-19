import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../../services/global';
import { UsuarioService } from '../../../services/usuario.service';
import { Producto } from '../../../models/producto';
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
	public agregarPro: Producto;
	constructor(private _usuarioService: UsuarioService, private _router: Router){
		this.agregarPro = new Producto('','');
	}
	ngOnInit(){
		this.obtenerProducto();
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
				var errorMensaje = <any>error;
				if(errorMensaje != null){
					var body = JSON.parse(error._body);
					this.codigo = body.respuesta.codigo;
					this.mensaje = body.respuesta.msg;
				}
			}
		);
	}
	registrarProducto(){
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
				var errorMensaje = <any>error;
				if(errorMensaje != null){
					var body = JSON.parse(error._body);
					this.codigo = body.respuesta.codigo;
					this.mensaje = body.respuesta.msg;
				}
			}
		);
	}
}