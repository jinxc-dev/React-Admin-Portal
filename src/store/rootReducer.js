import { combineReducers } from 'redux';

import settingsReducer from './settings/settings.reducer';
import requestFormReducer from '../components/NewRequest/reducers/requestFormReducer';
import { reducer as formReducer } from 'redux-form'



export default combineReducers({
    form: formReducer,

    settings: settingsReducer,
    requestFormInfo: requestFormReducer
})