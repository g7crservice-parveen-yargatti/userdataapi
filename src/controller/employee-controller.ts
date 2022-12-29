import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

import { injectable, inject, id } from "inversify"
import { EmployeeDataBoContract } from "../bo/employee-bo-contract";
import { EmployeeData } from "../models/employee.model";

import 'reflect-metadata'
import generateResponse from "../utils/response-generator";
import { EmployeeDataControllerContract } from "./employee-controller.contract";

import { DepartmentData } from "../models/department.model";
import { uuid } from 'uuidv4';
import { ApiResponse } from "../models/api-response.model";
import infoGenerateResponse from "../utils/delete-response";
import diTokens from "../constants/di-tokens";

@injectable()
export class EmployeeDataController implements EmployeeDataControllerContract {

    constructor(
        @inject(diTokens.EMPLOYEEDATA_BO_TOKEN) private ebo: EmployeeDataBoContract<EmployeeData | DepartmentData>) {

    }
    getdeptAction = async (req: Request, res: Response): Promise<void>=>{
        try {
            const data = await this.ebo.getAlldept() as DepartmentData[]
            const response = generateResponse<DepartmentData[]>("found record", 200, data)
            res.send(response)
        } catch (error: any) {
            const errResponse = generateResponse<DepartmentData>(error.message, 500)
            res.send(errResponse)
        }
    }


    getAllAction = async (req: Request, res: Response): Promise<void> => {

        try {
            const data = await this.ebo.getAll() as EmployeeData[]
            const response = generateResponse<EmployeeData[]>("found record", 200, data)
            res.send(response)
        } catch (error: any) {
            const errResponse = generateResponse<EmployeeData>(error.message, 500)
            res.send(errResponse)
        }
    }

    putAction = async (req: Request, res: Response): Promise<void> => {

        try {
            const id = (req.params.id)
            

            const employee = <EmployeeData>req.body
            const Employeedata = await this.ebo.update(employee, id)
            const response = infoGenerateResponse("Updated Successfully", 200)
            res.send(response)
        } catch (error: any) {
            const errResponse = generateResponse<EmployeeData>(error.message, 500)
            res.send(errResponse)
        }
    }

    postempAction = async (req: Request, res: Response): Promise<void> => {
        try {

            const employeeData = <EmployeeData>req.body
            const added = await this.ebo.add(employeeData) as EmployeeData


            const response = infoGenerateResponse<EmployeeData>('added successfully', 201)
            res.send(response)
        } catch (error: any) {
            const errResponse = generateResponse<EmployeeData>(error.message, 500)
            res.send(errResponse)
        }
    }

    postdeptAction = async (req: Request, res: Response): Promise<void> => {
        try {
            const DepartmentData = <DepartmentData>req.body
            const added = await this.ebo.adddept(DepartmentData) as DepartmentData


            const response = infoGenerateResponse<DepartmentData>('added successfully', 201)
            res.send(response)
        } catch (error: any) {
            const errResponse = generateResponse<EmployeeData>(error.message, 500)
            res.send(errResponse)
        }
    }


    deleteAction = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = (req.params.id)
            let deleted = await this.ebo.remove(id) 
            const response = infoGenerateResponse<EmployeeData>('Succesfully deleted record', 201)
            res.send(response)
        } catch (error: any) {
            const errResponse = generateResponse<EmployeeData>(error.message, 500)
            res.send(errResponse)
        }
    }
    getByIdAction = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = (req.params.id)
            const data = await this.ebo.getEmpById(id) as EmployeeData
            const response = generateResponse<EmployeeData>('found record', 201, data)
            res.send(response)
        } catch (error: any) {
            const errResponse = generateResponse<EmployeeData>(error.message, 500)
            res.send(errResponse)
        }
    }


}