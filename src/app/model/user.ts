export class User {
    id? : number;
    userId? :number ;
    firstName? : string ;
    lastName? : string;
    username? : string;
    email? : string;
    lastLoginDate? : Date;
    logInDateDisplay? : Date;
    joinDate? : Date;
    profileImageUrl? : string;
    active? : boolean = false;
    notLocked? : boolean = false;
    role? : string ;
    authorities? : string[];
}
