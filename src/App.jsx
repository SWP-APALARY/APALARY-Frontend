import './App.css';
import AppRoutes from './routes';

import ErrorBoundary from 'antd/es/alert/ErrorBoundary';

function App() {
	return (
		<ErrorBoundary>
			<AppRoutes />
		</ErrorBoundary>
	);
}

export default App;
