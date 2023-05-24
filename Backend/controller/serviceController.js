const  ServiceModel = require('../models/serviceModel')
const catchAsync = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const serviceModel = require('../models/serviceModel');

const createService = catchAsync(async (req,res,next)=>{
    if(!req.isServiceProvider) return next(new ErrorHandler("only Service Provider can create a service",403))

const newService = new ServiceModel({
    userId:req.user._id,
    ...req.body
})

    const savedService = await newService.save()

    res.status(201).json(savedService)
} )
const deleteService = catchAsync(async (req,res,next)=>{
    const service = await ServiceModel.findById(req.params.id)
    console.log("service.userId: " +typeof(service.userId))
    console.log("req.name: " +typeof(req.user._id))
    if(service.userId !== req.user._id){
        return next(new ErrorHandler("you can delete only your service",403))
    }

    await serviceModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
        msg:"service has been deleted"
    })
} )
const getService = catchAsync(async (req,res,next)=>{
    
} )
const getAllServices = catchAsync(async (req,res,next)=>{
    
} )


module.exports = {
    createService,
    deleteService,
    getService,
    getAllServices
}
