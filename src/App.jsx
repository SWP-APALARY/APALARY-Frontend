import { useEffect, useState } from 'react';

import { redirect, useLocation } from 'react-router-dom';

import './App.css';
import LayoutEveryone from './components/Layout/LayoutEveryone';
import LayoutManager from './components/Layout/LayoutManager';
import AppRoutes from './routes';
import usePersistedState from './utils/LocalStorage/usePersistedState';
import LocalStorageUtils from './utils/LocalStorage/utils';

import ErrorBoundary from 'antd/es/alert/ErrorBoundary';

function App() {
	const [role, setRole] = usePersistedState('role');
	const location = useLocation();
	const [Layout, setLayout] = useState('LayoutEveryone');
	useEffect(() => {
		setRole(LocalStorageUtils.getItem('role'));
	}, [location.pathname]);
	useEffect(() => {
		if (role === 'HR_MANAGER' || role === 'HR_EMPLOYEE') {
			setLayout('LayoutManager');
		} else {
			setLayout('LayoutEveryone');
		}
	}, [role]);
	return (
		<ErrorBoundary>
			{Layout === 'LayoutEveryone' ? (
				<LayoutEveryone>
					<AppRoutes />
				</LayoutEveryone>
			) : (
				<LayoutManager>
					<AppRoutes />
				</LayoutManager>
			)}
		</ErrorBoundary>
	);
}

export default App;
