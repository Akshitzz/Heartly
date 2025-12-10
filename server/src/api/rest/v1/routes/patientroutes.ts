import { Router } from "express";
import { PatientController } from "../controllers/patientcontroller";
import { authMiddleWare } from "@/middleware/auth-middleware";
import { RoleMiddleWares } from "@/middleware/role-middleware";




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
