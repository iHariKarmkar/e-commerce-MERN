import express from 'express';
import { addToCart, getUserCart, updateCartItems } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add',authUser, addToCart)
cartRouter.post('/update',authUser, updateCartItems)
cartRouter.get('/get',authUser, getUserCart)



export default cartRouter;