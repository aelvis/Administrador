import { Component, OnInit } from '@angular/core';
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
	public unidad_producto;
	public unidades_pro;
	public obtener_producto_editar;
	public id_producto;
	public sucursal;
	public obtener_producto_sucursal;
	constructor(private toastr: ToastrService,private _usuarioService: UsuarioService, private _router: Router, private route:ActivatedRoute){
		this.route.params.forEach(x => this. id_producto = x['id_producto']);
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
						/*this.unidad_producto = res["mensaje"].unidad_producto;
						this.unidades_pro = res["mensaje"].unidades_pro;*/
						this.obtener_producto_editar = res["mensaje"].obtener_producto_editar;
						this.sucursal = res["mensaje"].sucursal;
						this.obtener_producto_sucursal = res["mensaje"].obtener_producto_sucursal;
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
		this._usuarioService.actualizarProductosEditar(this.id_producto,nombre,codigo,descripcion).subscribe(
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