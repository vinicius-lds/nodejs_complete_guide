import { NextFunction, Request, Response } from 'express';
import { FileUtils } from './../util/file-utils';
import { handleInternalServerError } from './internal-server-error-middleware';

export const handleUnauthorizedResource = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'GET') {
    res.status(401).json({ message: `Unauthorized to view resource '${req.path || ''}'` });
  } else if (req.method === 'POST') {
    deleteUploadedFile(req);
    res.status(401).json({ message: `Unauthorized to create resource`, rosource: req.body });
  } else if (req.method === 'PUT') {
    deleteUploadedFile(req);
    res.status(401).json({ message: `Unauthorized to replace resource ${req.path || ''}`, rosource: req.body });
  } else if (req.method === 'PATCH') {
    deleteUploadedFile(req);
    res.status(401).json({ message: `Unauthorized to update resource ${req.path || ''}`, rosource: req.body });
  } else if (req.method === 'DELETE') {
    deleteUploadedFile(req);
    res.status(401).json({ message: `Unauthorized to delete resource '${req.path || ''}'` });
  } else {
    handleInternalServerError(new Error('Unauthorized resource error'), req, res, next);
  }
};

const deleteUploadedFile = (req: Request) => {
  if (req.file) {
    FileUtils.delete(req.file.path).catch(console.error);
  }
};
