import { Request,Response } from "express";

export interface EmployeeDataControllerContract{
    getAllAction(req: Request, res: Response): Promise<void>;
    putAction(req: Request, res: Response): Promise<void>;
    postempAction(req:Request,res:Response): Promise<void>;
    postdeptAction(req:Request,res:Response): Promise<void>;
    getdeptAction(req:Request,res:Response):Promise<void>;
    deleteAction(req:Request,res:Response):Promise<void>;
    getByIdAction(req:Request,res:Response):Promise<void>
}

