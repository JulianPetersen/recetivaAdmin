export interface User {
    _id?:string
    email?:string,
    password?:string,
    roles?:string[]    
}

export interface AdminUserResponse {
    _id?:string
    isActive:boolean,
    lastName:string,
    matricula:string,
    name:string
    user:User
}
