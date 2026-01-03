import { Router } from "express";
import { DoctorController } from "../controllers/doctorcontroller.js";
import { validateRequest } from "../../../../middleware/validation-middleware.js";
import { authMiddleWare } from "../../../../middleware/auth-middleware.js";
import { RoleMiddleWares } from "../../../../middleware/role-middleware.js";
import { doctorValidator } from "../../../../validators/doctor.validator.js";

const router = Router();

const doctorcontroller = new DoctorController();

router.get('/', doctorcontroller.searchDoctors);
router.get('/:id', doctorcontroller.getDoctorById);
router.get('/:id/reviews', doctorcontroller.getDoctorReviews);
router.get('/:id/availabity', doctorcontroller.getDoctorAvailability);
router.get('/specialities/list', doctorcontroller.getSpecialities);

// protected routeees

router.use(authMiddleWare);

// Dr profile 
router.get('/profile/me',
    RoleMiddleWares(['doctor']),
    doctorcontroller.getMyProfile
);

router.patch('/profile/me',
    RoleMiddleWares(['doctor']),
    validateRequest(doctorValidator.updateProfile),
    doctorcontroller.updateProfile
);

router.post('/profile/availability',
    RoleMiddleWares(['doctor']),
    validateRequest(doctorValidator.setAvailability),
    doctorcontroller.setAvailability
);

router.get('/profile/schedule',
    RoleMiddleWares(['doctor']),
    doctorcontroller.getMySchedule
);

// Admin routes
router.post('/onboard',
    RoleMiddleWares(['admin']),
    validateRequest(doctorValidator.onboardDoctor),
    doctorcontroller.onboardDoctor
);

router.patch('/:id/verify',
    RoleMiddleWares(['admin']),
    doctorcontroller.verifyDoctor
);

router.patch('/:id/status',
    RoleMiddleWares(['admin']),
    validateRequest(doctorValidator.updateStatus),
    doctorcontroller.updateDoctorStatus
);

export default router;

