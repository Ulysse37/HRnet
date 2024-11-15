import './home.css';
import { NavLink } from 'react-router-dom';
import TextField from '../../components/textfield/Textfield.jsx';
import SelectField from '../../components/selectfield/Selectfield.jsx';
import Datepicker from '../../components/datepicker/Datepicker.jsx';
import { states, departments } from '../../assets/options.js';

function Home() {
  return (
    <main>
      <header>
        <h1>HRnet</h1>
          <NavLink to='/employee-list'>View Current Employees</NavLink>
        <h2>Create Employee</h2>
      </header>
      <form action="#" id="create-employee">
        <ul className='main-ul'>
          <TextField label="First Name" id="first-name" type="text" labelCLassName="name-textfield"/>
          <TextField label="Last Name" id="last-name" type="text" labelCLassName="name-textfield"/>
          <fieldset className='date-fieldset'>
            <legend className='date-fieldset-legend'>Date of Birth</legend>
            <Datepicker />
          </fieldset>
          <fieldset className='date-fieldset'>
            <legend className='date-fieldset-legend'>Start Date</legend>
            <Datepicker />
          </fieldset>
          {/* <TextField label="Date of Birth" id="date-of-birth" type="text" />
          <TextField label="Start Date" id="start-date" type="text"/> */}
        </ul>
        <fieldset className="address">
          <legend>Address</legend>
          <ul>
            <TextField label="Street" id="street" type="text" containerClassName="adress-list-elt"/>
            <TextField label="City" id="city" type="text" containerClassName="adress-list-elt"/>
            <SelectField label="State" name="state" id="state" options={states} />        
            <TextField label="Zip Code" id="zip-code" type="number" containerClassName="adress-list-elt"/>
          </ul>   
        </fieldset>
        <ul>
          <SelectField label="Department" name="department" id="department" options={departments} containerClassName="department-select"/>
        </ul>  
        <button>Save</button>
      </form>
    </main>
  );
}

export default Home;
