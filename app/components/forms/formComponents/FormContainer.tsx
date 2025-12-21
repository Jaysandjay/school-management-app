import { ReactNode } from "react"

interface FormContainerProps{
    title: string,
    children: ReactNode,
    submit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function FormContainer({title, children, submit}: FormContainerProps){
    return (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            {children}
          </div>
          <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-sm text-sm font-medium"
        >
          Add
        </button>
        </form>
        </div>
    )
}