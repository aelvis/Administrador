import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
	public actualizar:boolean;
	public ticket:any = [];
	public total;
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
		this.actualizar = false;
		this._usuarioService.enviarFechaObtenerTicket().subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].ticket){
						this.ticket = res["mensaje"].ticket;
						this.total = res["mensaje"].total;
						this.actualizar = true;
					}else{
						this.ticket = "No hay productos...";
						this.actualizar = true;
					}
				}
			},
			error => {
				this.showSuccess("Alerta","Error de Internet");
				this.actualizar = true;
			}
		);
	}
}
