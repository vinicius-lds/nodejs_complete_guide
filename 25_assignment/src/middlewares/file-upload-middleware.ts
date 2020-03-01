import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { join } from 'path';
import * as uuid from 'uuid';
import { PUBLIC_DIR } from './../util/file-utils';

export class FileUploadOptions {
  private _destination?: string;
  private _imageExtensionLimiter?: ExtensionLimiter;

  constructor() {
    this._imageExtensionLimiter = new ExtensionLimiter();
    this._destination = `${PUBLIC_DIR}/uploads`;
  }

  get destination(): string | undefined {
    return this._destination;
  }

  set destination(value: string | undefined) {
    if (value && value.startsWith(PUBLIC_DIR)) {
      this._destination = value;
    } else {
      this._destination = !value ? value : join(PUBLIC_DIR, value);
    }
  }

  get imageExtensionLimiter(): ExtensionLimiter | undefined {
    return this._imageExtensionLimiter;
  }

  set imageExtensionLimiter(value: ExtensionLimiter | undefined) {
    this._imageExtensionLimiter = value;
  }
}

export class ExtensionLimiter {
  private _accept: string[];
  private _reject: string[];

  constructor() {
    this._accept = [];
    this._reject = [];
  }

  public hasValues(): boolean {
    return !!this._accept.length || !!this._reject.length;
  }

  get accept(): string[] | undefined {
    return [...this._accept];
  }

  set accept(value: string[] | undefined) {
    this._accept = value || [];
  }

  get reject(): string[] | undefined {
    return [...this._reject];
  }

  set reject(value: string[] | undefined) {
    this._reject = value || [];
  }
}

export const handleFileUpload = (fieldName: string, options?: FileUploadOptions) => {
  if (!options) {
    options = new FileUploadOptions();
  }
  const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      cb(null, (options && options.destination) || '');
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      cb(null, `${uuid.v4()}_${file.originalname}`);
    }
  });
  let fileFilter;
  if (options.imageExtensionLimiter && options.imageExtensionLimiter.hasValues()) {
    fileFilter = filterImageExtensions(
      (options.imageExtensionLimiter && options.imageExtensionLimiter.accept) || [],
      (options.imageExtensionLimiter && options.imageExtensionLimiter.reject) || []
    );
  }
  return multer({ storage: storage, fileFilter: fileFilter }).single(fieldName);
};

const filterImageExtensions = (accept: string[], reject: string[]) => {
  if (accept.length) {
    const accptedMimetypes = accept.map(v => `image/${v}`);
    return (req: Request, file: Express.Multer.File, callback: FileFilterCallback): void => callback(null, accptedMimetypes.includes(file.mimetype));
  } else {
    const rejectedMimetypes = reject.map(v => `image/${v}`);
    return (req: Request, file: Express.Multer.File, callback: FileFilterCallback): void =>
      callback(null, !rejectedMimetypes.includes(file.mimetype));
  }
};
