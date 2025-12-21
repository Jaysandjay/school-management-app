import PrimaryButton from "../ui/PrimaryButton";

export default function FormNavButtons(){
    const color = "bg-purple-700"

    return (
        <div className="flex gap-5 mb-5">
            <PrimaryButton
            title="Add Student"
            href="/students/add"
            color={color}
            />
            <PrimaryButton
            title="Add Teacher"
            href="/teachers/add"
            color={color}
            />
            <PrimaryButton
            title="Add Class"
            href="/classes/add"
            color={color}
            />
            <PrimaryButton
            title="Add Guardian"
            href="/guardians/add"
            color={color}
            />
        </div>
    )
}