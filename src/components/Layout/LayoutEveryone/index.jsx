import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';

import StyledHeader from '../Header';
import { layoutHeader } from '../style';

const LayoutEveryone = () => {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Layout
				className='site-layout'
				style={{
					minHeight: '100vh',
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
