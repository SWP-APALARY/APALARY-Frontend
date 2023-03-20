import { useEffect, useState } from 'react';

import LocalStorageUtils from './utils';

const usePersistedState = (key, defaultValue = '') => {
	const [state, setState] = useState(LocalStorageUtils.getItem(key) || defaultValue);
	useEffect(() => {
		LocalStorageUtils.setItem(key, state);
	}, [state, setState]);
	return [state, setState];
};

export default usePersistedState;
