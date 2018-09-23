//import store from '../store';
import {getUserData} from '~/commons/actions/user';

const loadInitialData = store => {
    getUserData()(store.dispatch);
}

export default loadInitialData;