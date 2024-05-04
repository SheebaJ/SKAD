
const Response = require('../utils/response')
const userModel = require('../models/users.model');
const { default: mongoose } = require('mongoose');
class userController {
    registerUser = async (req, res) => {
        const { name, email, phone, password, role } = req.body;
        try {
            const user = new userModel({ name, email, phone, password, role });
            let saveRes = await user.save();
            console.log(saveRes)
            Response.Success(res, "User saved!", [])
        } catch (err) {
            Response.Error(res, "Unable to save user", err)
        }
    }
    getUserDetails = async (data) => {
        try {
            console.log("Fetching user details...");
            let userId = "";
            let searchQuery = {};
            let project = {
                "_id": 1,
                "name": 1,
                "email": 1,
                "phone": 1,
                "role": 1,
                "isActive": 1,
            };
            console.log('data',data)
            if (data) {
                if (data.email) {
                    userId = data.email;
                }
                else if (data.regEmail || data.regPhone) {
                    userId = data.regEmail || data.regPhone;
                    searchQuery = {
                        $or: [{ email: userId }, { phone: userId }],
                    };
                }
                else if (data.userId) {
                    userId = data.userId;
                    searchQuery = {
                        $or: [{ email: userId }, { phone: userId }],
                        isActive: 0
                    };
                    project.password = 1;
                }
            }
            let users = [];
            if (userId) {
                users = await userModel.findOne(searchQuery, project);
            }
            if (data.role && data.role == 1) {
                const adminUser = await userModel.findOne({ email: userId }, project);
                const regularUsers = await userModel.find({ role: 2 }, project);
                users = adminUser ? [adminUser, ...regularUsers] : regularUsers;
            }
            console.log("Users:", users);
            return users;
        } catch (err) {
            return Response.Error(res, "Error fetching user details:", err);
        }
    }
    userLogin = async (req, res) => {
        try {
            console.log("loggedIn!!");
            let email = req.body.user.email;
            await userModel.updateOne(
                { email: email },
                { $push: { loginDetails: { loggedAt: new Date() } } }
            );
            return Response.Success(res, "Login Successfull!!");
        } catch (err) {
            console.log(err)
            return Response.Error(res, "Login Failed!!");
        }
    }
    getUserData = async (req, res) => {
        try {
            console.log("Getting user Details!!");
            let resp = await this.getUserDetails(req.user);
            return Response.Success(res, "Data Fetched Successfully!!", resp);

        } catch (err) {
            return Response.Error(res, "Data Not Found!!", [])
        }
    }
    updateUser = async (req, res) => {
        try {
            console.log("update user Details!!", req.user);
            const id = req.params.id;
            const updates = req.body;
            if (req.user.role === 1) {
                const user = await userModel.findByIdAndUpdate(id, updates, { new: true });
                Response.Success(res, "Your changes have been saved!!", updates)
            } else {
                return Response.Forbidden(res, "err")
            }
        } catch (err) {
            console.log(err)
            return Response.Error(res, "Failed to update!!", [])
        }
    }
    userLogout = async (req, res) => {
        try {
            res.clearCookie('SessionID');
            Response.Success(res, 'Logged out successfully!!')
        } catch (err) {
            Response.Error(res, "Logged out failed!!", err)
        }
    }

}
module.exports = new userController();