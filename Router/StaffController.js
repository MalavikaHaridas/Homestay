import bcrypt from "bcrypt"
import RoomModel from "../Models/RoomSchema.js"
import StaffModel from "../Models/StaffSchema.js"
import UserModel from "../Models/UserSchema.js"

let staffError = false
let notStaff =false
let guestdetailstemp=null
let roomdetails = {}

//staff login...
export const staffloginGet = (req,res)=>{
    res.render('stafflogin')
}

// staff login post..............
export const staffloginPost = (req,res)=>{
    console.log(req.body)
    const {email,password}=req.body
    StaffModel.findOne({Email:email}).lean().exec((err,data)=>{
        if(err)
        {
            
            console.log("err",err);
        }
        else
        {
            console.log("data",data);
            if(data!=null)
            {
                notStaff=false
               
                if(password===data.Password)
                {
                    staffError = false
                    
                    UserModel.find({}).lean().exec((err,guestdetails)=>{
                        if(err)
                        {
                            console.log(err);
                        }
                        console.log("guestdetails",guestdetails)
                        guestdetailstemp=guestdetails
                        res.render('StaffHome',{guestdetails})
                    })
    
                }
                else
                {
                    staffError = true
                    res.redirect('/staff')
                }
            }
            else
            {
                notStaff=true
                res.redirect('/staff')
            }
        }

    })      
}

// adding guest details.........
export const addguestdata = async (req, res) => {
    
    let { Name,Contact_Number,Age,Nationality,ID_Proof,ID_Number,Payment_Method,Payment_ID,Room_No,Guest_Number} = req.body
    const guestdetails = new UserModel({
        Name: Name,
        Contact_Number: Contact_Number,
        Age: Age,
        Nationality: Nationality,
        ID_Proof: ID_Proof,
        ID_Number: ID_Number,
        Payment_Method: Payment_Method,
        Payment_ID : Payment_ID,
        Room_No : Room_No,
        Guest_Number : Guest_Number
    })
    await guestdetails.save()
    console.log(guestdetails)
    UserModel.find({}).lean().exec((err,guestdetails)=>{
        if(err)
        {
            console.log(err);
        }
        console.log("guestdetails",guestdetails)
        res.render('StaffHome',{guestdetails})
    })
}


//staff home guest form..........
export const guestform = (req,res)=>{
    res.render("addguestform")
  }


//guest details on staff home...........
export const guestdetails=(req,res)=>{
    console.log("guestdetails..................")
    UserModel.find({}).lean().exec((err,guestdetails)=>{
        if(err)
        {
            console.log(err);
        }
        console.log("guestdetails",guestdetails)
        res.render('StaffHome',{guestdetails})
    }) 
}


export const roomdata = (req, res) => {
    RoomModel.find({}).lean().exec((err, roomdetails) => {
        if(err)
        {
            console.log(err);
        }
        console.log("roomdetails", roomdetails)
        res.render('StaffRoom', {roomdetails})
    })
}


// export const staffHomeGet =(req,res)=>{
//     res.render('staffHome')
// }


