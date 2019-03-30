import { AuthenticationService } from './../../_services/authentication.service';
import { NotifyRejectComponent } from './../../modals/notify-reject/notify-reject.component';
import { SolicitationSubsidyService } from './../../_services/solicitation-subsidy.service';
import { SolicitationSubsidyDetail, SolicitationIdDto } from './../../_models/solicitationSubsidy';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericsCommunicationsComponentsService } from 'src/app/_services/generics-communications-components.service';

@Component({
  selector: 'app-solicitation-subsidydetail',
  templateUrl: './solicitation-subsidydetail.component.html',
  styleUrls: ['./solicitation-subsidydetail.component.css']
})
export class SolicitationSubsidydetailComponent implements OnInit {

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
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
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
    
    this.getMotiveFromModal();
  }

  acepted(){
    let newSolicitationId = new SolicitationIdDto();
    newSolicitationId.id = this.id;
    newSolicitationId.fileNumber = "";
    this.solicitationSubsidyService.acepted(newSolicitationId)
    .subscribe(
      () => {this.activeModal.close()}
    );
  }

  reject(){
    let newSolicitationId = new SolicitationIdDto();
    newSolicitationId.id = this.id;
    newSolicitationId.motiveReject = this.motive;
    this.solicitationSubsidyService.refused(newSolicitationId)
    .subscribe(
      () => {this.activeModal.close()}
    );
  }

  AddMotive(title : string){
    const modalRef = this.modalService.open(NotifyRejectComponent, {size : "lg"});
    modalRef.componentInstance.title = title;
    modalRef.result.then(() => {
      this.reject();
    },
      () => {
        console.log('Backdrop click');
    })
  }

  getMotiveFromModal(){
    this.supscription = this.genericsCommunicationsComponentsService.getMessage().subscribe(
      message => this.motive = message.motive
      ,
      error => console.log(error)
    );
  }

  ngOnDestroy(){
    this.supscription.unsubscribe();
  }

  toSeeImageBase64InNewTab(data) {
    var image = new Image();
    image.src = data;

    var w = window.open("");
    w.document.write(image.outerHTML);
  }
  
}
