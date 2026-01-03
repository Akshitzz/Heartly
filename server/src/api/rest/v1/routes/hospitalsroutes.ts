import { Router } from 'express';
import { HospitalController } from '../controllers/hospitalcontroller.js';
import { validateRequest } from '../../../../middleware/validation-middleware.js';
import { hospitalValidator } from '../../../../validators/hospital.validator.js';
import { authMiddleWare } from '../../../../middleware/auth-middleware.js';
import { RoleMiddleWares } from '../../../../middleware/role-middleware.js';
const router = Router();
const hospitalController = new HospitalController();

// Public routes
router.get('/', hospitalController.searchHospitals);
router.get('/:id', hospitalController.getHospitalById);
router.get('/:id/doctors', hospitalController.getHospitalsDoctors);
router.get('/:id/departments', hospitalController.getHospitalDepartments);

// Protected routes
router.use(authMiddleWare);

// Admin routes
router.post('/',
  RoleMiddleWares(['admin']),
  validateRequest(hospitalValidator.create),
  hospitalController.createHospital
);

router.patch('/:id',
  RoleMiddleWares(['admin']),
  validateRequest(hospitalValidator.update),
  hospitalController.updateHospital
);

router.delete('/:id',
  RoleMiddleWares(['admin']),
  hospitalController.deleteHospital
);

router.post('/:id/doctors/:doctorId',
  RoleMiddleWares(['admin']),
  hospitalController.addDoctor
);

router.delete('/:id/doctors/:doctorId',
  RoleMiddleWares(['admin']),
  hospitalController.removeDoctor
);

export default router;