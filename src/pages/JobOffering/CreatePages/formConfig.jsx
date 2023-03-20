import { Button, Input, InputNumber } from 'antd';

export const formConfig = [
	{
		label: 'Title',
		name: 'title',
		type: 'text',
		rules: [{ required: true, message: 'Please input title' }],
	},
	{
		label: 'Base Salary',
		name: 'baseSalary',
		type: 'number',
		rules: [
			{ type: 'number', min: 0, message: 'Please, Enter a valid number' },
			{ required: true, message: 'Please input a valid number' },
		],
	},
	{
		label: 'Max Employee',
		name: 'maxEmployee',
		type: 'number',

		rules: [
			{ type: 'number', min: 0, message: 'Please, Enter a valid number' },
			{ required: true, message: 'Please input a valid number' },
		],
	},
	{
		label: 'Department',
		name: 'departmentId',
		type: 'select',
		rules: [{ required: true, message: 'Please choose Department' }],
	},
];
