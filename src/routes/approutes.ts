import { Router } from "express";
import {injectable,inject} from "inversify"


import 'reflect-metadata';
import { EmployeeDataControllerContract } from "../controller/employee-controller.contract";
import { config } from "dotenv";
import diTokens from "../constants/di-tokens";

config();
const BASE_URL=process.env.BASE_URL || "/employeedata"

@injectable()
export class AppRoutes{
    constructor(@inject(diTokens.EMPLOYEEDATA_CONTROLLER_TOKEN) private controller:EmployeeDataControllerContract){

    }
    registerRoutes():Router{
        const routerMiddleware=Router()
          routerMiddleware.get(`${BASE_URL}/emp`,this.controller.getAllAction)
          routerMiddleware.get(`${BASE_URL}/emp/:id`,this.controller.getByIdAction)
          routerMiddleware.get(`${BASE_URL}/dept`,this.controller.getdeptAction)
          routerMiddleware.post(`${BASE_URL}/emp`,this.controller.postempAction)
          routerMiddleware.post(`${BASE_URL}/dept`,this.controller.postdeptAction)
          routerMiddleware.put(`${BASE_URL}/emp/:id`,this.controller.putAction)
          routerMiddleware.delete(`${BASE_URL}/emp/:id`,this.controller.deleteAction)
        return routerMiddleware
    }
}