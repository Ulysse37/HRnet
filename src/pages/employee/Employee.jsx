import './employee.css';
import { NavLink } from 'react-router-dom';

import DataTable from 'react-data-table-component';

const columns = [
	{
		name: 'First Name',
		selector: row => row.firstName,
    sortable: true,
	},
	{
		name: 'Last Name',
		selector: row => row.lastName,
    sortable: true,
	},
  {
    name: 'Start Date',
    selector: row => row.startDate,
    sortable: true,
  },
  {
    name: 'Department',
    selector: row => row.department,
    sortable: true,
  },
  {
    name: 'Date of Birth',
    selector: row => row.dateOfBirth,
    sortable: true,
  },
  {
    name: 'Street',
    selector: row => row.street,
    sortable: true,
  },
  {
    name: 'City',
    selector: row => row.city,
    sortable: true,
  },
  {
    name: 'State',
    selector: row => row.state,
    sortable: true,
  },
  {
    name: 'Zip Code',
    selector: row => row.zipCode,
    sortable: true,
  }
];

const data = [
  {
    id: 1,
    firstName: 'Michel',
    lastName: 'Russel',
    startDate: '01/01/2020',
    department: 'Marketing',
    dateOfBirth: '01/01/1990',
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
  },
  {
    id: 2,
    firstName: 'Roger',
    lastName: 'Balkani',
    startDate: '01/01/2021',
    department: 'Sales',
    dateOfBirth: '01/01/1985',
    street: '456 Main St',
    city: 'Alabama',
    state: 'AL',
    zipCode: '47000',
  },
]

function Employee() {
  return (
    <main>
      <h1>Current Employees</h1>
      <DataTable
			columns={columns}
			data={data}
		  />
      <NavLink to='/'>Home</NavLink>
    </main>
  );
}

export default Employee;
