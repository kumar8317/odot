// src/middleware/validate.ts
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validate = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Change this line to validate req.body directly
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  };