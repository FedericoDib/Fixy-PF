import { combineReducers } from 'redux';
import generalReducer from './generalReducer';
import clientReducer from './clientReducer';
import professionalReducer from './professionalReducer';

const rootReducer = combineReducers({
	clientReducer: clientReducer,
	generalReducer: generalReducer,
	professionalReducer: professionalReducer,
});

export default rootReducer;
