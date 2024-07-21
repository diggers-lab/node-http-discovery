import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync, appendFileSync, Dirent } from 'fs';
import { appendFile } from 'fs/promises';
import { join } from 'path';
import * as fs from 'fs';
@Injectable()
export class FilehandlerService {
  constructor() {}

  saveJsonFile(path: string, data: any) {
    const dataString = JSON.stringify(data);
    writeFileSync(path, dataString);
  }

}
