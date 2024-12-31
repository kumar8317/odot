import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  dueDate: z.string().transform((str) => new Date(str)),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  type: z.enum(['daily', 'weekly', 'general']),
  tags: z.array(z.string()).optional(),
});

export const updateTaskSchema = createTaskSchema.partial().extend({
  status: z.enum(['pending', 'completed', 'in-progress']).optional(),
});