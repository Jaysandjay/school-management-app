"use client"
import AddTeacherForm from "@/app/components/forms/AddTeacherForm"
import FormNavButtons from "@/app/components/navigation/FormNavButtons"
import PageTitle from "@/app/components/ui/PageTitle"

export default function addTeacherPage(){

    return(
        <div className="flex-col">
            <div className="flex">
            <PageTitle title="Add Student"/>
            <FormNavButtons/>
            </div>
            <AddTeacherForm/>
        </div>
    )
}