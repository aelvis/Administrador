import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsuarioService } from './usuario.service';


@Injectable()
export class VerificarGuard implements CanActivate{
	constructor(private _usuarioService: UsuarioService, private _router: Router){

	}
	canActivate(){
		let identity = this._usuarioService.getToken();
		let verify = this._usuarioService.getToken();
		if(identity && verify){
			return true;
		}else{
			this._router.navigate(['/login']);
			return false;
		}
	}
}