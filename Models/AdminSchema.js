import mongoose from "mongoose"
const schema1 = mongoose.Schema
const admin_schema = new schema1({
    Name : String,
    Email : String,
    password : String,
    Homestay : String,
    Address : String,
    Rooms : Number
})
const AdminModel = mongoose.model("Admin",admin_schema)
export default AdminModel