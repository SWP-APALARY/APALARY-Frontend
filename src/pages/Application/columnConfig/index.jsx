export const salaryColumnConfig = [
	{
		title: 'Title',
		dataIndex: 'title',
		key: 'name',
		width: 200,
	},
	{
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
		ellipse: true,
		// TODO: using draftjs
	},
	{
		title: 'Created at',
		dataIndex: 'createdTime',
	},
];

export const dayLeaveColumnConfig = [
	{
		title: 'Full name',
		dataIndex: 'name',
		key: 'name',
		width: 200,
	},
	{
		title: 'Description',
		dataIndex: 'description',
		key: 'description',
		ellipse: true,
		// TODO: using draftjs
	},
	{
		title: 'Department',
		dataIndex: 'department',
		key: 'department',
	},
	{
		title: 'Leave on day',
		dataIndex: 'absentDay',
		key: 'absentDay',
	},
	{
		title: 'Created at',
		dataIndex: 'createdAt',
	},
];
