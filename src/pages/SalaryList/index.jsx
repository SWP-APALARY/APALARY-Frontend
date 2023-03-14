import { useEffect, useState, useCallback, useMemo } from 'react';

import { Table } from 'antd';
import dayjs from 'dayjs';
import { useStore } from 'zustand';

import CustomCard from '../../components/Card';
import CustomTable from '../../components/Table';
import apiHandler from '../../utils/Apis/handler';
import salaryAPI from '../../utils/Apis/salaryAPI';
import usePersistedState from '../../utils/LocalStorage/usePersistedState';
import useSearch from '../../utils/hooks/useSearch';
import useSalaryStore from '../../utils/store/salaryStore';
import { toLowerCaseNonAccentVietnamese } from '../../utils/viewnameseConverter';
import { SalaryListColumnConfig as salaryListColumnConfig } from './ColumnConfig';
import { initData } from './data';

import CustomParse from 'dayjs/plugin/customParseFormat';

dayjs.extend(CustomParse);

const { Column } = Table;
const SalaryList = () => {
	const [loading, setLoading] = useState(true);
	const [search, searchRef, onSearch] = useSearch();
	const [startDate, setStartDate] = useState(dayjs(new Date()));
	const [endDate, setEndDate] = useState('');
	const [token, setToken] = usePersistedState('token');
	const [filteredData, setFilteredData] = useState([]);
	const { salaryList, setSalary } = useSalaryStore();
	const onTimeChange = useCallback(
		(date) => {
			setStartDate(date);
		},
		[startDate]
	);

	useEffect(() => {
		const tmp = salaryList.filter((item) =>
			toLowerCaseNonAccentVietnamese(item.employeeName).includes(
				toLowerCaseNonAccentVietnamese(search)
			)
		);
		setFilteredData(tmp);
	}, [search, salaryList]);
	useEffect(() => {
		onTimeChange(dayjs(new Date()));
	}, []);
	const fetch = async () => {
		const res = await apiHandler(
			salaryAPI,
			'getByMonth',
			'',
			setLoading,
			startDate.month() + 1,
			startDate.year(),
			token
		);
		setSalary(res || []);
	};
	useEffect(() => {
		fetch();
	}, [startDate]);
	return (
		<CustomCard>
			<CustomTable
				rowKey={(record) => record.id + '-salary-list'}
				dataSource={filteredData}
				onSearch={onSearch}
				onTimeChange={onTimeChange}
				startDate={startDate}
				endDate={endDate}
				style={{ minWidth: ' 700px' }}
				loading={loading}
			>
				{salaryListColumnConfig.map((item) => {
					return <Column key={item.key + '-salary-list'} {...item} />;
				})}
			</CustomTable>
		</CustomCard>
	);
};

export default SalaryList;
