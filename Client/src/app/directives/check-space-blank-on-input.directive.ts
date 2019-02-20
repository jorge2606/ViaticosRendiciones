import { Directive, ElementRef, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appCheckSpaceBlankOnInput]'
})
export class CheckSpaceBlankOnInputDirective {

  @Output() msgEvent : EventEmitter<any> = new EventEmitter();

  namesInSpanish : any = {'name' : 'Nombre', 'description' : 'Descripción', 'advance' : 'Anticipo'};
  constructor(
      private el : ElementRef
  ) {
    }

  sendMessage(msj : any){
    this.msgEvent.emit(msj);
  }

  
  @HostListener('keyup') validSpaceBlank(){
    if (this.el.nativeElement.value.toString().length > 0){
      if (this.el.nativeElement.value.toString().trimLeft().length == 0){
        this.sendMessage('El campo '+this.namesInSpanish[this.el.nativeElement.name]+' no deberia estar vacio');
        this.el.nativeElement.className="form-control is-invalid";          
      }else{
        if (this.el.nativeElement.value.toString()[0] == ' '){
          this.el.nativeElement.className="form-control is-invalid";
          this.sendMessage('El primer caráctcer del campo '+this.namesInSpanish[this.el.nativeElement.name]+' no puede ser un espacio vacío');
        }else{
          this.el.nativeElement.className="form-control is-valid";
        }
      }
    }
  }


}
