import { Schema, model } from "mongoose";

const DepartmentSchema = new Schema({
    DepartmentId:String,
    DepartmentName: String,
})

const DepartmentModel = model('department', DepartmentSchema)
export default DepartmentModel