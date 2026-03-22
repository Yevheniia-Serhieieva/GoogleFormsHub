import { randomUUID } from 'node:crypto';
import { Form, Response } from '@shared/types';

export const forms = new Map<string, Form>();
export const responses = new Map<string, Response[]>();

export const generateId = () => randomUUID();
