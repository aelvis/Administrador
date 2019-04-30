import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-melvin',
  templateUrl: './melvin.component.html',
  styleUrls: ['./melvin.component.css']
})
export class MelvinComponent implements OnInit {
	public titulo;
	public datos:boolean;
  	constructor() { 
  	   this.titulo = "BIENVENIDO";
  	   this.datos = false;
  	}

  	ngOnInit() {
 	}
 	activar(){
 		this.datos = true;
 	}
 	desactivar(){
 		this.datos = false;
 	}
}
