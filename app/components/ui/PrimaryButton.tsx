
interface PrimaryButtonProps {
    title: string,
    href: string,
    color?: string,
    text?: string
}

export default function PrimaryButton({title, href, color = "bg-blue-500", text="text-white"}: PrimaryButtonProps){
    return (
        <a 
        href={href} 
        className={`${color} ${text} px-4 py-2 rounded hover:opacity-80 transition-opacity duration-200 min-w-30 text-center`}
        >
            {title}
        </a>
    )
}