import './home.css';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../redux/actions';
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

  const dispatch = useDispatch();
  /* const employees = useSelector((state) => state.auth.employees); */

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = (event) => {// Va ajouter dans un tableau employees tous les employee ajouté via le form
    event.preventDefault(); // évite que la page ne se recharge à la validation du formulaire
    if ( // Si un des champs manquant, impossibilité de valider le formulaire
      firstName === '' ||
      lastName === '' ||
      birthDate === '' ||
      startDate === '' ||
      street === '' ||
      city === '' ||
      state === '' ||
      zipCode === '' ||
      department === ''
    ) {
      return;
    }

    const employee = {
      firstName,
      lastName,
      birthDate,
      startDate,
      street,
      city,
      state: selectedStateOption,
      zipCode,
      department: selectedDepartmentOption,
    };
    console.log('Homes page - Informations de l\'employé :', employee);
    dispatch(addEmployee(employee)); // action qui va ajouter l'employé à la liste

    // Réinitialise les états pour vider les champs après validation
    setFirstName('');
    setLastName('');
    setBirthDate('');
    setStartDate('');
    setStreet('');
    setCity('');
    setState('');
    setZipCode('');
    setDepartment('');
    setSelectedStateOption(stateOptions[0]);
    setselectedDepartmentOption(departmentOptions[0]);
    setStartDate1(null);
    setStartDate2(null);

    // Affiche modale de validation
    openModal();
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
          <TextField  
            label="First Name" htmlFor="firstName" id="firstName" 
            type="text" labelCLassName="name-textfield" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} 
            required
          />
          <TextField  
            label="Last Name" htmlFor="lastName" id="lastName" 
            type="text" labelCLassName="name-textfield" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} 
            required
          />
          <fieldset className='date-fieldset'>
            <legend className='date-fieldset-legend'>Date of Birth</legend>
            <DatePicker 
              selected={startDate1} 
              onChange={(date) => {
                setStartDate1(date);
                setBirthDate(date.toISOString().split('T')[0]);
              }}
              value={startDate1} 
              required
            />
          </fieldset>
          <fieldset className='date-fieldset'>
            <legend className='date-fieldset-legend'>Start Date</legend>
            <DatePicker
              selected={startDate2}
              onChange={(date) => {
                setStartDate2(date);
                setStartDate(date.toISOString().split('T')[0]);
              }}
              value={startDate2}
              required
            />
          </fieldset>
        </ul>
        <fieldset className="address">
          <legend>Address</legend>
          <ul>
            <TextField 
              label="Street" htmlFor="street" id="street" type="text" 
              containerClassName="adress-list-elt" 
              value={street}
              onChange={(e) => setStreet(e.target.value)} 
              required 
            />
            <TextField 
              label="City" htmlFor ="city" id="city" type="text" 
              containerClassName="adress-list-elt" 
              value={city}
              onChange={(e) => setCity(e.target.value)} 
              required
            />
            <fieldset className='state-fieldset'>
              <legend>State</legend>
              <Dropdown
                options={stateOptions}
                defaultValue={selectedStateOption}
                onChange={(option) => {
                  _onSelectState(option);
                  setState(option.value);
                }}
                value={selectedStateOption}
                placeholder="Select an option"
              />
            </fieldset>      
            <TextField 
              label="Zip Code" htmlFor="zipCode" id="zipCode" type="number" 
              containerClassName="adress-list-elt" 
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)} 
              required
            />
          </ul>   
        </fieldset>
        <fieldset className="department-fieldset">
          <legend>Department</legend>
          <Dropdown
            className="department-select"
            options={departmentOptions}
            defaultValue={selectedDepartmentOption}
            onChange={(option) => {
              _onSelectDepartment(option);
              setDepartment(option.value);
            }}
            value={selectedDepartmentOption}
            placeholder="Select an option"
          />
        </fieldset>  
        <button type="submit">Save</button>
        <Modal open={open} onClose={closeModal} message="Employee Created!"></Modal>
      </form>
    </main>
  );
}

export default Home;
