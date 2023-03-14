import { createContext, useState } from 'react';

import { Skeleton } from 'antd';

import CustomCard from '../Card';

export const LoadingContext = createContext({
	loading: false,
	setLoading: () => {},
});
const Loading = ({ children }) => {
	const [loading, setLoading] = useState(false);

	return (
		<LoadingContext.Provider value={{ loading, setLoading }}>
			{loading ? (
				<CustomCard>
					<Skeleton />
				</CustomCard>
			) : (
				<>{children}</>
			)}
		</LoadingContext.Provider>
	);
};

export default Loading;
