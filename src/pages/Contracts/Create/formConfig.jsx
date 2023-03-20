import { Button, Input, InputNumber } from 'antd';

export const formConfig = [
	{
		label: 'Name',
		name: 'name',
		type: 'text',
		rules: [{ required: true, message: 'Please input' }],
	},
	{
		label: 'SingedDate',
		name: 'singedDate',
		type: 'date',
		rules: [{ required: true, message: 'Please input' }],
	},
	{
		label: 'StartDate',
		name: 'startDate',
		type: 'date',
		rules: [{ required: true, message: 'Please input' }],
	},
	{
		label: 'EndDate',
		name: 'endDate',
		type: 'date',
		rules: [{ required: true, message: 'Please input' }],
	},
	{
		label: 'Base Salary',
		name: 'base',
		type: 'number',
		rules: [
			{ type: 'number', min: 0, message: 'Please, Enter a valid number' },
			{ required: true, message: 'Please input a valid number' },
		],
	},
	{
		label: 'Tax',
		name: 'tax',
		type: 'text',
		rules: [
			{ type: 'text', min: 0, message: 'Please, Enter a valid number' },
			{ required: true, message: 'Please input a valid number' },
		],
	},
	{
		label: 'SocialAssurances',
		name: 'socialAssurances',
		type: 'text',
		rules: [
			{ type: 'text', min: 0, message: 'Please, Enter a valid number' },
			{ required: true, message: 'Please input a valid number' },
		],
	},
	{
		label: 'MedicalAssurances',
		name: 'medicalAssurances',
		type: 'text',
		rules: [
			{ type: 'text', min: 0, message: 'Please, Enter a valid number' },
			{ required: true, message: 'Please input a valid number' },
		],
	},
	{
		label: 'AccidentalAssurances',
		name: 'accidentalAssurances',
		type: 'text',
		rules: [
			{ type: 'text', min: 0, message: 'Please, Enter a valid number' },
			{ required: true, message: 'Please input a valid number' },
		],
	},
];
