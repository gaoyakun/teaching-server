import { init_database_setup } from './mod_install/database';
import { init_admin_setup } from './mod_install/admin';

export class InstallServer {
    constructor (step: string) {
        switch (step) {
        case 'database':
            init_database_setup ();
            break;
        case 'admin':
            init_admin_setup ();
            break;
        }
    }
}
