import { useEffect, useState } from 'react';

import { Table } from 'antd';
import dayjs from 'dayjs';

import CustomCard from '../../components/Card';
import CustomTable from '../../components/Table';
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
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

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
