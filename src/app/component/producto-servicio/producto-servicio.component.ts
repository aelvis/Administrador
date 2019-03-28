import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-producto-servicio',
  templateUrl: './producto-servicio.component.html',
  styleUrls: ['./producto-servicio.component.css']
})
export class ProductoServicioComponent implements OnInit {
	public inicio:boolean;
	public inicio_modal:boolean;
	public total;
	public ticket;
	public pedido;
  	constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router) {
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
		this._usuarioService.obtenerCitasCajaReporteService().subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].caja){
						this.ticket = res["mensaje"].caja;
						this.total = res["mensaje"].total;
						this.inicio = true;
					}else{
						this.ticket = "No hay productos...";
						this.inicio = true;
					}
				}
			},
			error => {
				this.showSuccess("Alerta","Error de Internet");
				this.inicio = true;
			}
		);
	}
	obtenerProductoConFecha(fecha){
		this.inicio = false;
		this.ticket = [];
		this.total = [];
		this._usuarioService.obtenerCitasCajaReporteConfechaService(fecha).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].caja){
						this.ticket = res["mensaje"].caja;
						this.total = res["mensaje"].total;
						this.inicio = true;
					}else{
						this.ticket = "No hay productos...";
						this.inicio = true;
					}
				}
			},
			error => {
				this.showSuccess("Alerta","Error de Internet");
				this.inicio = true;
			}
		);
	}
	abrirModal(id){
		this.inicio_modal = false;
		$('#exampleModal').modal('show');
		this._usuarioService.obtenerPedidoCajaModalService(id).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].caja){
						this.pedido = res["mensaje"].caja;
						this.inicio_modal = true;
					}else{
						this.pedido = "No hay productos...";
						this.inicio_modal = true;
					}
				}
			},
			error => {
				this.showSuccess("Alerta","Error de Internet");
				this.inicio_modal = true;
			}
		);
	}
	cerrarModal(){
		this.pedido = [];
		$('#exampleModal').modal('hide');
	}
}
