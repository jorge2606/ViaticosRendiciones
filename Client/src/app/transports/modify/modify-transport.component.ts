import { TransportService } from './../../_services/transport.service';
import { Component, OnInit } from '@angular/core';
import { UpdateTransportDto } from 'src/app/_models/transport';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modify-transport',
  templateUrl: './modify-transport.component.html',
  styleUrls: ['./modify-transport.component.css']
})
export class ModifyTransportComponent implements OnInit {

  modelTransport = new UpdateTransportDto();
  id : number;
  error = '';

  constructor(private route : ActivatedRoute,
    private router : Router,
    private tranportService : TransportService) { }

  ngOnInit() {
    this.route.params.subscribe(
      p => this.id = p.id
    );

    this.tranportService.findByIdTransport(this.id).subscribe(
      x => {
         this.modelTransport.id = x.id;
         this.modelTransport.brand = x.brand;
         this.modelTransport.carPlate = x.carPlate;
         this.modelTransport.model = x.model;
         this.modelTransport.type = x.type;
        }
    );
  }

  onSubmit() {
    this.modelTransport.id = this.id;
    this.tranportService.updateTransport(this.modelTransport).subscribe(
      () => {
        this.router.navigate(['/transport']);
      },
        error => {
          this.error = error.error.notifications
      }      
    );
    //this.router.navigate(['/distribution']);
  }

}
