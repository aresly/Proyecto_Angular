import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { AutosService } from "src/app/shared/autos.service";
import { Auto } from "../../datos/auto";



@Component({
    selector: "lista-autos",
    templateUrl: "./lista-autos.component.html",
    styleUrls: ["./lista-autos.component.css"]
})

export class ListaAutosComponent implements OnInit {

  constructor(private _autosService: AutosService, private formBuilder: FormBuilder){}

    tituloListaAutos: string = "Lista de Automóviles";

    faStar = faStar;
    starsList = [];


    listaAutos: any[] = [];
 
    muestraImagen: boolean = false;
    anchoImagen = 120;
    margenImagen = 3;

    filtrarPor:string = "";
    rows:number = 5;
    pages:number;
    page:number = 1;

    formularioAuto: FormGroup;

    wasValidated = false;

    onClickCalificacion(mensaje: string): void{
      alert(" Dieron click en la calificacion: "+ mensaje);
    }

    ngOnInit(){
        
        this.consultaAuto();
        this.formularioAuto = this.formBuilder.group({
          "marca": [null, Validators.required],
          "modelo":[null, Validators.required],
          "codigo": [null, Validators.compose([Validators.required, Validators.minLength(3)])],
          "anio": [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]*$')])],
          "calificacion": [null, Validators.compose([Validators.required, Validators.maxLength(1),  Validators.max(5), Validators.min(1), Validators.pattern('^[0-9]*$')])],
          "foto": [null]
        });
    }

    toggleImage(): void {
        this.muestraImagen = !this.muestraImagen;
    }

    consultaAuto(){
      this._autosService.getAutos(this.filtrarPor, this.rows, this.page).subscribe((respuesta) => {
        if(respuesta.codigo == 1){
          this.listaAutos = respuesta.data;
          this.rows = respuesta.rows;
          this.pages= respuesta.pages;
        }
      })
    }

    getListaAutos(){
      return this.listaAutos;
    }

    grabarAuto(){
      this.wasValidated = true;
      if(!this.formularioAuto.valid){
        console.log(this.formularioAuto)
        alert("Faltan campos");
        return;
      }
      let vehiculo:Auto = {...this.formularioAuto.value};
      this._autosService.agregarAuto(vehiculo).subscribe((respuesta)=>{
        alert(respuesta.mensaje);
        if(respuesta.codigo == 1){
          this.inicializarFormulario();
          this.consultaAuto();
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

    eliminarAuto(auto:any){
      this._autosService.eliminarAuto(auto.id).subscribe((respuesta)=>{
        if(respuesta.codigo == 1){
          alert(respuesta.mensaje);
          this.consultaAuto();
        }
      })

    }

    seleccionarPagina(page:number){
      this.page = page;
      this.consultaAuto();
    }
  
    cambioRows(){
      this.page = 1;
      this.consultaAuto();
    }

    inicializarFormulario(){
      this.formularioAuto.controls['marca'].setValue(null);
      this.formularioAuto.controls['modelo'].setValue(null);
      this.formularioAuto.controls['codigo'].setValue(null);
      this.formularioAuto.controls['anio'].setValue(null);
      this.formularioAuto.controls['calificacion'].setValue(null);
      this.formularioAuto.controls['foto'].setValue(null);
      this.wasValidated = false;

    }

}
