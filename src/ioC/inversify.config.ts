import {Container} from "inversify";
import { EmployeeDataBoContract } from "../bo/employee-bo-contract";

import { EmployeeDataControllerContract } from "../controller/employee-controller.contract";
import { EmployeeDataController } from "../controller/employee-controller";
import { EmployeeData } from "../models/employee.model";
import { EmployeesMongoBo } from "../bo/employee-mongo-bo";
import { DepartmentData } from "../models/department.model";
import diTokens from "../constants/di-tokens";




const diContainer=new Container()


diContainer.bind<EmployeeDataBoContract<EmployeeData|DepartmentData>>(diTokens.EMPLOYEEDATA_BO_TOKEN).to(EmployeesMongoBo)

diContainer.bind<EmployeeDataControllerContract>(diTokens.EMPLOYEEDATA_CONTROLLER_TOKEN).to(EmployeeDataController)

export default diContainer

