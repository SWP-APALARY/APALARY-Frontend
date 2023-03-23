import { useEffect, useState } from 'react';

import { Avatar, Breadcrumb, Button, Dropdown, Image, Layout, Popover, Space } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Logo from '../../../assets';
import usePersistedState from '../../../utils/LocalStorage/usePersistedState';
import LocalStorageUtils from '../../../utils/LocalStorage/utils';
import { menuLogo } from '../style';
import CustomBreadcrumb from './CustomBreadcrumb';
import dropDownItem from './DropdownItem';

import { HomeOutlined, StepBackwardOutlined } from '@ant-design/icons';

const StyledHeader = (props) => {
	const navigate = useNavigate();

	const [token, setToken] = usePersistedState('token');
	const [role, setRole] = usePersistedState('role');
	const { style, isDashBoard } = props;
	const logout = () => {
		// setToken('');
		// setRole('');
		LocalStorageUtils.clear();
		navigate('/');
	};

	return (
		<Header style={style}>
			<div>
				{isDashBoard ? (
					<Link to='/'>
						<img src={Logo} style={menuLogo} />
					</Link>
				) : (
					<CustomBreadcrumb />
				)}
			</div>
			<div>
				{token && token !== '' ? (
					<Dropdown
						menu={{
							items: dropDownItem.map((item) => {
								if (item.key.includes('logout')) {
									item.onClick = logout;
								}
								return item;
							}),
						}}
						placement='bottomLeft'
					>
						<Avatar src={LocalStorageUtils.getItem('avatar')} />
					</Dropdown>
				) : (
					<Button onClick={() => navigate('/login')}>Login</Button>
				)}
			</div>
		</Header>
	);
};

export default StyledHeader;
