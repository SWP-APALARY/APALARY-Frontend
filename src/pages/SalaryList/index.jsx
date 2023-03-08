import { useEffect, useState } from 'react';

import { Table } from 'antd';
import dayjs from 'dayjs';

import CustomCard from '../../components/Card';
import CustomTable from '../../components/Table';
import apiHandler from '../../utils/Apis/handler';
import salaryAPI from '../../utils/Apis/salaryAPI';
import usePersistedState from '../../utils/LocalStorage/usePersistedState';
import useSearch from '../../utils/hooks/useSearch';
import { SalaryListColumnConfig as salaryListColumnConfig } from './ColumnConfig';
import { initData } from './data';

import CustomParse from 'dayjs/plugin/customParseFormat';

dayjs.extend(CustomParse);

const { Column } = Table;
const SalaryList = () => {
	const [data, setData] = useState(initData);
	const [loading, setLoading] = useState(true);
	const [search, searchRef, onSearch] = useSearch();
	const [filteredData, setFilteredData] = useState(initData);
	const [startDate, setStartDate] = useState(dayjs(new Date()));
	const [endDate, setEndDate] = useState('');
	const [token, setToken] = usePersistedState('token');
	const onTimeChange = (start) => {
		const tmp = data.filter((data) => {
			const date = dayjs(data.receiveDate, 'MM/YYYY');
			return date.month() === start.month();
		});
		setFilteredData(tmp);
		setStartDate(start);
	};
	useEffect(() => {
		const tmp = data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
		setFilteredData(tmp);
	}, [search]);
	useEffect(() => {
		const fetch = async () => {
			const res = await apiHandler(
				salaryAPI,
				'getByMonth',
				'',
				null,
				startDate.month() + 1,
				startDate.year(),
				token
			);
			console.log(res);
			setLoading(false);
		};
		fetch();
	});
	return (
		<CustomCard>
			<CustomTable
				dataSource={filteredData}
				onSearch={onSearch}
				onTimeChange={onTimeChange}
				startDate={startDate}
				endDate={endDate}
				style={{ minWidth: ' 700px' }}
			>
				{salaryListColumnConfig.map((item) => {
					return <Column key={item.key + 'salary-list'} {...item} />;
				})}
			</CustomTable>
		</CustomCard>
	);
};

export default SalaryList;
