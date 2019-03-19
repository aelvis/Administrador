import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../../services/global';
import { UsuarioService } from '../../../services/usuario.service';
@Component({
	selector: 'reporte',
	templateUrl: 'reporte.component.html',
	styleUrls: ['reporte.component.css']
})
export class ReporteProductoComponent implements OnInit{
  	public identity;
  	public verify;
 	public codigo: string;
	public mensaje: string;
	public alerta: boolean;
	constructor(private _usuarioService: UsuarioService, private _router: Router){}
	ngOnInit(){
	}
}