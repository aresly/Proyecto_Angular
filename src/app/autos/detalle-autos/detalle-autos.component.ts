import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AutosService } from "src/app/shared/autos.service";
import { Auto } from "../../datos/auto";
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detalle-autos',
  templateUrl: './detalle-autos.component.html',
  styleUrls: ['./detalle-autos.component.css']
})
export class DetalleAutosComponent implements OnInit{

  tituloPagina = "Detalle de autos";
  auto!: Auto;
  isEditable:boolean=false;
  codigoauto: string;
  formularioAuto: FormGroup;

  muestraImagen: boolean = false;
  anchoImagen = 300;
  margenImagen = 3;
  

  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private formBuilder: FormBuilder,
    private _autosService:AutosService){
    }

  ngOnInit(): void {
    
    // let id = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    // this.auto = this._autosService.obtenAuto(id);
    // this.tituloPagina += ": "+id;

    this._activatedRoute.params.subscribe((params:any) =>{
      this.codigoauto = params['id'];
      this.consultarAuto();
    });

    this.formularioAuto = this.formBuilder.group({
      "marca":[''],
      "modelo":[''],
      "anio":[''],
      "codigo":[''],
      "id":[''],
      "foto":[''],
      "calificacion":['']
    });
  }

  onBack(): void{
    this._router.navigate(['/autos']);
  }



  onClickCalificacion(mensaje: string): void{
    alert(" Dieron click en la calificacion: "+ mensaje);
  }

  consultarAuto(){
    this._autosService.getAuto(this.codigoauto).subscribe((respuesta)=>{
      if(respuesta.codigo == "1"){
        this.auto = respuesta.data;
        this.iniciarFormulario();
      }
    })
  }

  iniciarFormulario(){
    this.formularioAuto.controls['codigo'].setValue(this.auto.codigo);
    this.formularioAuto.controls['marca'].setValue(this.auto.marca);
    this.formularioAuto.controls['modelo'].setValue(this.auto.modelo);
    this.formularioAuto.controls['anio'].setValue(this.auto.anio);
    this.formularioAuto.controls['id'].setValue(this.auto.id);
    this.formularioAuto.controls['foto'].setValue(this.auto.foto);
    this.formularioAuto.controls['calificacion'].setValue(this.auto.calificacion);
  }

  editar(){
    this.isEditable = true;
  }

  cancelar(){
    this.isEditable = false;
    this.iniciarFormulario();
  }

  grabar(){
    let auto:Auto = {...this.formularioAuto.value};
    this._autosService.actualizarAuto(auto, this.auto.codigo).subscribe((respuesta)=>{
      if(respuesta.codigo == 1){
        this.isEditable = false;
        this.auto.marca = this.formularioAuto.controls['marca'].value;
        this.auto.codigo = this.formularioAuto.controls['codigo'].value;
        this.auto.modelo = this.formularioAuto.controls['modelo'].value;
        this.auto.anio = this.formularioAuto.controls['anio'].value;
        this.auto.foto = this.formularioAuto.controls['foto'].value;
        this.auto.calificacion = this.formularioAuto.controls['calificacion'].value;
        alert(respuesta.mensaje);
      }
    },
    (errorHttp:HttpErrorResponse) => {
      console.log(errorHttp.error);
      let mensaje = errorHttp.error.mensaje;
      mensaje += errorHttp.error.error?.codigo ? (' - ' + errorHttp.error.error?.codigo) : "";
      mensaje += errorHttp.error.error?.marca ? (' - ' + errorHttp.error.error?.marca) : "";
      mensaje += errorHttp.error.error?.modelo ? (' - ' + errorHttp.error.error?.modelo) : "";
      mensaje += errorHttp.error.error?.anio ? (' - ' + errorHttp.error.error?.anio) : "";
      alert(mensaje);
    });
  }
}
