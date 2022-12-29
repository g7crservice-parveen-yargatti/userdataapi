export interface EmployeeDataBoContract<T>{

    add(data:T):Promise<T>;
    adddept(data:T):Promise<T>;
    update(data:T,id:string): Promise<T>;
    remove(id:string):Promise<T>;
    getAll(): Promise<T[]>;
    getAlldept():Promise<T[]>;
    getEmpById(id:string):Promise<T>
}     