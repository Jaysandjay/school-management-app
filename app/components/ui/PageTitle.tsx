interface PageTitleProps {
    title: string
}
export default function PageTitle({title}: PageTitleProps){
    return (
        <div className="mb-5 mr-10">
            <h1 className="text-2xl">{title}</h1>
        </div>
    )
}