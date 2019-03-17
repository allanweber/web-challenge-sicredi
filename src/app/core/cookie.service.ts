import { Injectable } from '@angular/core';

@Injectable()
export class CookiesService {

    constructor() {}

    public deleteCookie(name) {
        this.setCookie(name, '', -1);
    }



    public getCookie(name: string) {
        const ca: Array<string> = document.cookie.split(';');
        const caLen: number = ca.length;
        const cookieName = `${name}=`;
        let c: string;

        for (let i  = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) === 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    }

    public setCookie(name: string, value: string, expireMinutes: number) {
        const d: Date = new Date();
        d.setTime(d.getTime() + expireMinutes * 60 * 1000);
        console.log(d);
        const expires = `expires=${d.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}`;
    }
}
