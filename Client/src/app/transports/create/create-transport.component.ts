import { Component, OnInit } from '@angular/core';
import { TransportService } from 'src/app/_services/transport.service';
import { CreateTransportDto } from 'src/app/_models/transport';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-transport',
  templateUrl: './create-transport.component.html',
  styleUrls: ['./create-transport.component.css']
})
export class CreateTransportComponent implements OnInit {

  modelTransport = new CreateTransportDto();
  error = '';

  responseSuccess : any;


  constructor(
        private transportService : TransportService,
        private titleService : Title) { }

  ngOnInit() {
    this.titleService.setTitle('Crear Transporte');
  }

  onSubmit(){
    this.transportService.createTransport(this.modelTransport).subscribe(
        x =>{
          this.modelTransport = this.responseSuccess = x,
          this.modelTransport.id = null,
          this.modelTransport.brand = "";
          this.modelTransport.carPlate = "";
          this.modelTransport.type = "";
          this.modelTransport.model = "";
          this.error = null;
        }, 
        error => this.error = error.error.notifications
      );

  }

}
