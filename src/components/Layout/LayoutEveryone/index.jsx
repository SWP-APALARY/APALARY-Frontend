import { useEffect, useState } from 'react';

import { Card, Layout, Menu } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { Outlet, useNavigate } from 'react-router-dom';

import Logo from '../../../assets';
import StyledHeader from '../Header';
import { managerItems } from '../ManagerItems';
import { layoutContent, layoutHeader, menuLogo } from '../style';

import Sider from 'antd/es/layout/Sider';

const LayoutEveryone = () => {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Layout
				className='site-layout'
				style={{
					height: '100vh',
				}}
			>
				<StyledHeader style={layoutHeader} isDashBoard />
				<Content>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default LayoutEveryone;
