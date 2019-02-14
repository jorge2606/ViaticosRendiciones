import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { CreateExpenditureDto } from 'src/app/_models/expenditureType';
import { ExpenditureService } from 'src/app/_services/expenditure.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-expenditure',
  templateUrl: './create-expenditure.component.html',
  styleUrls: ['./create-expenditure.component.css']
})
export class CreateExpenditureComponent implements OnInit {

  model = new CreateExpenditureDto();
  error = '';

  constructor(
            private expenditureService : ExpenditureService,
            private titleService : Title,
            private toastrService : ToastrService,
            private routerService : Router
            ) {
              this.titleService.setTitle('Crear Tipo de Gasto');
             }

  ngOnInit() {
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

}
