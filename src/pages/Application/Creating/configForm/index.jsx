export const applicationConfigForm = [
	{
		label: 'Title',
		name: 'title',
		type: 'text',
		rules: [{ required: true, message: 'Please input your title!' }],
	},
	{
		label: 'Description',
		name: 'description',
		type: 'textarea',
		rules: [{ required: true, message: 'Please input your description!' }],
	},
	{
		label: 'Type of application',
		name: 'type',
		type: 'select',
		rules: [{ required: true, message: 'Please choose a type!' }],
	},
];
export const applicationConfigTypeReport = [
	{
		label: 'Report for',
		name: 'toEmployeeId',
		type: 'number',
		col: 12,
	},
	{
		label: 'Present days',
		name: 'presentDay',
		type: 'number',
		col: 12,
	},
	{
		label: 'Absent days',
		name: 'absentDay',
		type: 'number',
		col: 12,
	},
	{
		label: 'Late days',
		name: 'lateDay',
		type: 'number',
		col: 12,
	},
	{
		label: 'Overtime days',
		name: 'overtimeDay',
		type: 'number',
		col: 24,
	},
];
