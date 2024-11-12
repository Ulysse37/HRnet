import './selectfield.css';

function SelectField({ label, name, id, options, containerClassName }) {
  return (
    <li className={containerClassName}>
      <label htmlFor={id}>{label}</label>
      <select name={name} id={id}>
        {options.map((option, index) => (
          <option key={index}>{option.name}</option>
        ))}
      </select>
    </li>
  )
}

export default SelectField;
