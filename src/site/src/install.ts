import { init_database_setup } from './mod_install/database';
import { init_admin_setup } from './mod_install/admin';
import { init_storage_setup } from './mod_install/storage';

export class InstallServer {
    constructor (step: string) {
        switch (step) {
        case 'database':
            init_database_setup ();
            break;
        case 'admin':
            init_admin_setup ();
            break;
        case 'storage':
            init_storage_setup ();
            break;
        }
    }
}
