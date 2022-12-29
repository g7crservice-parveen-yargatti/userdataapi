import { Schema, model } from "mongoose";

const employeesSchema = new Schema({
    EmployeeId: String,
    DepartmentId:String,
    EmployeeName: String,
    EmailId:String,
   DOB:String,
   Address:String
})

const EmployeesModel = model('employees', employeesSchema)
export default EmployeesModel