import { Router } from "express"; 
import express_route_adapter from "../adapters/express-route";
import signup_user_controller_maker from "../factories/users/signup-user-controller";

const user_router = Router()

const signup_user_controller = signup_user_controller_maker()

user_router.post('/signup', express_route_adapter(signup_user_controller))

export default user_router