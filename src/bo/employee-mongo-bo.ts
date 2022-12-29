import { injectable } from "inversify";
import EmployeesModel from "../db/models/employeemodel";
import 'reflect-metadata'
import { EmployeeData } from "../models/employee.model";
import { EmployeeDataBoContract } from "./employee-bo-contract";
import { DepartmentData } from "../models/department.model";
import DepartmentModel from "../db/models/departmentmodel";
import { uuid } from 'uuidv4';

@injectable()
export class EmployeesMongoBo implements EmployeeDataBoContract<EmployeeData|DepartmentData>{

    async add(data: EmployeeData): Promise<EmployeeData> {
        try { 
            let id = uuid()
            data.EmployeeId = id
            await EmployeesModel.create({ ...data })
            return data
        } catch (error) {
            throw error
        }
    }
    async adddept(data: DepartmentData): Promise<DepartmentData> {
        try {
         
            const id=uuid();
            data.DepartmentId = id
            await DepartmentModel.create({ ...data })
            return data
        } catch (error) {
            throw error
        }
    }
    async update(data:EmployeeData, id: string): Promise<EmployeeData> {
        try {
            const found = await EmployeesModel.findOne({ EmployeeId: id })
            if (found) {
                data.EmployeeId = id
                
                const updated = await EmployeesModel.updateOne({ EmployeeId: id }, { ...data })
                if (updated.modifiedCount > 0)
                    return found as EmployeeData
                else
                    throw new Error(`the employee with id:${id} could not be updated`)
            } else
                throw new Error(`the employee with id:${id} does not exist`)
        } catch (error) {
            throw error
        }
    }
    async remove(id: string): Promise<EmployeeData> {
        try {
            const found = await EmployeesModel.findOne({ EmployeeId: id })
            if (found) {
                const deleted = await EmployeesModel.deleteOne({ EmployeeId: id })
                if (deleted.deletedCount > 0)
                    return found as EmployeeData
                else
                    throw new Error(`the employee with id:${id} could not be deleted`)
            } else
                throw new Error(`the employee with id:${id} does not exist`)
        } catch (error) {
            throw error
        }
    }

    async getAll(): Promise<EmployeeData[]> {
        try {
            const employees = await EmployeesModel.find()
            if (employees.length > 0) {
                return employees as EmployeeData[]
            } else
                throw new Error(`no record found`)
        } catch (error) {
            throw error
        }
    }
    async getAlldept(): Promise<DepartmentData[]> {
        try {
            const department = await DepartmentModel.find()
            if (department.length > 0) {
                return department as DepartmentData[]
            } else
                throw new Error(`no record found`)
        } catch (error) {
            throw error
        }
    }

    async getEmpById(id: string): Promise<EmployeeData> {
        try {
            const found = await EmployeesModel.findOne({ EmployeeId: id })
            if (found) 
                    return found as EmployeeData 
             else
                throw new Error(`the employee with id:${id} does not exist`)
        } catch (error) {
            throw error
        }
    }

}