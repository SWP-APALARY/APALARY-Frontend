import React, { useEffect, useState } from 'react';

import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import { HomeOutlined } from '@ant-design/icons';

const CustomBreadcrumb = () => {
	const location = useLocation();
	const path = location.pathname.split('/').filter((x) => x);

	const extraBreadcrumbItems = path.map((item, index) => {
		const url = `${path.slice(0, index + 1).join('/')}`;
		const crumb = `${item}`;
		return (
			<Breadcrumb.Item key={'breadcrumb' + url}>
				<Link to={`/${url}`}>{crumb}</Link>
			</Breadcrumb.Item>
		);
	});

	const breadcrumbItems = [
		<Breadcrumb.Item key='home'>
			<Link to='/dashboard'>
				<HomeOutlined />
			</Link>
		</Breadcrumb.Item>,
	].concat(extraBreadcrumbItems);
	return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
};

export default CustomBreadcrumb;
