import './employee.css';
import { NavLink } from 'react-router-dom';

function Employee() {
  return (
    <main>
      <h1>Current Employees</h1>
      <NavLink to='/'>Home</NavLink>
    </main>
  );
}

export default Employee;
