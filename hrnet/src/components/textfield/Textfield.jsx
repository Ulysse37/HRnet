import './textfield.css';

function TextField({ label, id, type, containerClassName }) {
  return (
    <li className={containerClassName}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} />
    </li>
  )
}

export default TextField;
