import { Component, OnInit } from '@angular/core';
import { SolicitationSubsidyDetail } from 'src/app/_models/solicitationSubsidy';
import { DestinyDto } from 'src/app/_models/destiny';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SolicitationSubsidyService } from 'src/app/_services/solicitation-subsidy.service';
import { DestinyService } from 'src/app/_services/destiny.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-print-account-for-solicitation',
  templateUrl: './print-account-for-solicitation.component.html',
  styleUrls: ['./print-account-for-solicitation.component.css']
})
export class PrintAccountForSolicitationComponent implements OnInit {
  id : number;
  model = new SolicitationSubsidyDetail;
  firstName : string;
  lastName : string;
  prefixCuil : number;
  suffixCuil : number;
  dni : string;
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
  urlSign : string;
  printObservable = new Subject<boolean>();
  categoryName : string;
  categoryAdvance : number;
  categoryDescription : string;
  distributionName : string;
  distributionDescription : string;
  totDest : number = 0;


  constructor(
              private route : ActivatedRoute,
              private solicitationSubsidyService : SolicitationSubsidyService,
              private destinyService : DestinyService,
              private domSanitazer : DomSanitizer,
              private spinner: NgxSpinnerService,
              private titleService : Title
            ) { 
                this.titleService.setTitle('Imprimir Solcitud');
            }

  ngOnInit() {
    this.spinner.show();
    this.init();

    this.spinner.hide();
    
  }


  init(){
    this.route.params.subscribe(
      url => {
          this.solicitationSubsidyService.SolicitationApprovedBySupervisorId(url.id)
          .subscribe(x => {
              this.solicitationSubsidyService.getImageHolographSignUrl(x,200,120)
              .subscribe(urlImage =>{
                this.urlSign = "data:image/jpg;base64,"+urlImage.response;
                
                setTimeout(() => {
                }, 1000);
                this.solicitationSubsidyService.getByIdSolicitation(url.id)
                .subscribe(
                    solicitation => {
                      this.model = solicitation;
                      this.firstName = this.model.user.firstName;
                      this.lastName = this.model.user.lastName;
                      this.categoryName = this.model.user.categoryName;
                      this.categoryAdvance = this.model.user.categoryAdvance;
                      this.categoryDescription = this.model.user.categoryDescription;
                      this.dni = this.model.user.dni;
                      this.distributionName = this.model.user.distributionName;
                      this.distributionDescription = this.model.user.distributionDescription;
    
                      this.model.destinies.forEach(totalDestinies => {
                        this.totDest =  this.totDest + (totalDestinies.advanceCategory * totalDestinies.days * totalDestinies.percentageCodeLiquidation);
                      });
    
                      this.model.expenditures.forEach(exp => this.totalExpenditures = this.totalExpenditures + exp.amount );
                      
                      this.destinyService.get_destinies(url.id)
                      .subscribe(
                            j => {
                                  this.destinieWithDaysInLetters = j;
                                  this.totalExpenditures = this.totalExpenditures +  this.totDest;
                                    
                                  setTimeout(() => {
                                    this.captureScreen();
                                  }, 2000);                                
                                }
                      );
                  });            
              });
            });
      }
    );
  }
  urlFile(userId : number, width : number, height: number){
    return environment.apiUrl+"File/HolographSignUrl/"+userId+"/"+width+"/"+height;
  }

  captureScreen()  
  {  
        this.spinner.show();
        var data = document.getElementById('container-print');  
        html2canvas(data).then(canvas => {  
          const img = canvas.toDataURL('image/png');
          this.imgUrl = img;
          this.stringIframe = this.domSanitazer.bypassSecurityTrustResourceUrl(img);
         
        });
        this.hideHtml = true;
        this.spinner.hide();
  }

  download()  
  {  
    this.spinner.show();
    this.hideHtml = false;
    var namePDF = this.firstName+'-'+this.lastName+'-'+this.dni+'.pdf'; 
    var pdf = new jspdf('p', 'mm', 'legal'); 
    
    pdf.addImage(this.imgUrl,'PNG',10,10,195,330);
    pdf.save(namePDF);
    this.hideHtml = true;
    this.spinner.hide();
      
  }

}

