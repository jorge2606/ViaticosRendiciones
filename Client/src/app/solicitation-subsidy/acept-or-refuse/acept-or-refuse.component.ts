import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { SolicitationIdDto } from 'src/app/_models/solicitationSubsidy';
import { SolicitationSubsidyService } from 'src/app/_services/solicitation-subsidy.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifyRejectComponent } from 'src/app/modals/notify-reject/notify-reject.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CrystalLightbox } from 'ngx-crystal-gallery';
import { ClaimsService } from 'src/app/_services/claims.service';

@Component({
  selector: 'app-acept-or-refuse',
  templateUrl: './acept-or-refuse.component.html',
  styleUrls: ['./acept-or-refuse.component.css']
})
export class AceptOrRefuseComponent implements OnInit {

  model = new SolicitationIdDto();
  msjSuccess = '';
  msjError = '';
  firstName : string;
  lastName : string;
  prefixCuil : number;
  suffixCuil : number;
  dni : number;
  motive : string = "";
  currentUrl : string;
  aceptedSolicitation: any;
  permissions: any;
  moderateSolicitation: any;
  moderateRefund: any;

    constructor(
        private solicitationSubsidyService : SolicitationSubsidyService,
        private Activatedrouter : ActivatedRoute,
        private modalService : NgbModal,
        public router : Router,
        public authService : AuthenticationService,
        public toastService : ToastrService,
        private lightbox : CrystalLightbox,
        private claimService : ClaimsService
    ) { }

  ngOnInit() {
      this.permissions = this.authService.userId('roles');
      
    if(!this.claimService.haveClaim(this.claimService.canModerateRefund) && this.claimService.haveClaim(this.claimService.canModerateSolicitation)){
      this.router.navigate(['/notAuthorized']);
    }else{
      this.Activatedrouter.params.subscribe(
        x => {
              this.model.id = x.id;
                this.solicitationSubsidyService.getByIdSolicitation(x.id)
                .subscribe(
                    solicitation => {
                      this.model = solicitation;
                      this.firstName = this.model.user.firstName;
                      this.lastName = this.model.user.lastName;
                      this.prefixCuil = this.model.user.prefixCuil;
                      this.suffixCuil = this.model.user.suffixCuil;
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
      );
    }

  }

  acepted(){
    this.solicitationSubsidyService.acepted(this.model)
    .subscribe(
      x => {
          this.toastService.success('La solicitud fue aceptada.');
          this.router.navigate(['/']);
      }
      ,error => {this.msjError='Error'}
    );
  }

  reject(){
    this.solicitationSubsidyService.refused(this.model)
    .subscribe(
      x => {
        this.toastService.success('La solicitud fue rechazada.');
        this.router.navigate(['/']);
      }
      ,error => {this.msjError = 'Error'}
    );
  }

  AddMotive(opt : string, title : string){
    const modalRef = this.modalService.open(NotifyRejectComponent, {size : "lg"});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.class = opt;
    modalRef.result.then(() => {
      this.reject();
    },
      () => {
        console.log('Backdrop click');
    })
  }

  dimiss(){
    this.modalService.dismissAll('Close click');
  }

}
