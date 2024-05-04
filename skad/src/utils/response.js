class Response{
    Success(res,message,data=null,next){
        let status = 200;
        //STATUS_CODE.HTTP_OK;
        return res.status(status).json({
            status,
            message,
            data,
        });
    }
    Error(res,message,data=null,next){
        let status = 400;
        //STATUS_CODE.HTTP_BAD_REQUEST;
        return res.status(status).json({
            status,
            message,
            data,
        });
    }
    Catch(res,message,data=null,next){
        let status = 500;
        //STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR;
        message = "INTERNAL SERVER ERROR";
        return res.status(status).json({
            status,
            message,
            data,
        });
    }
    Forbidden(res,message,data=null,next){
        let status = 403;
        message='Unauthorized User!!';
        return res.status(status).json({
            status,
            message,
            data,
        });
    }
}

module.exports = new Response();