import { DistributionBaseDto } from 'src/app/_models/distributions';

export class User{
  id : number;
  dni: number;
  userName : string;
  phoneNumber : string;
  password : string;
  distributionId : number;
  //distribution : DistributionBaseDto;
  checked : boolean;
  rol : string;
  firstName : string;
  lastName : string;
  prefixCuil : number;
  suffixCuil : number;
  categoryId : number;
  categoryName : string;
  categoryDescription : string;

}

export class rolesBelongUser{
  id : number;
  name : string;
  rolBelongUser : string;
}
export class modifyUser extends User{
  rolesUser : rolesBelongUser[];
  repeatPassword : string;
}


export class createUser extends modifyUser{
}

