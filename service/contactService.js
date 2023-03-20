const contactModel = require('../models/Contact.js')
const validate = require( 'deep-email-validator')


const create = async(req, res) => {
    try {

        const {firstname,lastname,gender,addressLine1,addressLine2,city,country,zipcode,email,phone} = req.body;

        let resp = await contactModel.find({email : email, phone : phone})
        console.log(resp)
        if(resp.length!=0) {
            return res.status(400).send({success : 0, errorMessage : "Duplicate Entry"})
        }

        if(!firstname || !lastname || !gender || !addressLine1 || !city || !country || !zipcode || !email || !phone) {
            console.log(req.body)
            return res.status(400).send({success : 0, errorMessage : "Please enter all mandatory fields"})
        }
        
        if(!allLetter(firstname) || firstname.length<3) {
            return res.status(400).send({success : 0, errorMessage : "Enter valid firstname"})
        }

        if(!allLetter(lastname) || lastname.length<3) {
            return res.status(400).send({success : 0, errorMessage : "Enter valid lastname"})
        }

        if(!(gender=="MALE" || gender=="FEMALE" || gender=="OTHERS")) {
            return res.status(400).send({success : 0, errorMessage : "Invalid gender"})
        }

        const {valid} = await validate.validate(email);
        if(!valid) {
            return res.status(400).send({success : 0, errorMessage : "Enter valid email id"})
        }

        var isnum = /^\d+$/.test(phone);
        if(!isnum) {
            return res.status(400).send({success : 0, errorMessage : "Enter valid phone number"})
        }

        if(addressLine1.length<8 || zipcode.length>10) {
            return res.status(400).send({success : 0, errorMessage : "Enter valid details"})
        }

        const contact = await contactModel.create({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            gender : req.body.gender,
            addressLine1 : req.body.addressLine1,
            addressLine2 : req.body.addressLine2,
            city : req.body.city,
            country : req.body.country,
            zipcode : req.body.zipcode,
            email : req.body.email,
            phone : req.body.phone});

        return res.status(200).send({success : 1, message : contact})

    } catch(error) {
        console.log(error.message)
        return res.status(500).send({success : 0, errorMessage : "Internal Server Error"})
    }

}

const fetch = async(req,res) => {
    try {
        const contacts = await contactModel.find({});
        return res.status(200).send({success : 1, message : contacts});
    } catch(error) {
        console.log(error.message);
        return res.status(500).send({successs : 0, errorMessage : "Internal Server Error"})
    }
}

const deleteContact = async(req,res) => {
    try {
        const {id} = req.params.id;
        console.log(req.params.id)
        let resp = await contactModel.deleteOne({_id : req.params.id});
        console.log(resp)
        return res.status(200).send({success : 1, errorMessage : "Contact deleted successully"})
    } catch(error) {
        console.log(error.message);
        return res.status(500).send({success : 0, errorMessage : "Internal Server Error"})
    }

}

const fetchContactDetail = async(req,res) => {
    try {
        let resp = await contactModel.findOne({_id : req.params.id})

        if(!resp) {
            return res.status(400).send({success : 0, errorMessage : "No such user exist"})
        }

        return res.status(200).send({success : 1, message : resp})
    } catch(error) {
        console.log(error.message);
        return res.status(500).send({success : 0, errorMessage : "Internal Server Error"})
    }
}

const updateContact = async(req,res) => {
    try {
        
        const {firstname,lastname,gender,addressLine1,addressLine2,city,country,zipcode,email,phone} = req.body;

        if(!firstname || !lastname || !gender || !addressLine1 || !city || !country || !zipcode || !email || !phone) {
            console.log(req.body)
            return res.status(400).send({success : 0, errorMessage : "Please enter all mandatory fields"})
        }
        
        if(!allLetter(firstname) || firstname.length<3) {
            return res.status(400).send({success : 0, errorMessage : "firstname should only contain alphabets"})
        }

        if(!allLetter(lastname) || lastname.length<3) {
            return res.status(400).send({success : 0, errorMessage : "lastname should only contain alphabets"})
        }

        if(!(gender=="MALE" || gender=="FEMALE" || gender=="OTHERS")) {
            return res.status(400).send({success : 0, errorMessage : "Invalid gender"})
        }

        const {valid} = await validate.validate(email);
        if(!valid) {
            return res.status(400).send({success : 0, errorMessage : "Enter valid email id"})
        }

        var isnum = /^\d+$/.test(phone);
        if(!isnum) {
            return res.status(400).send({success : 0, errorMessage : "Enter valid phone number"})
        }

        if(addressLine1.length<8 || zipcode<10) {
            return res.status(400).send({success : 0, errorMessage : "Enter valid details"})
        }

        var filter = {
            _id : req.params.id
        }

        var update = {
            firstname : firstname,
            lastname : lastname,
            gender : gender,
            addressLine1 : addressLine1,
            addressLine2 : addressLine2,
            city : city,
            country : country,
            zipcode : zipcode,
            email : email,
            phone : phone
        }

        var resp = await contactModel.findOneAndUpdate(filter, update)
        console.log(resp)
        return res.status(200).send({success : 1, message : "Contact Edited Successfully"})
    } catch(error) {
        console.log(error.message);
        res.status(500).send({success : 0, errorMessage : "Internal Server Error"})
    }
}
function allLetter(inputtxt) {
    for(let i=0;i<inputtxt.length;i++) {
        let ch = inputtxt[i];
        if(!((ch>='A' && ch<='Z') || (ch>='a' && ch<='z'))) {
            console.log(ch);
            console.log(i);
            return false;
        }
    }
    return true;
}

module.exports = {
    create,
    fetch,
    deleteContact,
    fetchContactDetail,
    updateContact
}