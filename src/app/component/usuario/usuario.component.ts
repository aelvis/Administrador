import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
 

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
	public email;
	public password;
	public rol;
	public sucursal;
	public usuario:any = [];
	public inicio:boolean;
	public sucursal_for;
	public rol_for;
	constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router){
  		this.inicio = true;
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
		//this.inicio = false;
		this._usuarioService.obtenerUsuarios().subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].usuario){
						this.usuario = res["mensaje"].usuario;
						this.sucursal_for = res["mensaje"].sucursal;
						this.rol_for = res["mensaje"].rol;
						this.inicio = true;
					}else{
						this.usuario = "No hay Usuarios...";
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
	actualizar(id,correo,password){
		this.inicio = false;
		this._usuarioService.actualizarUsuarios(id,correo,password).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.showSuccess("Alerta","Actualizado Correctamente");
						this.obtenerProducto();
					}else{
						this.showError("Alerta","Volver a Intentarlo");
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
	actualizarOtro(id,otro){
		this.inicio = false;
		this._usuarioService.actualizarUsuariosOtros(id,otro).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.showSuccess("Alerta","Actualizado Correctamente");
						this.obtenerProducto();
					}else{
						this.showError("Alerta","Volver a Intentarlo");
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
	agregarUsuario(){
		this.inicio = false;
		this._usuarioService.agregarUsuarios(this.email,this.password,this.rol,this.sucursal).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.email = "";
						this.password = "";
						this.rol = "";
						this.sucursal = "";
						this.showSuccess("Alerta","Guardado Correctamente");
						this.obtenerProducto();
					}else{
						this.showError("Alerta","Volver a Intentarlo");
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
