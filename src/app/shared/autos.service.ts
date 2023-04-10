import { Injectable } from "@angular/core";
import { Auto } from "../datos/auto";
import { Cliente } from "../datos/cliente";
import { HttpClient, HttpParams } from "@angular/common/http";



@Injectable({
    providedIn: "root"
})



export class AutosService{

    constructor(private http: HttpClient){
        
    }
    baseUrl = "https://www.epico.gob.ec/vehiculo/public/api/";

    listaAutos: any[] = [];

    

    getAutos(filtro?:string, rows?:number, page?:number){
        let body = new HttpParams();
        body = filtro ? body.set('filtro',filtro) : body;
        body = rows ? body.set('rows',rows) : body;
        body = page ? body.set('page',page) : body;
        return this.http.get<any>(this.baseUrl+"vehiculos/", {params:body});
    }

    getAuto(codigo:string){
        return this.http.get<any>(this.baseUrl+"vehiculo/"+codigo);
    }

    

    eliminarAuto(codigo:string){
        return this.http.delete<any>(this.baseUrl+'vehiculo/'+codigo);

    }

    agregarAuto(auto:Auto){
        let body = this.parametros(auto);
        return this.http.post<any>(this.baseUrl+'vehiculo/', body);
    }

    actualizarAuto(auto:Auto, codigo:string){
        let body = this.parametros(auto);
        return this.http.put<any>(this.baseUrl+'vehiculo/' + codigo, body);
    }

    parametros(auto:Auto){
        let body = new HttpParams();
        body = auto.codigo ? body.set('codigo',auto.codigo) : body;
        body = auto.marca ? body.set('marca',auto.marca) : body;
        body = auto.modelo ? body.set('modelo',auto.modelo) : body;
        body = auto.anio ? body.set('anio',auto.anio) : body;
        body = auto.calificacion ? body.set('calificacion',auto.calificacion) : body;
        body = auto.foto ? body.set('foto',auto.foto) : body;
        return body;

    }

    getClientes(){
        return this.http.get<any>(this.baseUrl+"clientes/");
    }

    agregarCliente(cliente:Cliente){
        let body = this.parametrosCliente(cliente);
        return this.http.post<any>(this.baseUrl+'cliente/', body);
    }

    parametrosCliente(cliente:Cliente){
        let body = new HttpParams();
        body = cliente.nombre ? body.set('nombre',cliente.nombre) : body;
        body = cliente.apellido ? body.set('apellido',cliente.apellido) : body;
        body = cliente.email ? body.set('email',cliente.email) : body;
        body = cliente.telefono ? body.set('telefono',cliente.telefono) : body;
        return body;
    }



  
}