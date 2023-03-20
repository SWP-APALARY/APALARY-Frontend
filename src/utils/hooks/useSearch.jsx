import { useState, useRef, useEffect } from 'react';

const useSearch = () => {
	const [search, setSearch] = useState('');
	const searchRef = useRef('');
	const onSearchChange = (value) => {
		searchRef.current = value;
		setSearch(searchRef.current);
	};
	return [search, searchRef, onSearchChange];
};

export default useSearch;
