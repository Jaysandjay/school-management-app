import { ReactNode } from "react"
import LoadingSpinner from "./LoadingSpinner"

interface BasicContainerProps {
    title?: string,
    width?: string,
    children: ReactNode,
    isLoading?: boolean
}
export default function BasicContainer({title, children, width, isLoading}: BasicContainerProps){
    return (
         <div className={`overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm p-6 ${width ? width : "max-w-md"}`}>
            {title && (
                <>
                <h1 className="mb-2 text-xl">{title}</h1>
                <hr className="mb-4"/>   
                </>
            )}
            {isLoading ? <LoadingSpinner/> :
            (<>
            {children}
            </>)
            }
         </div>
    )
}