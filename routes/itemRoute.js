const express = require('express');
const router = express.Router();
const {addItem, getItemDetails, getAllItems, updateItemStatus, deleteItem} = require('../controllers/ItemController');

router.post("/add-item",addItem);
router.get("/get-item-details",getItemDetails);
router.get("/get-all-items",getAllItems);
router.put("/update-item-status",updateItemStatus);
router.delete("delete-item",deleteItem);



module.exports = router;