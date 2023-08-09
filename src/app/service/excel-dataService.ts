// data.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _fileContent: any[][] = [];

  get fileContent(): any[][] {
    return this._fileContent;
  }

  set fileContent(value: any[][]) {
    this._fileContent = value;
  }
}
