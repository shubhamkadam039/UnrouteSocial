import Users from "../models/User.js"
import fs from "fs"
import imagekit from "../configs/imagekit.js";

// Get User data using userId
export const getUserData = async (req, res) => {
    try {
        const { userId } = req.auth()
        const user = await Users.findById(userId)
        if(!user){
            return res.json({success: false, message: "User not found"})
        }
        res.json({success: true, user})
    } catch (error) {
      console.log(error);
      res.json({success: false, message: error.message})
        
    }
}



// Update User data
export const updateUserData = async (req, res) => {
    try {
        const { userId } = req.auth()
        console.log("Userid: ", userId)
        let {username, bio, location, full_name} = req.body;

        const tempUser = await Users.findById(userId)

     if (!tempUser) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

        // If username is empty, keep existing username
        !username && (username = tempUser.username)

        // Ensure new username is unique
        if(tempUser.username !== username){
            const user = await Users.findOne({username})
            if(user){
                //we will not change the username if it is already taken; keep old username
                username = tempUser.username
            }
        }

        const updatedData = {
            username,
            bio,
            location,
            full_name
        }

        // Safe checks for multer files
        const profile = req.files.profile && req.files.profile[0]
        const cover = req.files.cover && req.files.cover[0]

        // Upload profile picture if provided
        if(profile){
            const buffer = fs.readFileSync(profile.path)

            const response = await imagekit.upload({
                file: buffer,
                fileName: profile.originalname,
            })

            const url = imagekit.url({
                path: response.filePath,
                transformation: [
                    {quality: 'auto'},
                    {format: 'webp'},
                    {width: '512'}
                ]
            })
            updatedData.profile_picture = url;
        }

        // Upload cover photo if provided
        if(cover){
            const buffer = fs.readFileSync(cover.path)
            const response = await imagekit.upload({
                file: buffer,
                fileName: cover.originalname,
            })

            const url = imagekit.url({
                path: response.filePath,
                transformation: [
                    {quality: 'auto'},
                    {format: 'webp'},
                    {width: '1280'}
                ]
            })
            updatedData.cover_photo = url;
        }

        // Update the user
        const user = await Users.findByIdAndUpdate(userId, updatedData, {new: true})

        res.json({success: true, user, message: 'Profile updated successfully'})

    } catch (error) {
      console.log(error);
      res.json({success: false, message: error.message})
        
    }
}



// Find Users using username, email, location, name

export const discoverUsers = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { input } = req.body;

        const allUsers = await Users.find(
            {
                $or: [
                    {username: new RegExp(input, 'i')},
                    {email: new RegExp(input, 'i')},
                    {full_name: new RegExp(input, 'i')},
                    {location: new RegExp(input, 'i')},
                ]
            }
        )
        const filteredUsers = allUsers.filter(user=> user._id !== userId);

        res.json({success: true, users: filteredUsers})
       
    } catch (error) {
      console.log(error);
      res.json({success: false, message: error.message})
        
    }
}



// To Follow User

export const followUser = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { input } = req.body;

        const user = await Users.findById(userId)

        if(user.following.includes(id)){
            return res.json({ success: false, message: 'You are already following this user'})
        }

        user.following.push(id);
        await user.save()

        const toUser = await Users.findById(id)
        toUser.followers.push(userId)
        await toUser.save()

        res.json({success: true, message: 'Now you are following this user'})
        
       
    } catch (error) {
      console.log(error);
      res.json({success: false, message: error.message})
        
    }
}



//  To Unfollow User

export const unfollowUser = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { input } = req.body;

        const user = await Users.findById(userId)

        user.following = user.following.filter(user=> user !== id);
        await user.save()

        const toUser = await Users.findById(id)
        user.followers = toUser.followers.filter(user=> user !== id);
        await toUser.save()
        

        res.json({success: true, message: 'You are no longer following this user'})
        
       
    } catch (error) {
      console.log(error);
      res.json({success: false, message: error.message})
        
    }
}



