import { AuthenticationService } from './../../_services/authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { Expenditure, ImageDto } from 'src/app/_models/solicitationSubsidy';
import { AllExpenditureDto } from 'src/app/_models/expenditureType';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExpenditureService } from 'src/app/_services/expenditure.service';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { MessBetweenCompService } from 'src/app/_services/mess-between-comp.service';

@Component({
  selector: 'app-add-expenditure-repayment',
  templateUrl: './add-expenditure-repayment.component.html',
  styleUrls: ['./add-expenditure-repayment.component.css']
})
export class AddExpenditureRepaymentComponent implements OnInit {


  modelExp = new Expenditure();
  @Input() expendituresAdded : Expenditure[] = [];
  expendituresCbox : AllExpenditureDto[] = [];
  msgExist : string;
  selectedExpenditure : number;
  url = '';
  uploader:FileUploader;
  baseUrl = environment.apiUrl; 
  image : ImageDto;
  urlImage : string;
  hasBaseDropZoneOver = false;
  idUser : number;

  constructor(
          public activeModal: NgbActiveModal,
          private expenditureService : ExpenditureService,
          private authService : AuthenticationService 
          ) { }

  ngOnInit() {
    this.idUser = this.authService.userId('id');
    this.allExpenditure();
    this.initializeUploader();
  }

  addNewConcept(){
    let exist;
    if (this.expendituresAdded != null){
      exist = this.expendituresAdded.find(x => x.expenditureTypeId == this.modelExp.id);
    }
    if (exist){
        this.msgExist = "Tipo de gasto ya existente";
        return;
    }
    
    this.msgExist = "";
    let newExp = new Expenditure();
    newExp.id = this.modelExp.id;
    newExp.description = this.modelExp.description;
    newExp.amount = this.modelExp.amount;
    newExp.expenditureTypeId = this.modelExp.id;
    if (this.modelExp.id != null){
      newExp.expenditureTypeName = this.expendituresCbox.find(x => x.id == this.modelExp.id).name;
    }
    newExp.urlImage = this.url;
    newExp.imageDto = this.image;
    this.expendituresAdded = this.expendituresAdded || [];
    this.expendituresAdded.push(newExp);
    this.sendData();
  }
  

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0];
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event : any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
    }
    }
  }

  removePreview(){
    this.url='';
    this.uploader.cancelAll();
    this.uploader.clearQueue();
  }


  sendData(){
    this.activeModal.close(null);
    console.log(this.expendituresAdded);
  }

  allExpenditure(){
    this.expenditureService.getAll().subscribe(
      x => this.expendituresCbox = x
    );
  }

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: '',
      authToken: 'Bearer ' + this.authService.userId('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
  }

  eliminarPerfil(){
      this.urlImage =  '';
      this.url = '';

    }

}
