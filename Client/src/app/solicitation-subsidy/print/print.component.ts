import { AuthenticationService } from 'src/app/_services/authentication.service';
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
  idUser : number;
  urlImage : string;

  constructor(
    private route : ActivatedRoute,
    private solicitationSubsidyService : SolicitationSubsidyService,
    private authService : AuthenticationService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      x => {
          this.solicitationSubsidyService.SolicitationApprovedBySupervisorId(x.id)
          .subscribe(x => {
            this.urlImage = this.urlFile(x, 250,100);
          });
          
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

  urlFile(userId : number, width : number, height: number){
    return "http://localhost:63098/api/File/HolographSign/"+userId+"/"+width+"/"+height;
  }
  captureScreen()  
  {  
    let pdf = new jspdf('p', 'mm', 'legal'); // A4 size page of PDF 
    var data = document.getElementById('container-pdf');  
    
    var namePDF = this.firstName+'-'+this.lastName+'-'+this.dni+'.pdf'; 
    
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'legal'); // A4 size page of PDF  
      var position = 5;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save(namePDF); // Generated PDF   
    }); 
   
  }
}
