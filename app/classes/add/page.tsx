"use client"
import ClassDetailsForm from "@/app/components/forms/ClassDetailsForm"
import FormNavButtons from "@/app/components/navigation/FormNavButtons"
import PageTitle from "@/app/components/ui/PageTitle"
import { addclass } from "@/api/classes"
import { Course } from "@/types/Course"
export default function addStudentPage(){

    return(
        <div className="flex-col">
            <div className="flex">
            <PageTitle title="Add Class"/>
            <FormNavButtons/>
            </div>
            <ClassDetailsForm title="Add Class" onSubmit={addclass} successMessage={(c: Course) => `${c.className} created`}/>
            
        </div>
    )
}