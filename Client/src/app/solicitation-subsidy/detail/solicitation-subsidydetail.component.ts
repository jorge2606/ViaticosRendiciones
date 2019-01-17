import { NotifyRejectComponent } from './../../modals/notify-reject/notify-reject.component';
import { SolicitationSubsidyService } from './../../_services/solicitation-subsidy.service';
import { SolicitationSubsidyBaseDto, SolicitationSubsidyDetail, SolicitationIdDto } from './../../_models/solicitationSubsidy';
import { Component, OnInit, Input } from '@angular/core';
import { ExpendituresUserService } from 'src/app/_services/expenditures-user.service';
import { ActivatedRoute } from '@angular/router';
import { ExpenditureUserBaseDto } from 'src/app/_models/expenditureUser';
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
  dni : number;
  motive : string = "";
  supscription : any;

  constructor(
    private route : ActivatedRoute,
    private solicitationSubsidyService : SolicitationSubsidyService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private genericsCommunicationsComponentsService : GenericsCommunicationsComponentsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
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
                    this.prefixCuil = this.model.user.prefixCuil;
                    this.suffixCuil = this.model.user.suffixCuil;
                    this.dni = this.model.user.dni;
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
    this.solicitationSubsidyService.Acepted(newSolicitationId)
    .subscribe(
      x => {console.log(x);
            this.activeModal.close()}
    );
  }

  reject(){
    this.AddMotive();
  }

  AddMotive(){
    const modalRef = this.modalService.open(NotifyRejectComponent, {size : "lg"});
    modalRef.result.then(() => {
      let newSolicitationId = new SolicitationIdDto();
      newSolicitationId.id = this.id;
      newSolicitationId.motiveReject = this.motive;
      this.solicitationSubsidyService.refused(newSolicitationId)
      .subscribe(
        x => {console.log(x);
              this.activeModal.close()}
      );
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
