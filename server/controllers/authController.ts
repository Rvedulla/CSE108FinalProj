import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import { config } from '../config';

export class AuthController {
  static async register(req: Request, res: Response) {
    const { username, password } = req.body;
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
      stmt.run(username, hashedPassword);
      
      const token = jwt.sign({ username }, config.jwtSecret);
      res.json({ token, user: { username } });
    } catch (error) {
      res.status(400).json({ error: 'Username already exists' });
    }
  }

  static async login(req: Request, res: Response) {
    const { username, password } = req.body;
    
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    const token = jwt.sign({ username }, config.jwtSecret);
    res.json({ token, user: { username } });
  }
}