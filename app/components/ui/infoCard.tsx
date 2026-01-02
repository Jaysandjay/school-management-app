import BasicContainer from "./BasicContainer";
import LoadingSpinner from "./LoadingSpinner";
import PrimaryButton from "./PrimaryButton";

interface InfoCardProps {
    title: string
    data?: object
    toggle?: (values: any) => any,
    isLoading?: boolean
}

export default function InfoCard({data, toggle, title, isLoading}: InfoCardProps){
    return(
        <BasicContainer title={title} isLoading={isLoading}>
            {data ? (
                Object.keys(data).map((key) => (
                <div className="flex gap-5 min-h-10" key={key}>
                    <h3 className="min-w-25"><b>{key}</b></h3>
                    <p>{(data as any)[key]}</p>
                </div>
                ))
            ):(
            <div className="w-full flex justify-center h-50 items-center">
                <h3 className="text-red-600">No Address Saved</h3>
            </div>

            )}

            {toggle && (
                <div className="flex justify-end">
                    <PrimaryButton title="Edit" onclick={toggle} />
                </div>
            )}
        </BasicContainer>
    )
}