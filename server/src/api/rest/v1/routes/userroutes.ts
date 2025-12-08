import {Router} from 'express';
import { UserController } from '../controllers/usercontroller';
import { authMiddleWare } from '@/middleware/auth-middleware';
import { RoleMiddleWares } from '@/middleware/role-middleware';

const router = Router();


const usercontroller = new UserController();


router.use(authMiddleWare);

//  update profile apis 


router.get("/profile",usercontroller.getProfile);

router.get("/profile",usercontroller.updateProfile);



// admin only 


router.get("/",
RoleMiddleWares(['admin']),
usercontroller.getAllUser    
)
router.get("/:id",
RoleMiddleWares(['admin']),
usercontroller.getUserById    
)
router.patch("/:id/status",
RoleMiddleWares(['admin']),
usercontroller.updateUserStatus    
)


export default router;