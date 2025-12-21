"use client"
import AddStudentForm from "@/app/components/forms/AddStudentForm"
import FormNavButtons from "@/app/components/navigation/FormNavButtons"
import PageTitle from "@/app/components/ui/PageTitle"

export default function addStudentPage(){

    return(
        <div className="flex-col">
            <div className="flex">
            <PageTitle title="Add Student"/>
            <FormNavButtons/>
            </div>
            <AddStudentForm/>
        </div>
    )
}