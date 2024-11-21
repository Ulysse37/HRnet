import './home.css';
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import TextField from '../../components/textfield/Textfield.jsx';
import SelectField from '../../components/selectfield/Selectfield.jsx';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import data from '../../assets/data.json';


const { states, departments } = data;

/* import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const options = [
  'one', 'two', 'three'
];
const defaultOption = options[0]; */

function Home() {
  /* const _onSelect = (option) => {
    console.log(option); 
  }; */
  const [startDate1, setStartDate1] = useState(null);
  const [startDate2, setStartDate2] = useState(null);
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
            <DatePicker selected={startDate1} onChange={(date) => setStartDate1(date)} />
          </fieldset>
          <fieldset className='date-fieldset'>
            <legend className='date-fieldset-legend'>Start Date</legend>
            <DatePicker selected={startDate2} onChange={(date) => setStartDate2(date)} />
          </fieldset>
        </ul>
        <fieldset className="address">
          <legend>Address</legend>
          <ul>
            <TextField label="Street" id="street" type="text" containerClassName="adress-list-elt"/>
            <TextField label="City" id="city" type="text" containerClassName="adress-list-elt"/>
            {/* <Dropdown options={options} onChange={_onSelect} value={defaultOption} placeholder="Select an option" />; */}
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
