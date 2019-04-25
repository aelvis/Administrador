import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nota-credito-factura',
  templateUrl: './nota-credito-factura.component.html',
  styleUrls: ['./nota-credito-factura.component.css']
})
export class NotaCreditoFacturaComponent implements OnInit {
	public inicio:boolean;
	public lista;
  	constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router) {
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
		this.inicio = false;
		this._usuarioService.enviarFechaObtenerTicketFactura().subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].lista){
						this.lista = res["mensaje"].lista;
						this.inicio = true;
					}else{
						this.lista = "No hay productos...";
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
		this.lista = [];
		this.inicio = false;
		this._usuarioService.enviarFechaObtenerTicketConfechaNotaFactura(fecha).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].lista){
						this.lista = res["mensaje"].ticket;
						this.inicio = true;
					}else{
						this.lista = "No hay productos...";
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

}
