import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { upload} from '../middelwares/multer.middleware.js'
import { verifyJWT } from "../middelwares/auth.middleware.js";

const router = Router();
router.route('/register').post(
    upload.fields([
        {
        name:"avatar",
        maxCount:1 
        },
        {
        name:"CoverImage",
        maxCount:1
        }
    ]),
    registerUser);

   router.route('/login').post(loginUser) 
   //protected route
   router.route('/logout').post(verifyJWT, loginUser) 

export default router;