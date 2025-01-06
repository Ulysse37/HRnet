import './textfield.css';

function TextField({ label, id, type, required, labelCLassName, containerClassName, onChange }) {
  return (
    <li className={containerClassName}>
      <label className={labelCLassName} htmlFor={id}>{label}</label>
      <input type={type} id={id} required={required}  onChange={onChange}/>
    </li>
  )
}

export default TextField;
