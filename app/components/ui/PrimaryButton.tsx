
interface PrimaryButtonProps {
    title: string,
    color?: string,
    text?: string
    onclick?: (values: any) => any
}

export default function PrimaryButton({title, color = "bg-blue-500", text="text-white", onclick}: PrimaryButtonProps){
    return (
        <button
        onClick={onclick}
        className={`${color} ${text} cursor-pointer px-4 py-1 mt-1 rounded hover:opacity-80 transition-opacity duration-200 min-w-30 text-center`}
        >
            {title}
        </button>
    )
}