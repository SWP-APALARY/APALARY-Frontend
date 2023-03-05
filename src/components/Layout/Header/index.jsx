import { useEffect, useState } from 'react';

import { Avatar, Breadcrumb, Button, Dropdown, Image, Layout, Popover, Space } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Logo from '../../../assets';
import usePersistedState from '../../../utils/LocalStorage/usePersistedState';
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
		setToken('');
		setRole('');
		navigate(0);
	};

	return (
		<Header style={style}>
			<div>{isDashBoard ? <img src={Logo} style={menuLogo} /> : <CustomBreadcrumb />}</div>
			<div>
				{token && token !== '' ? (
					<Dropdown
						menu={{
							items: dropDownItem.filter(
								(item) => (token && !item.isLogin) || (!token && item.isLogin)
								//(!A  & !B) | (A & B)
							),
							onClick: logout,
						}}
						placement='bottomLeft'
					>
						<Avatar />
					</Dropdown>
				) : (
					<Button onClick={() => navigate('/login')}>Login</Button>
				)}
			</div>
		</Header>
	);
};

export default StyledHeader;
