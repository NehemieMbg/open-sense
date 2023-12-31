import { useEffect, useState } from 'react';

interface SettingsInputProps {
  label: string;
  type: string;
  placeholder: string;
  error?: string;
  name: string;
  defaultValue?: string;
  newValue?: string;
}

const SettingsInput: React.FC<SettingsInputProps> = ({
  label,
  type,
  placeholder,
  defaultValue,
  newValue,
  error,
  name,
}) => {
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (newValue) {
      setEdit(false);
    }
  }, [newValue]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <label htmlFor={name}>{label}</label>
        <div className="flex gap-3">
          {edit && <button type="submit">Submit</button>}
          <p
            className={`cursor-pointer
				${edit && 'text-red-light'}
			`}
            onClick={() => setEdit((prev) => !prev)}
          >
            {edit ? 'Cancel' : 'Edit'}
          </p>
        </div>
      </div>

      {edit ? (
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          //   required
          className={`font-light border-2 border-light-gray border-opacity-50 py-2 px-3 rounded-md outline-none
          ${error ? 'border-red-light' : ''}
          `}
        />
      ) : (
        <p className="">{defaultValue}</p>
      )}
      {error && edit && <span className="text-red-light">{error}</span>}

      <div className="w-full h-[1px] bg-light-gray bg-opacity-60"></div>
    </div>
  );
};
export default SettingsInput;
