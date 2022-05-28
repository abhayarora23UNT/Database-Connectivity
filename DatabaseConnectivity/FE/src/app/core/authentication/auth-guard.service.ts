import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Messages } from '../messages/messages';

@Injectable({
    providedIn: 'root'
})
export class NavigationGuard implements CanDeactivate<any> {

    constructor() { }
    canDeactivate(component: any): Promise<boolean> | boolean {
        return true;
    }

}
