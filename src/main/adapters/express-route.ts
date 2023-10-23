import {Request, Response} from 'express' 
import Controller from '../../presentation/contracts/controller'

export default function express_route_adapter(controller: Controller){

    return async (req: Request, res: Response) => {
        const http_response = await controller.handle({
            body: req.body, 
            params: req.params})
        res.status(http_response.status_code).json(http_response.data)
    }
}