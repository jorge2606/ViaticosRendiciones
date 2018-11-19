export class User{
  id : number;
  dni: number;
  userName : string;
  phoneNumber : string;
  password : string;
}

export class rolesBelongUser{
  id : number;
  name : string;
  rolBelongUser : string;
}
export class modifyUser extends User{
  rolesUser : rolesBelongUser[];
}


export class createUser extends modifyUser{
}

