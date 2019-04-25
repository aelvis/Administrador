import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.css']
})
export class UnidadComponent implements OnInit {
	public inicio:boolean;
	public obtener_unidades;
	public nombre;
	public descripcion;
	public representacion;
	constructor(private toastr: ToastrService,private _usuarioService: UsuarioService, private _router: Router, private route:ActivatedRoute){
		this.inicio=true;
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
		this._usuarioService.obtenerUnidades().subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].unidad){
						this.obtener_unidades = res["mensaje"].unidad;
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
	editar(id,nombre,descripcion,representacion){
		this.inicio = false;
		this._usuarioService.actualizaUnidades(id,nombre,descripcion,representacion).subscribe(
			res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.showSuccess("Alerta","Actualizado");
						this.obtenerProducto();	
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
	agregarUnidadesIndex(){
		this.inicio = false;
		this._usuarioService.agregarUniDades(this.nombre,this.descripcion,this.representacion).subscribe(
			res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.showSuccess("Alerta","Actualizado");
						this.obtenerProducto();	
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
	eliminar(id){
		this.inicio = false;
		this._usuarioService.eliminarUnidades(id).subscribe(
			res => {
				if(res["mensaje"].terminar){
					localStorage.clear();
					this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.showSuccess("Alerta","Eliminado");
						this.obtenerProducto();	
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
}
