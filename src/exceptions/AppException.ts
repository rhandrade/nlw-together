interface IAppError{
    message : string;
    status ?: number;
}

class AppException extends Error{

    status: number;

    constructor({ message, status } : IAppError){

        super(message);
        
        this.name   = 'AppException';
        this.status = status || 400;  
        
    }

}

export { AppException }