import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from "../datos/cliente";
import { AutosService } from '../shared/autos.service';

@Component({
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{
  tituloPagina = "Registro del Cliente";
  quiereContacto: boolean = false;
  formularioCliente: FormGroup;
  
  listaClientes: any[] = [];

  wasValidated = false;
  
  constructor(private _router: Router, private _autosService: AutosService, private formBuilder: FormBuilder){
  }
  
  ngOnInit(): void {

    this.consultaCliente();

    this.formularioCliente = this.formBuilder.group({
      "nombre": [null, Validators.required],
      "apellido":[null, Validators.required],
      "email": [null],
      "telefono": [null]
    });
    
  }

  goInicio(): void{
    this._router.navigate(['/inicio'])

  }

  registra(): void{
    alert("En construcción")
    this._router.navigate(['/autos'])
  }

  consultaCliente(){
    this._autosService.getClientes().subscribe((respuesta) => {
      if(respuesta.codigo == 1){
        this.listaClientes = respuesta.data;
      }
    })
  }

  grabarCliente(){
    if(this.quiereContacto){
      this.formularioCliente = this.formBuilder.group({
        "nombre": [null, Validators.required],
        "apellido":[null, Validators.required],
        "email": [null, Validators.required],
        "telefono": [null, Validators.required]
      });
    }
    this.wasValidated = true;
      if(!this.formularioCliente.valid){
        console.log(this.formularioCliente)
        alert("Faltan campos");
        return;
      }
    let cliente:Cliente = {...this.formularioCliente.value};
    console.log(cliente);
    this._autosService.agregarCliente(cliente).subscribe((respuesta)=>{
      alert(respuesta.mensaje);
      console.log(respuesta);
      if(respuesta.codigo == 1){
        this.consultaCliente();
      }
    },
    (errorHttp:HttpErrorResponse) => {
      console.log(errorHttp.error);
      let mensaje = errorHttp.error.mensaje;
      mensaje += errorHttp.error.error?.nombre ? (' - ' + errorHttp.error.error?.nombre) : "";
      mensaje += errorHttp.error.error?.apellido ? (' - ' + errorHttp.error.error?.apellido) : "";
      mensaje += errorHttp.error.error?.email ? (' - ' + errorHttp.error.error?.email) : "";
      mensaje += errorHttp.error.error?.telefono ? (' - ' + errorHttp.error.error?.telefono) : "";
      alert(mensaje);
    }
    )
  }

}
