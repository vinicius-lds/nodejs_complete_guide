import { ExtensionLimiter, FileUploadOptions } from '../middlewares/file-upload-middleware';

export const defaultImageUploadOptions = new FileUploadOptions();
defaultImageUploadOptions.destination = 'image';
defaultImageUploadOptions.imageExtensionLimiter = new ExtensionLimiter();
defaultImageUploadOptions.imageExtensionLimiter.accept = ['jpg', 'jpeg', 'png'];
