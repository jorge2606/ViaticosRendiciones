import { Observable, Subject } from 'rxjs';
import { DestinyDto } from './../../_models/destiny';
import { DestinyService } from 'src/app/_services/destiny.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { SolicitationSubsidyService } from 'src/app/_services/solicitation-subsidy.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitationSubsidyDetail } from 'src/app/_models/solicitationSubsidy';
import { DomSanitizer } from '@angular/platform-browser';

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
  stringIframe : any;
  idUser : number;
  urlImage : string;
  destinieWithDaysInLetters : DestinyDto[] = [];
  previewImage : any;
  hideHtml : boolean = false;
  printObservable = new Subject<boolean>();


  constructor(
    private route : ActivatedRoute,
    private solicitationSubsidyService : SolicitationSubsidyService,
    private authService : AuthenticationService,
    private destinyService : DestinyService,
    private domSanitazer : DomSanitizer
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      url => {
          this.solicitationSubsidyService.SolicitationApprovedBySupervisorId(url.id)
          .subscribe(x => {
            this.urlImage = this.urlFile(x, 250,100);

            this.solicitationSubsidyService.getByIdSolicitation(url.id)
            .subscribe(
                solicitation => {
                  this.model = solicitation;
                  this.firstName = this.model.user.firstName;
                  this.lastName = this.model.user.lastName;
                  this.prefixCuil = this.model.user.prefixCuil;
                  this.suffixCuil = this.model.user.suffixCuil;
                  this.dni = this.model.user.dni;

                  this.destinyService.get_destinies(url.id)
                  .subscribe(
                        j => {
                              this.destinieWithDaysInLetters = j;
                              this.totalExpenditure();
                              this.printObservable.next(true);
                            }
                  );
              });
            });
      }
    );
  }

  totalExpenditure(){
    let totDest : number = 0;
    this.destinieWithDaysInLetters.forEach(totalDestinies => {
      totDest = totDest + totalDestinies.advanceCategory;
    });
    this.model.expenditures.forEach(x => this.totalExpenditures = this.totalExpenditures + x.amount );
    this.totalExpenditures = this.totalExpenditures + totDest;
  }

  urlFile(userId : number, width : number, height: number){
    return "http://localhost:63098/api/File/HolographSign/"+userId+"/"+width+"/"+height;
  }

  captureScreen()  
  {  
    this.printObservable.subscribe(x => {
      if (x){
        this.totalExpenditure();
        var data = document.getElementById('container-print');  
      
        html2canvas(data).then(canvas => {  
          const img = canvas.toDataURL('application/pdf');
          this.stringIframe = this.domSanitazer.bypassSecurityTrustResourceUrl(img);
          
          this.hideHtml = true;
          
        });
      }
    });
   
  }

  download()  
  {  
    var pdf = new jspdf('p', 'mm', 'legal'); 
    var data = document.getElementById('iframeId');  
    var namePDF = this.firstName+'-'+this.lastName+'-'+this.dni+'.pdf'; 

    html2canvas(data).then(
      c => {
          var img = c.toDataURL('image/png');
          pdf.addImage(img,'PNG',10,10,195,200);
          pdf.save(namePDF);
      }
    );
  }

}
