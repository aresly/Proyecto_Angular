import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { ListaAutosComponent } from './autos/lista-autos/lista-autos.component';
import { AEspacioPipe } from './shared/a-espacio.pipe';
import { EstrellasComponent } from './shared/estrellas/estrellas.component';
import { DetalleAutosComponent } from './autos/detalle-autos/detalle-autos.component';
import { InicioComponent } from './autos/inicio/inicio.component';
import { RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserInterceptor } from './interceptores/userInterceptor';
import { PaginacionComponent } from './shared/paginacion/paginacion.component';
import { ValidacionComponent } from './shared/validacion/validacion.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaAutosComponent,
    AEspacioPipe,
    EstrellasComponent,
    DetalleAutosComponent,
    InicioComponent,
    ClientesComponent,
    PaginacionComponent,
    ValidacionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: "autos", component: ListaAutosComponent},
      {path: "autos/:id", component: DetalleAutosComponent},
      {path: "inicio", component: InicioComponent },
      {path: "clientes", component: ClientesComponent},
      {path: "", redirectTo: "inicio", pathMatch: "full"},
      {path: "**", redirectTo: "inicio", pathMatch: "full"}
    ])
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
