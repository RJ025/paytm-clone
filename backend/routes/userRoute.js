const express = require('express');
const zod = require('zod');
const router = express.Router();
const {User, Account} = require('../db');
const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken')
const {authMiddleware} = require('../middleware')
const mongoose = require('mongoose')

const signupSchema = zod.object({
    username : zod.string().email() ,
    password : zod.string() ,
    firstname : zod.string() ,
    lastname : zod.string()
});

router.post('/signup' , async (req , res)=>{
    const {success}  = signupSchema.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message : "incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        userName : req.body.username
    })

    if(existingUser) {
        return res.status(411).json({
            message : "user already exists"
        })
    }

    const user = await User.create({
        userName : req.body.username ,
        password : req.body.password ,
        firstName : req.body.firstname ,
        lastName : req.body.lastname
    })
    const userId = user._id;
    console.log(userId);

    await Account.create({
        userId ,
        balance : 1+ Math.floor(Math.random()*1000)
    }) 

    const token = jwt.sign({userId} , JWT_SECRET)

    res.json({
        message : "user created successfully" ,
        token
    })
})

const signinSchema = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

router.post('/signin' , async(req , res)=>{
    const {success} = signinSchema.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message : "invalid inputs"
        })
    }

    const user = await User.findOne({
        userName : req.body.username ,
        password : req.body.password
    });

    const account = await Account.findOne({
        userId : user._id
    })

    if(user) {
        const token = jwt.sign({
            userId : user._id
        } , JWT_SECRET)

        res.json({
            message : `welcome ${user.firstName}` ,
            token ,
            balance : account.balance
        })
        return ;
    }

    res.status(411).json({
        message : "user not found"
    })
})

const updatedSchema = zod.object({
    password : zod.string().optional() ,
    firstName : zod.string().optional() ,
    lastName : zod.string().optional()
})

router.put('/' , authMiddleware , async (req , res)=> {
    const {success} = updatedSchema.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message : "invalid inputs"
        })
    }

    await User.updateOne(req.body , {
        _id : req.userId
    })

    res.status(201).json({
        message : `updated sucessfully`
    })
})

router.get('/bulk' , async (req , res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or : [{
            firstName : {
                "$regex" : filter
            }
        } , {
            lastName : {
                "$regex" : filter
            }
        }]
    })

    res.json({
        user : users.map((user)=>({
            username  : user.userName ,
            firstname : user.firstName ,
            lastname : user.lastName ,
            _id : user._id
        }))
    })
})



module.exports = router;