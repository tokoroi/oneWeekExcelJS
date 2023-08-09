// excel-inputService.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class InputDataService {

    private _maruCount: number = 0;

    set maruCount(value: number) {
        this._maruCount = value;
    }

    get maruCount(): number {
        return this._maruCount;
    }

    private _daiMaruCount: number = 0;

    set daiMaruCount(value: number) {
        this._daiMaruCount = value;
    }

    get daiMaruCount(): number {
        return this._daiMaruCount;
    }

    private _batsuCount: number = 0;

    set batsuCount(value: number) {
        this._batsuCount = value;
    }

    get batsuCount(): number {
        return this._batsuCount;
    }

}
