export interface User{

    id:number,
    username:string,
    password:string,
    email:string,
    firstname:string,
    lastname:string,
    groupName:string,
    groupId:string ,
    lastLogin:Date,
    dateModifiedPass:Date ,
    creationTime:Date,
    verified:boolean,
    deleted:boolean ,
    creationUser:string,
    updateUser:string,
    updateTime:Date

}