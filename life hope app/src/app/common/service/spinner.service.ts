import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class SpinnerService {
    public showSpinner = new Subject<boolean>();
    public response = new Subject<any>();
    public disableTimerSpinner: boolean;

    constructor() { }

    onRequestShowSpinner() {
        if (this.disableTimerSpinner) {
            this.disableTimerSpinner = false;
            return;
        }
        this.showSpinner.next(true);
    }
    onResponseHideSpinner() {

        this.showSpinner.next(false);
    }

    setResponseMessage(msg) {
        this.response.next(msg);
    }

    getResponseMessage() {
        return this.response.asObservable();
    }

}