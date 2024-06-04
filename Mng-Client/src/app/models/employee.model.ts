export enum Gender{
    male,
    female
}
export class Employee{
    id!:number
    firstName!:string
    lastName!:string
    tz!:string
    startDate!:Date
    dateOfBirth!:Date
    gender!:Gender
    activityStatus!:boolean
    roles!:EmployeeRoles[]
}
export class EmployeeRoles{
    id!:number
    roleId!:number
    startDate!:Date
    isManagement!:boolean
    employeeId!:number
}
export class Role{
    id!:number
    roleName!:string
}