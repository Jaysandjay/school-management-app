"use client"
import GuardianDetailsForm from "@/app/components/forms/GuardianDetailsForm"
import FormNavButtons from "@/app/components/navigation/FormNavButtons"
import PageTitle from "@/app/components/ui/PageTitle"

export default function AddGuardianPage(){

    return(
        <div className="flex-col">
            <div className="flex">
            <PageTitle title="Add Student"/>
            <FormNavButtons/>
            </div>
            <GuardianDetailsForm/>
                        
           </div>
    )
}