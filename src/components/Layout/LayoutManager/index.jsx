import { useEffect, useState } from 'react';

import { Layout, Menu } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Logo from '../../../assets';
import usePersistedState from '../../../utils/LocalStorage/usePersistedState';
import Box from '../../Box';
import StyledHeader from '../Header';
import { managerHrItems } from '../ManagerItems';
import { layoutContent, layoutHeader, menuLogo } from '../style';

import Sider from 'antd/es/layout/Sider';

const LayoutManager = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [link, setLink] = useState();
	const [role, setRole] = usePersistedState('role');
	const [key, setKey] = useState();
	const menuItems = managerHrItems.filter((item) => item.roles.includes(role));
	useEffect(() => {
		navigate(link);
	}, [link]);
	useEffect(() => {
		setLink(location.pathname);
	}, [location]);
	return (
		<Layout>
			<Sider>
				<Box style={menuLogo} onClick={() => navigate('/')}>
					<img src={Logo} alt='logo' />
				</Box>
				<Menu
					theme='dark'
					onClick={(item) => {
						setLink(item.key);
						setKey(item.key);
					}}
					mode='inline'
					selectedKeys={[link]}
					forceSubMenuRender
					items={menuItems}
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
