import { Provider } from 'react-redux';
import {changeRoute} from 'lib/common/actions';


export function showLogin(){
    return changeRoute('login');
}
