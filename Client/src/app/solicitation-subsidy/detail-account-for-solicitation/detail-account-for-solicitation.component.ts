import { Component, OnInit, Input } from '@angular/core';
import { SolicitationSubsidyDetail, SolicitationIdDto } from 'src/app/_models/solicitationSubsidy';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitationSubsidyService } from 'src/app/_services/solicitation-subsidy.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericsCommunicationsComponentsService } from 'src/app/_services/generics-communications-components.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NotifyRejectComponent } from 'src/app/modals/notify-reject/notify-reject.component';
import { CrystalLightbox } from 'ngx-crystal-gallery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-account-for-solicitation',
  templateUrl: './detail-account-for-solicitation.component.html',
  styleUrls: ['./detail-account-for-solicitation.component.css']
})
export class DetailAccountForSolicitationComponent implements OnInit {

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
    public  activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private genericsCommunicationsComponentsService : GenericsCommunicationsComponentsService,
    private authService : AuthenticationService,
    private lightbox : CrystalLightbox,
    private toastrService: ToastrService
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
                    if(this.model.finalizeDate){
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
    this.solicitationSubsidyService.aceptedAccountForSolicitation(newSolicitationId)
    .subscribe(
      () => {this.activeModal.close()},
      err => {
        if (err.error.result){
          var e = err.error.result.errors.Error || [];
          e.forEach(errors => {
            this.toastrService.error(errors);
          });
        }
      }
    );
  }

  reject(){
    let newSolicitationId = new SolicitationIdDto();
    newSolicitationId.id = this.id;
    newSolicitationId.motiveReject = this.motive;
    this.solicitationSubsidyService.refusedAccountForSolicitation(newSolicitationId)
    .subscribe(
      () => {this.activeModal.close()},
      err => {
        if (err.error.result){
          var e = err.error.result.errors.Error || [];
          e.forEach(errors => {
            this.toastrService.error(errors);
          });
        }
      }
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

}
