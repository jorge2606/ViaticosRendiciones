import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router/src/interfaces";

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<any> {
  
  constructor(){}

  canDeactivate(component: any): boolean {
    if(component.hasUnsavedData()){
       if (confirm("Tienes cambios sin guardar! si los dejas así se perderan.")) {
            return true;
        } else {
            return false;
        }
    }
    return true;
  }
}
