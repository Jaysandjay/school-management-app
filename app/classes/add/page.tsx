"use client"
import ClassDetailsForm from "@/app/components/forms/ClassDetailsForm"
import FormNavButtons from "@/app/components/navigation/FormNavButtons"
import { addclass } from "@/api/classes"
import { Course } from "@/types/Course"
export default function addStudentPage(){

    return(
        <div className="flex-col flex items-center">
            <FormNavButtons/>

            <ClassDetailsForm title="Add Class" onSubmit={addclass} successMessage={(c: Course) => `${c.className} created`}/>
            
        </div>
    )
}