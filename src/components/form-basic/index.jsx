// Register form for users, contacts and items
import { useNavigate } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';

const FormBasic = ({ formDetails, handleChange, onSubmit, buttonText }) => {
  const navigate = useNavigate()

  return (
    <>
      <form onSubmit={onSubmit} className="flex max-w-md flex-col gap-1 w-2/3">
        {formDetails.map((input) => (
          <div>
            <div className="mb-2 block">
              <Label htmlFor={input.name} value={input.label} />
            </div>
            <TextInput
              id={input.name}
              type={input.type}
              placeholder={input.placeholder}
              required={input.required}
              name={input.name}
              value={input.value}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="flex justify-evenly mt-4">
          <Button type="submit" className="w-1/3">{buttonText}</Button>
          <Button onClick={() => navigate(-1)} className="w-1/3">Cancelar</Button>
        </div>
      </form>
    </>
  )
};

export { FormBasic }