import './textfield.css';

function TextField({ label, id, type, required, labelCLassName, containerClassName, value, onChange }) {
  return (
    <li className={containerClassName}>
      <label className={labelCLassName} htmlFor={id}>{label}</label>
      <input type={type} id={id} required={required} value={value} onChange={onChange}/>
    </li>
  )
}

export default TextField;
