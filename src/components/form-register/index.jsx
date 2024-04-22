// Register form for users, contacts and items
import { useNavigate } from 'react-router-dom';

const FormRegister = ({ formDetails, handleChange, onSubmit, buttonText }) => {
  const navigate = useNavigate()

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4 w-2/3">
      {formDetails.map((input) => (
        <input
          className="bg-blue-100 text-xs rounded p-2"
          type={input.type}
          name={input.name}
          value={input.value}
          onChange={handleChange}
          required={input.required}
          placeholder={input.placeholder}
        />
      ))}

      <div className="flex justify-evenly">
        <button
          className="w-1/3 btn btn-primary py-2 rounded bg-blue-500 text-white"
          type="submit"
        >
          {buttonText}
        </button>
        <button
          className="w-1/3 btn btn-secondary py-2 rounded bg-blue-500 text-white"
          onClick={() => navigate(-1)}
        >
          Cancelar
        </button>
      </div>
    </form>

  )
};

export { FormRegister }