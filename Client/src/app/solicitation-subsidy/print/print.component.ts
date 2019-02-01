import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { SolicitationSubsidyService } from 'src/app/_services/solicitation-subsidy.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitationSubsidyDetail } from 'src/app/_models/solicitationSubsidy';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  id : number;
  model = new SolicitationSubsidyDetail;
  firstName : string;
  lastName : string;
  prefixCuil : number;
  suffixCuil : number;
  dni : number;
  motive : string = "";
  today = new Date();
  totalExpenditures = 0.0;
  stringIframe : string;

  constructor(
    private route : ActivatedRoute,
    private solicitationSubsidyService : SolicitationSubsidyService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      x => {
          this.solicitationSubsidyService.getByIdSolicitation(x.id)
              .subscribe(
                  solicitation => {
                    this.model = solicitation;
                    this.firstName = this.model.user.firstName;
                    this.lastName = this.model.user.lastName;
                    this.prefixCuil = this.model.user.prefixCuil;
                    this.suffixCuil = this.model.user.suffixCuil;
                    this.dni = this.model.user.dni;
                    this.totalExpenditure();
                    }
              );
            }
        
    );
  }

  totalExpenditure(){
    this.model.expenditures.forEach(x => this.totalExpenditures = this.totalExpenditures + x.amount );
  }

  captureScreen()  
  {  
    let pdf = new jspdf('p', 'mm', 'legal'); // A4 size page of PDF  
    var specialElementHandlers = {
      // element with id of "bypass" - jQuery style selector
      '#bypassme': function (element, renderer) {
          // true = "handled elsewhere, bypass text extraction"
          return true
      }
    };
    var data = document.getElementById('container-pdf');  
    var namePDF = this.firstName+'-'+this.lastName+'-'+this.dni+'.pdf';
    var margins = {
      top: 0,
      bottom: 20,
      left: 10,
      right: 10,
      width: 196
    };

    pdf.fromHTML(
      data, // HTML string or DOM elem ref.
      margins.left, // x coord
      margins.top,{ // y coord
        'width': margins.width,
        'elementHandlers': specialElementHandlers
    },
    function() {
      pdf.setFont("helvetica");
      pdf.setFontType("bold");
      pdf.setFontSize(5);
      pdf.save(namePDF);
    },
    margins); 
    // html2canvas(data).then(canvas => {  

      

        
    // });  

    
  }
}
