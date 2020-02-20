import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import OrderController from './app/controllers/OrderController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveredController from './app/controllers/DeliveredController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

const routes = new Router();
const upload = multer(multerConfig);

// Log in Route
routes.post('/session', SessionController.store);
// Deliveryman
routes.get('/deliveryman/:id', DeliveryController.index);
routes.get('/deliveryman/:id/deliveries', DeliveredController.index);
routes.put('/deliveryman/:deliveryId/:orderId', DeliveryController.update);
// Delivery problems
routes.post('/delivery/problems', DeliveryProblemController.store);
// Apply token middleware
routes.use(authMiddleware);

// User routes
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
// Recipients routes
routes.get('/recipients', RecipientController.index);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);
// Delivery
routes.get('/couriers', DeliverymanController.index);
routes.post('/couriers', DeliverymanController.store);
routes.put('/couriers/:deliveryId', DeliverymanController.update);
routes.delete('/couriers/:deliveryId', DeliverymanController.delete);
// Order
routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);
// Problems
routes.get('/delivery/problems', DeliveryProblemController.index);
routes.delete(
  '/problem/:problemId/cancel-delivery',
  DeliveryProblemController.delete
);
// File upload
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
