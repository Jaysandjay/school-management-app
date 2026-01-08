"use client"
import { addGuardian } from "@/api/guardians"
import GuardianDetailsForm from "@/app/components/forms/GuardianDetailsForm"
import FormNavButtons from "@/app/components/navigation/FormNavButtons"
import LoadingSpinner from "@/app/components/ui/LoadingSpinner"
import PageTitle from "@/app/components/ui/PageTitle"
import { Guardian } from "@/types/Guardian"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function AddGuardianPage(){
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: addGuardian,
        onSuccess: () => {queryClient.invalidateQueries({queryKey: ["guardians"]})},
        onError:(err)=> console.error(err)
    })


    return(
        <div className=" flex flex-col items-center w-full">
            <FormNavButtons/>
           
            <GuardianDetailsForm
            title="Add Student"
            onSubmit={async (guardian: Guardian) => {
                await mutation.mutateAsync(guardian)
            }}
            successMessage={(g: Guardian) => `${g.firstName} ${g.lastName} has been registered`}
            />
            {mutation.isPending && <LoadingSpinner/> }
            {mutation.error && "Error Adding Guardian"}
                        
           </div>
    )
}