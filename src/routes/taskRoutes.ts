import { Router } from 'express';
import { auth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createTaskSchema, updateTaskSchema } from '../schemas/taskSchema';
import * as taskController from '../controllers/taskController';

const router = Router();

router.use(auth); // Protect all task routes

// Specific routes first
router.get('/daily/:date', taskController.getDailyTasks);
router.get('/weekly/:startDate', taskController.getWeeklyTasks);
router.get('/calendar/:month', taskController.getCalendarTasks);

// Generic CRUD routes
router
  .route('/')
  .get(taskController.getTasks)
  .post(validate(createTaskSchema), taskController.createTask);

router
  .route('/:id')
  .get(taskController.getTask)
  .patch(validate(updateTaskSchema), taskController.updateTask)
  .delete(taskController.deleteTask);

export default router;