import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CreateOrganismDto } from './../../_models/organism';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganismService } from 'src/app/_services/organism.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-organism',
  templateUrl: './create-organism.component.html',
  styleUrls: ['./create-organism.component.css']
})
export class CreateOrganismComponent implements OnInit {

  responseSuccess : any;
  error = '';
  model = new CreateOrganismDto();
  @ViewChild('OrganismForm') organismForm : FormGroup;

  constructor(
              private organismServcice : OrganismService,
              private titleService : Title,
              private toastrService : ToastrService,
              private routerService : Router
              ) {
                this.titleService.setTitle('Crear Organismo');
               }

  ngOnInit() {}

    onSubmit(){
      this.organismServcice.createOrganism(this.model).subscribe(
        x=> {
            this.responseSuccess = x;
            this.routerService.navigate(['/organism']);
            this.toastrService.success("El organismo '"+this.model.name+"' se ha modificado correctamente.",'',
            {positionClass : 'toast-top-center', timeOut : 3000});
            },
        error => this.error = error.error.notifications
      );
    }

    msjValidEvent(msj : any){

    }
  
    hasUnsavedData(){
      return this.organismForm.dirty;
    }
}
