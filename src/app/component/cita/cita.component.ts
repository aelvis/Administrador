import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {
	public actualizar:boolean;
	public total;
	public ticket;
	public inicio:boolean;
  	constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router) {
  		this.actualizar = true
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
		this.inicio = false;
		this.actualizar = false;
		this._usuarioService.obtenerCitasReporteService().subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].cita){
						this.ticket = res["mensaje"].cita;
						this.total = res["mensaje"].total;
						this.actualizar = true;
						this.inicio = true;
					}else{
						this.ticket = "No hay productos...";
						this.actualizar = true;
						this.inicio = true;
					}
				}
			},
			error => {
				this.showSuccess("Alerta","Error de Internet");
				this.actualizar = true;
				this.inicio = true;
			}
		);
	}
	obtenerProductoConFecha(fecha){
		this.actualizar = false;
		this.ticket = [];
		this.total = [];
		this.inicio = false;
		this._usuarioService.obtenerCitasReporteConfechaService(fecha).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].cita){
						this.ticket = res["mensaje"].cita;
						this.total = res["mensaje"].total;
						this.actualizar = true;
						this.inicio = true;
					}else{
						this.ticket = "No hay productos...";
						this.actualizar = true;
						this.inicio = true;
					}
				}
			},
			error => {
				this.showSuccess("Alerta","Error de Internet");
				this.actualizar = true;
				this.inicio = true;
			}
		);
	}
}
