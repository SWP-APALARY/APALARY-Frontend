import React from 'react';

import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import App from './App';
import themeConfig from './utils/Theme';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ConfigProvider theme={{ ...themeConfig }}>
			<App />
		</ConfigProvider>
	</React.StrictMode>
);
