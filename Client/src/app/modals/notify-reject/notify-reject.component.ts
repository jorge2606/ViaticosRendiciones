import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericsCommunicationsComponentsService } from 'src/app/_services/generics-communications-components.service';

@Component({
  selector: 'app-notify-reject',
  templateUrl: './notify-reject.component.html',
  styleUrls: ['./notify-reject.component.css']
})
export class NotifyRejectComponent implements OnInit {

  model = {motive : ""}

  constructor( 
              private modalService: NgbModal,
              public activeModal: NgbActiveModal,
              private genericsCommunicationsComponentsService : GenericsCommunicationsComponentsService) { }

  ngOnInit() {
  }

  save(){
    this.genericsCommunicationsComponentsService.sendMessage(this.model);
    this.activeModal.close();
  }

}
