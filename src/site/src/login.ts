import { login_setup } from './mod_login/login';

export class Login {
    constructor (step: string) {
        switch (step) {
        case 'login':
            login_setup ();
            break;
        }
    }
}
