const Joi = require("joi");
const Response = require('../utils/response')

class userValidator {
    
    registerUserValidation(req, res, next) {
        const userJoi = Joi.defaults((schema) =>
            schema.options({
                allowUnknown: true,
            }),
        )

        const schema = userJoi.object().keys({
            name: Joi.string().required().label('Name'),
            email: Joi.string().email().required().label('Email'),
            phone: Joi.string().pattern(new RegExp('^[0-9+]{7,15}$')).required().label('Phone'),
            password: Joi.string().required().label('Password'),
            role: Joi.number().valid(1, 2).required().label('Role')
        });

        try {
            const { error } = schema.validate(req.body);
            if (error) {
                let message = error && error.details[0].message.replace(/"/g, "'");
                return Response.Error(res, message);
            }
            return next();
        } catch (err) {
            return Response.Error(res, err);
        }

    }

    loginuserValidation(req,res,next){
        const userLoginJoi = Joi.defaults((schema) =>
            schema.options({
                allowUnknown: true,
            }),
        )
        
        const schema = userLoginJoi.object({
            userId: Joi.alternatives().try(
                Joi.string().email().label('Email'),
                Joi.string().pattern(new RegExp('^[0-9+]{7,15}$')).label('Phone')
            ).required().messages({
                'alternatives.match': 'user must be a valid email or phone number.'
            }),
            password: Joi.string().required().label('Password')
        });

        try {
            const { error } = schema.validate(req.body);
            if (error) {
                let message = error && error.details[0].message.replace(/"/g, "'");
                return Response.Error(res, message);
            }
            return next();
        } catch (err) {
            return Response.Error(res, err);
        }
    }

    userUpdateValidation(req, res, next) {
        try {
            const allowedKeys = ['name', 'email', 'phone', 'password']; 
            const requestBody = {};
            Object.keys(req.body).forEach(key => {
                if (allowedKeys.includes(key)) {
                    requestBody[key] = req.body[key];
                }
            });
            let isLen = Object.keys(req.body).length === Object.keys(requestBody).length
            if(!isLen)
            {
                return Response.Error(res,"Invalid Fields!!",[])
            }
                
            const schema = Joi.object({
                name: Joi.string().label('Name'),
                email: Joi.string().email().label('Email'),
                phone: Joi.string().pattern(new RegExp('^[0-9+]{7,15}$')).label('Phone'),
                password: Joi.string().label('Password'),
            }).min(1).unknown(false).label('Invalid Key');
    
            const { error, value } = schema.validate(requestBody, { stripUnknown: true });
                if (error) {
                let message = error.details[0].message.replace(/"/g, "'");
                return Response.Error(res, message);
            }
            req.body = requestBody
             return next();
        } catch (err) {
            // Handle any unexpected errors
            return Response.Error(res, err);
        }
    }
    
}

module.exports = new userValidator();