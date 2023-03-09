import { useEffect, useState } from 'react';

import { Button, Card, Carousel, Layout, Menu } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { Outlet, useNavigate } from 'react-router-dom';

import Logo from '../../../assets';
import Box from '../../Box';
import StyledHeader from '../Header';
import { managerItems } from '../ManagerItems';
import { layoutContent, layoutHeader, menuLogo } from '../style';

import Sider from 'antd/es/layout/Sider';

const LayoutManager = () => {
	const [link, setLink] = useState('/dashboard');
	const navigate = useNavigate();
	useEffect(() => {
		navigate(link);
	}, [link]);
	return (
		<Layout>
			<Sider>
				<Box style={menuLogo} onClick={() => navigate('/')}>
					<img src={Logo} alt='logo' />
				</Box>
				<Menu
					theme='dark'
					defaultSelectedKeys={['/dashboard']}
					onClick={(item) => setLink(item.key)}
					mode='inline'
					items={managerItems}
				></Menu>
			</Sider>
			<Layout
				className='site-layout'
				style={{
					minHeight: '100vh',
				}}
			>
				<StyledHeader hasLogo={false} style={layoutHeader}></StyledHeader>
				<Content style={layoutContent}>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default LayoutManager;
