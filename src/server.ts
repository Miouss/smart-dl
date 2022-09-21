import appExpress from "./express";

export default function startServer(){
    return appExpress.listen(8000);
}