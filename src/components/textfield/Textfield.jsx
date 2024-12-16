import './textfield.css';

function TextField({ label, id, type, required, labelCLassName, containerClassName }) {
  return (
    <li className={containerClassName}>
      <label className={labelCLassName} htmlFor={id}>{label}</label>
      <input type={type} id={id} required={required}/>
    </li>
  )
}

export default TextField;
