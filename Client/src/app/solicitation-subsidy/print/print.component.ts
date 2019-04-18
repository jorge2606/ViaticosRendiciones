import { ToastrService } from 'ngx-toastr';
import { GuidClass } from './../../_helpers/guid-class';
import { ClaimsService } from './../../_services/claims.service';
import { Subject } from 'rxjs';
import { DestinyDto } from './../../_models/destiny';
import { DestinyService } from 'src/app/_services/destiny.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Component, OnInit, SecurityContext } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitationSubsidyService } from 'src/app/_services/solicitation-subsidy.service';
import { SolicitationSubsidyDetail } from 'src/app/_models/solicitationSubsidy';
import { DomSanitizer, Title, SafeResourceUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { SolicitationStatesService } from 'src/app/_services/solicitation-states.service';

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
  dni : string;
  motive : string = "";
  today = new Date();
  totalExpenditures = 0.0;
  stringIframe : SafeResourceUrl = "";
  idUser : number;
  urlImage : string;
  destinieWithDaysInLetters : DestinyDto[] = [];
  previewImage : any;
  hideHtml : boolean = false;
  imgUrl : string;
  urlSupervisorId : string;
  urlSupervisorId2 : string;
  nameSupervisor1 : string;
  surnameSupervisor1 : string;
  nameSupervisor2 : string;
  surnameSupervisor2 : string;
  printObservable = new Subject<boolean>();
  categoryName : string;
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
              private titleService : Title,
              private router : Router,
              private solicitationStateService : SolicitationStatesService,
              private toastrService : ToastrService
            ) { 
                this.titleService.setTitle('Imprimir Solcitud');
            }

  ngOnInit() {
    this.spinner.show();
    this.init();
  }


  init(){
    this.route.params.subscribe(
      url => {
          this.solicitationSubsidyService.SolicitationApprovedBySupervisorId(url.id)
          .subscribe(x => {
                this.urlSupervisorId = "data:image/jpg;base64,"+x.urlSupervisorId;
                this.urlSupervisorId2 = "data:image/jpg;base64,"+x.urlSupervisorId2;
                this.nameSupervisor1 = x.nameSupervisor1;
                this.surnameSupervisor1 = x.surnameSupervisor1;
                this.nameSupervisor2 = x.nameSupervisor2;
                this.surnameSupervisor2 = x.surnameSupervisor2;
                
                setTimeout(() => {
                }, 1000);
                this.solicitationSubsidyService.getByIdSolicitation(url.id)
                .subscribe(
                    solicitation => {
                      this.model = solicitation;
                      this.firstName = this.model.user.firstName;
                      this.lastName = this.model.user.lastName;
                      this.categoryName = this.model.user.categoryName;
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
                                    this.spinner.hide(); 
                                  }, 2000);  
                                                        
                                }
                      );
                  });  
            },err =>{
                if(err.error){
                  var e = err.error.errors.Error || [];
                  e.forEach(errors => {
                    this.router.navigate(['/']);
                    this.toastrService.error(errors);
                  });
                  this.spinner.hide(); 
                }
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
        var stringImage : any;
        var data = document.getElementById('container-print');  
        html2canvas(data).then(canvas => {  
          const img = canvas.toDataURL('image/png');
          this.imgUrl = img;
          this.stringIframe = this.domSanitazer.bypassSecurityTrustResourceUrl(img);
        });
        this.hideHtml = true;
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

  b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    
    const pdfBlob : Blob = new Blob(byteArrays, {type: contentType});
    return  URL.createObjectURL(pdfBlob);
  }

}
