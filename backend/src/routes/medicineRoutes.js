import express from "express"
import { authorize, protect } from "../middlewares/authMiddleware.js";
import { addMedicines, deleteMedicine, getAllMedicines, getMedicineById, updateMedicine } from "../controllers/medicineController.js";

const router = express.Router();

router.get('/', protect, getAllMedicines);
router.get('/:id', protect, getMedicineById);
router.post('/', protect, authorize("ADMIN"), addMedicines);

router.put('/:id',protect,authorize("ADMIN"), updateMedicine);
router.delete('/:id',protect,authorize("ADMIN"), deleteMedicine);

export default router;