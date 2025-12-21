interface FormInputProps{
    label: string
    name: string
    value?: string
    type?: string
    pattern?: string,
    placeholder?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function FormInput({label, name, value="", type="text", placeholder="", onChange}: FormInputProps){

    return(
        <div className="flex flex-col mb-2">
            <label className="text-sm font-medium text-slate-700 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className="px-4 py-2 border border-slate-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
    )
}