import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
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

  constructor(
              private expenditureService : ExpenditureService,
              private route : ActivatedRoute,
              private router : Router,
              private titleService : Title,
              private routerService : Router,
              private toastrService : ToastrService) { 
                this.titleService.setTitle('Modificar Tipo de Gasto');
              }

  ngOnInit() {
    this.route.params.subscribe(
      p => this.id = p.id
    );

    this.expenditureService.findByIdExpenditure(this.id).subscribe(
      x => {this.model.id = x.id, this.model.name = x.name}
    );
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
}
