import { readFile, unlink } from 'fs';
import { basename, dirname, join } from 'path';

export class FileUtils {
  public static getResource(resourceName: string, ...resourcePath: string[]): Promise<any> {
    if (!resourceName.endsWith('.json')) {
      resourceName = `${resourceName}.json`;
    }
    return new Promise((resolve, reject) => {
      readFile(this.buildFilePath('resources', ...resourcePath, resourceName), (err, content) => {
        if (!err) {
          resolve(JSON.parse(content.toString()));
        } else {
          reject(err);
        }
      });
    });
  }

  public static buildFilePath(...levels: string[]): string {
    let r = levels[0];
    levels = levels.slice(1);
    levels.forEach(level => (r = join(r, level)));
    return r;
  }

  public static basename(path: string): string {
    return basename(path);
  }

  public static delete(path: string): Promise<undefined> {
    return new Promise((resolve, reject) => {
      unlink(path, err => {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  }
}

export const ROOT_DIR = join(dirname((process && process.mainModule && process.mainModule.filename) || ''), '../');
export const APP_DIR = join(dirname((process && process.mainModule && process.mainModule.filename) || ''));
export const PUBLIC_DIR = join(ROOT_DIR, 'public');
