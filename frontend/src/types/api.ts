export interface apiResponse <T>{
    statuscode: number;
    message: String;
    data: T;
    success: boolean;
}