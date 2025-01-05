import './home.css';
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import TextField from '../../components/textfield/Textfield.jsx';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import data from '../../assets/data.json';
import { Modal } from "ulysse37-modal-package";
import 'ulysse37-modal-package/dist/style.css'; // css modale

const { states, departments } = data;
const stateOptions = states.map(state => state.name); // créer un tableau avec le nom des états pour le donner au dropdown
const departmentOptions = departments.map(department => department.name); // De même pour les departments 

function Home() {
  
  const [open, setOpen] = useState(false); // Code permettant l'ouverture et la fermeture de la modale de validation
  const openModal = () => {
    setOpen(true);
  }
  const closeModal = () => {
    setOpen(false);
  }

  const [selectedStateOption, setSelectedStateOption] = useState(stateOptions[0]); // state dropdown états(régions)
  const [selectedDepartmentOption, setselectedDepartmentOption] = useState(departmentOptions[0]); // state dropdown départements
  const _onSelectState = (option) => { // utilisé pour le dropdown des states
    setSelectedStateOption(option.value);
  };
  const _onSelectDepartment = (option) => { // utilisé pour le dropdown des départements
    setselectedDepartmentOption(option.value);
  };

  const [startDate1, setStartDate1] = useState(null); // State datepicker 1 
  const [startDate2, setStartDate2] = useState(null); // State datepicker 2

  const [employees, setEmployees] = useState(() => { // employees = state sotckant tableau contenant les employés crées
    const storedEmployees = localStorage.getItem('employees');
    return storedEmployees ? JSON.parse(storedEmployees) : [];
  });

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees)); // Sauvegarde données employees chaque fois que le tableau est mit à jour
  }, [employees]);

  /* useEffect(() => { // Supprime tableau employees quand user rafraîchit la page en suppr le cache
    localStorage.removeItem('employees');
  }, []); */

  const handleSubmit = (event) => { // Va ajouter dans un tableau employees tous les employee ajouté via le form
    event.preventDefault();
    const employee = {
      firstName: event.target.elements.firstName.value,
      lastName: event.target.elements.lastName.value,
      birthDate: startDate1.toISOString().split('T')[0], // Change le format de date dans celui voulu
      startDate: startDate2.toISOString().split('T')[0],
      street: event.target.elements.street.value,
      city: event.target.elements.city.value,
      state: selectedStateOption,
      zipCode: event.target.elements.zipCode.value,
      department: selectedDepartmentOption
    };
    setEmployees([...employees, employee]);
  };
  
  return (
    <main>
      <header>
        <h1>HRnet</h1>
          <NavLink to='/employee-list'>View Current Employees</NavLink>
        <h2>Create Employee</h2>
      </header>
      <form action="#" id="create-employee" onSubmit={handleSubmit}>
        <ul className='main-ul'>
          <TextField label="First Name" htmlFor="firstName" id="firstName" type="text" labelCLassName="name-textfield" required/>
          <TextField label="Last Name" htmlFor="lastName" id="lastName" type="text" labelCLassName="name-textfield" required/>
          <fieldset className='date-fieldset'>
            <legend className='date-fieldset-legend'>Date of Birth</legend>
            <DatePicker selected={startDate1} onChange={(date) => setStartDate1(date)} value={startDate1} required/>
          </fieldset>
          <fieldset className='date-fieldset'>
            <legend className='date-fieldset-legend'>Start Date</legend>
            <DatePicker selected={startDate2} onChange={(date) => setStartDate2(date)} value={startDate2} required/>
          </fieldset>
        </ul>
        <fieldset className="address">
          <legend>Address</legend>
          <ul>
            <TextField label="Street" htmlFor="street" id="street" type="text" containerClassName="adress-list-elt" required/>
            <TextField label="City" htmlFor ="city" id="city" type="text" containerClassName="adress-list-elt" required/>
            <fieldset className='state-fieldset'>
              <legend>State</legend>
              <Dropdown options={stateOptions} onChange={_onSelectState} value={selectedStateOption} placeholder="Select an option" />
            </fieldset>      
            <TextField label="Zip Code" htmlFor="zipCode" id="zipCode" type="number" containerClassName="adress-list-elt" required/>
          </ul>   
        </fieldset>
        <fieldset className="department-fieldset">
          <legend>Department</legend>
          <Dropdown className="department-select" options={departmentOptions} onChange={_onSelectDepartment} value={selectedDepartmentOption} placeholder="Select an option" />
        </fieldset>  
        <button onClick={openModal}>Save</button>
        <Modal open={open} onClose={closeModal} message="Employee Created!"></Modal>
      </form>
    </main>
  );
}

export default Home;
