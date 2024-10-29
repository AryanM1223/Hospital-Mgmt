const User = require("../models/userModel");
const Item = require("../models/itemModel");
const ErrorHandler = require('../utils/errorHandler');

 exports.addItem = async(req,res) => {
    const User = req.user.id;
    try {
        if(!User.isVerified){
            return res.status(403).json({message:"Not Authorised to list items"})
        }
        const { title, description, price, imageUrl, category } = req.body;
         
        const newItem = await Item.create({
            title,
            description,
            price,
            imageUrl, 
            isAvailable:true,
            category
          });
          
          res.status(201).json({
            success: true,
            data: newItem
          });
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
    }
   
}


exports.getItemDetails = async (req, res, next) => {
    try {
      const itemId = req.params.id;
      const item = await Item.findByPk(itemId);
  
      if (!item) {
        return next(new ErrorHandler('Item not found', 404));
      }
  
      res.status(200).json({
        success: true,
        data: item
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  };

  exports.getAllItems = async (req, res, next) => {
    try {
      const items = await Item.findAll({
        where: { isAvailable: true } 
      });
  
      res.status(200).json({
        success: true,
        data: items
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  };

  
exports.updateItemStatus = async (req, res, next) => {
    try {
    
      const itemId = req.params.id;
  
      const item = await Item.findByPk(itemId);
  
      if (!item) {
        return next(new ErrorHandler('Item not found', 404));
      }
  
     
      if (item.userId !== req.user.id) {
        return next(new ErrorHandler('Unauthorized action', 403));
      }
  
      item.isAvailable = isAvailable;
      await item.save();
  
      res.status(200).json({
        success: true,
        message: `Item status updated to ${isAvailable}`
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  };
  
  
exports.deleteItem = async (req, res, next) => {
    try {
      const itemId = req.params.id;
      const item = await Item.findByPk(itemId);
  
      if (!item) {
        return next(new ErrorHandler('Item not found', 404));
      }
  
      
      if (item.userId !== req.user.id) {
        return next(new ErrorHandler('Unauthorized action', 403));
      }
  
      await item.destroy();
  
      res.status(200).json({
        success: true,
        message: 'Item deleted successfully'
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  };
