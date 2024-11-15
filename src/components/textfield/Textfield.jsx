import './textfield.css';

function TextField({ label, id, type, labelCLassName, containerClassName }) {
  return (
    <li className={containerClassName}>
      <label className={labelCLassName} htmlFor={id}>{label}</label>
      <input type={type} id={id} />
    </li>
  )
}

export default TextField;
