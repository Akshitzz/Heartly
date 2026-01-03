import { Router } from "express";
import { PatientController } from "../controllers/patientcontroller.js";
import { authMiddleWare } from "../../../../middleware/auth-middleware.js";
import { RoleMiddleWares } from "../../../../middleware/role-middleware.js";




const router = Router();

const patientController = new PatientController();


router.use(authMiddleWare);

router.get('/profile',
    RoleMiddleWares(['patient']),
    patientController.getProfile
);

router.post('/profile',
    RoleMiddleWares(['patient']),
    patientController.updateProfile
);

router.patch('/profile',
    RoleMiddleWares(['patient']),
    patientController.updateProfile
);


router.get("/medical-history",
    RoleMiddleWares(['patient']),
    patientController.getMedicalHistory
);


export default router; 
