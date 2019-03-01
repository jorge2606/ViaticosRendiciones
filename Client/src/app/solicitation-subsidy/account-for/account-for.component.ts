import { Component, OnInit, Input } from '@angular/core';
import { SolicitationSubsidyDetail, SolicitationIdDto } from 'src/app/_models/solicitationSubsidy';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitationSubsidyService } from 'src/app/_services/solicitation-subsidy.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericsCommunicationsComponentsService } from 'src/app/_services/generics-communications-components.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NotifyRejectComponent } from 'src/app/modals/notify-reject/notify-reject.component';

@Component({
  selector: 'app-account-for',
  templateUrl: './account-for.component.html',
  styleUrls: ['./account-for.component.css']
})
export class AccountForComponent implements OnInit {

  id : number;
  @Input() idModal : number;
  model = new SolicitationSubsidyDetail;
  firstName : string;
  lastName : string;
  prefixCuil : number;
  suffixCuil : number;
  dni : string;
  motive : string = "";
  supscription : any;
  currentUrl : string;
  sizeIcon="fa-lg";

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private solicitationSubsidyService : SolicitationSubsidyService,
    private genericsCommunicationsComponentsService : GenericsCommunicationsComponentsService,
    private authService : AuthenticationService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      x => {
        this.id = x.id;
        if (!this.id){
          this.id = this.idModal;
        }
            if (this.id){
              this.solicitationSubsidyService.getByIdSolicitation(this.id)
              .subscribe(
                  solicitation => {
                    this.model = solicitation;
                    this.firstName = this.model.user.firstName;
                    this.lastName = this.model.user.lastName;
                    this.dni = this.model.user.dni;
                    this.currentUrl = this.router.url;
                    if(this.model.isRefund){
                      this.model.expenditures.forEach(
                        exp=>{
                            exp.urlImage = this.authService.urlExpenditureRefundFile(exp.id,186,60);
                        }
                      );
                    }
                  }
              );
            }
        }
    );
    
  }


  toSeeImageBase64InNewTab(data) {
    var image = new Image();
    image.src = data;

    var w = window.open("");
    w.document.write(image.outerHTML);
  }

}
