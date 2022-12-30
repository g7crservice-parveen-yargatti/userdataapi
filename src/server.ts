import express ,{json}from "express";
import cors from "cors";
import {config} from "dotenv";
import { AppRoutes } from "./routes/approutes";
import diContainer from "./ioC/inversify.config";

import connectToDb from "./db/db";
import { EmployeeDataControllerContract } from "./controller/employee-controller.contract";
import mongoose from "mongoose";
import diTokens from "./constants/di-tokens";



config();

const PORT=process.env.PORT || 3000
const BASE_URL=process.env.BASE_URL || "/employeedata"

const MONGODB_CONSTR = process.env.MONGODB_CONSTR || 'mongodb://127.0.0.1:27017'
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'employeedatadb'

const app =express();
app.use(cors({origin:'*',methods:'*',allowedHeaders:'*'}))
app.use(json())
//app.use(mongoose.set({'strictQuery',true}))

const controllerObj=diContainer.get<EmployeeDataControllerContract>(diTokens.EMPLOYEEDATA_CONTROLLER_TOKEN)
const appRoutes= new AppRoutes(controllerObj)
app.use(appRoutes.registerRoutes()) 

app.listen(
    PORT,
    ()=>{
        connectToDb('mongodb+srv://parveen:p123@cluster0.y4cwgqx.mongodb.net/employeedatadb?retryWrites=true&w=majority')
        console.log(`employee server is running at http://localhost:${PORT}${BASE_URL}`);
})
