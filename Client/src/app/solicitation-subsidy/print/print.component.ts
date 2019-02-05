import { Observable, Subject } from 'rxjs';
import { DestinyDto } from './../../_models/destiny';
import { DestinyService } from 'src/app/_services/destiny.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { SolicitationSubsidyService } from 'src/app/_services/solicitation-subsidy.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitationSubsidyDetail } from 'src/app/_models/solicitationSubsidy';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { timeout } from 'rxjs/operators';

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
  stringIframe : any = "";
  idUser : number;
  urlImage : string;
  destinieWithDaysInLetters : DestinyDto[] = [];
  previewImage : any;
  hideHtml : boolean = false;
  imgUrl : string;
  printObservable = new Subject<boolean>();
  categoryName : string;
  categoryDescription : string;


  constructor(
    private route : ActivatedRoute,
    private solicitationSubsidyService : SolicitationSubsidyService,
    private authService : AuthenticationService,
    private destinyService : DestinyService,
    private domSanitazer : DomSanitizer,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.init();
  }

  init(){
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
                  this.categoryName = this.model.user.categoryName;
                  this.categoryDescription = this.model.user.categoryDescription;
                  this.dni = this.model.user.dni;
                  let totDest : number = 0;
                  this.model.destinies.forEach(totalDestinies => {
                    totDest = totDest + (totalDestinies.advanceCategory * totalDestinies.days * totalDestinies.codeLiquidationPercentage);
                  });

                  this.model.expenditures.forEach(exp => this.totalExpenditures = this.totalExpenditures + exp.amount );
                  this.totalExpenditures = this.totalExpenditures + totDest;

                  this.destinyService.get_destinies(url.id)
                  .subscribe(
                        j => {
                              this.destinieWithDaysInLetters = j;
                              setTimeout(() => {
                                this.captureScreen();
                              }, 500);
                              
                            }
                  );
              });
            });
      }
    );
  }
  urlFile(userId : number, width : number, height: number){
    return "http://localhost:63098/api/File/HolographSign/"+userId+"/"+width+"/"+height;
  }

  captureScreen()  
  {  
        this.spinner.show();
        var namePDF = this.firstName+'-'+this.lastName+'-'+this.dni+'.pdf'; 
        var pdf = new jspdf('p', 'mm', 'legal'); 
        var data = document.getElementById('container-print');  
        html2canvas(data).then(canvas => {  
          const img = canvas.toDataURL('image/png');
          this.imgUrl = img;
          this.stringIframe = this.domSanitazer.bypassSecurityTrustResourceUrl(img);
          this.hideHtml = true;
        });
        this.spinner.hide();
  }

  download()  
  {  
    this.spinner.show();
    this.hideHtml = false;
    var namePDF = this.firstName+'-'+this.lastName+'-'+this.dni+'.pdf'; 
    var pdf = new jspdf('p', 'mm', 'legal'); 
    
    pdf.addImage(this.imgUrl,'PNG',10,10,195,200);
    pdf.save(namePDF);
    this.spinner.hide();
      
  }

}
