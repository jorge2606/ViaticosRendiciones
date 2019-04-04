import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateExpenditureDto } from 'src/app/_models/expenditureType';
import { ExpenditureService } from 'src/app/_services/expenditure.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ClaimsService } from 'src/app/_services/claims.service';

@Component({
  selector: 'app-create-expenditure',
  templateUrl: './create-expenditure.component.html',
  styleUrls: ['./create-expenditure.component.css']
})
export class CreateExpenditureComponent implements OnInit {

  model = new CreateExpenditureDto();
  error = '';
  @ViewChild('CategoryForm') categoryForm : FormGroup;

  constructor(
            private expenditureService : ExpenditureService,
            private titleService : Title,
            private toastrService : ToastrService,
            private routerService : Router,
            private claimService : ClaimsService
            ) {
              this.titleService.setTitle('Crear Tipo de Gasto');
             }

  ngOnInit() {
    if(!this.claimService.haveClaim(this.claimService.canCreateExpenditure)){
      this.routerService.navigate(['/notAuthorized']);
    }
  }

  onSubmit(){
    this.expenditureService.createExpenditure(this.model).subscribe(
      x=>{
          this.toastrService.success("El concepto de gasto '"+this.model.name+"' se ha guardado correctamente.",'',
          {positionClass : 'toast-top-center', timeOut : 3000});
          this.routerService.navigate(['/expenditure']);
          this.error = '';
        },
      error => this.error = error.error.notifications
    );
  }

  
  msjValidEvent(msj : any){
  }

  hasUnsavedData(){
    return this.categoryForm.dirty;
  }
}
