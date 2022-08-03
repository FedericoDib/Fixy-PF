import React from 'react';
import { useSelector } from 'react-redux';
import RegisteredStack from '../../navigations/ClientStack';
import NotRegisteredStack from '../../navigations/NotRegisteredStack';
import LoginStack from '../../navigations/LoginStack';
import InicialStack from '../../navigations/InicialStack';

const Main = () => {

	return (
		<React.Fragment>
			<InicialStack />
		</React.Fragment>
	);
};

export default Main;
