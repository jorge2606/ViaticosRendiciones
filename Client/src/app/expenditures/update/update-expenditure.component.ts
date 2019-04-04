import { ClaimsService } from 'src/app/_services/claims.service';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UpdateExpenditureDto } from 'src/app/_models/expenditureType';
import { ExpenditureService } from 'src/app/_services/expenditure.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-expenditure',
  templateUrl: './update-expenditure.component.html',
  styleUrls: ['./update-expenditure.component.css']
})
export class UpdateExpenditureComponent implements OnInit {

  model = new UpdateExpenditureDto();
  error = '';
  id : number;
  @ViewChild('CategoryForm') categoryForm : any;

  constructor(
              private expenditureService : ExpenditureService,
              private route : ActivatedRoute,
              private router : Router,
              private titleService : Title,
              private routerService : Router,
              private toastrService : ToastrService,
              private claimService : ClaimsService) { 
                this.titleService.setTitle('Modificar Tipo de Gasto');
              }

  ngOnInit() {
    if(!this.claimService.haveClaim(this.claimService.canEditExpenditure)){
      this.router.navigate(['/notAuthorized']);
    }else{
      this.route.params.subscribe(
        p => this.id = p.id
      );

      this.expenditureService.findByIdExpenditure(this.id).subscribe(
        x => {this.model = x;}
      );
    }

  }

  onSubmit(){
    this.expenditureService.updateExpenditure(this.model).subscribe(
      x=> {
            this.toastrService.success("El concepto de gasto '"+this.model.name+"' se ha modificado correctamente.",'',
            {positionClass : 'toast-top-center', timeOut : 3000});
            this.routerService.navigate(['/expenditure']);
          },
      error => this.error = error.error.notifications
    );
  }

  
  msjValidEvent(msj : any){
  }

  hasUnsavedData(){
    return this.categoryForm.dirty && !this.categoryForm.submitted;
  }
}
