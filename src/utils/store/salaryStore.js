import { create } from 'zustand';

const useSalaryStore = create((set) => ({
	salaryList: [],
	selectedSalary: {},
	setSalary: (salary) => {
		set({ salaryList: salary });
	},
	setSelectedSalary: (salary) => {
		set({ selectedSalary: salary });
	},
}));

export default useSalaryStore;
