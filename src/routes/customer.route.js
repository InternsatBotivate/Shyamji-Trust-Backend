import { Router } from 'express';
import { submitCustomer } from '../controllers/customer.controller.js';

const router = Router();

router.post('/', submitCustomer);

export default router;
