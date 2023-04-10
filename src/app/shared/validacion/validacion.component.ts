import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl} from '@angular/forms';

@Component({
  selector: 'validacion',
  templateUrl: './validacion.component.html',
  styleUrls: ['./validacion.component.css']
})
export class ValidacionComponent implements OnInit {
  constructor(){}

  @Input() control: AbstractControl;
  @Input() summited:boolean = false;

  ngOnInit(){

  }

  mostrarError(){
    if(!this.control){
      return false;
    }
    return this.control.invalid && this.summited;
  }
}
