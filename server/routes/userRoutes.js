import express from 'express';
import { getUserData } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';
import { discoverUsers, followUser, unfollowUser, updateUserData } from '../controllers/userController.js'
import { upload } from '../configs/multer.js';

const userRouter = express.Router();

// api endpoints (functions from controller file)
userRouter.get('/data', protect, getUserData)
userRouter.post('/update', upload.fields([{name: 'profile', maxCount: 1}, {name: 'cover', maxCount: 1} ]), protect, updateUserData)
userRouter.post('/discover', protect, discoverUsers)
userRouter.post('/follow', protect, followUser)
userRouter.post('/unfollow', protect, unfollowUser)

export default userRouter