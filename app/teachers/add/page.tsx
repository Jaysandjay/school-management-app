"use client"
import { addTeacher } from "@/api/teachers"
import TeacherDetailsForm from "@/app/components/forms/TeacherDetailsForm"
import FormNavButtons from "@/app/components/navigation/FormNavButtons"
import LoadingSpinner from "@/app/components/ui/LoadingSpinner"
import PageTitle from "@/app/components/ui/PageTitle"
import { Teacher } from "@/types/Teacher"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function addTeacherPage(){
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: addTeacher,
        onSuccess: () => {queryClient.invalidateQueries({queryKey: ["teachers"]})},
        onError:(err)=> console.error("Error adding teacher", err)
    })

    return(
        <div className="flex-col">
            <div className="flex">
            <PageTitle title="Add Teacher"/>
            <FormNavButtons/>
            </div>
            <TeacherDetailsForm 
            title="Add Teacher"
            onSubmit={async (teacher: Teacher) => {
                await mutation.mutateAsync(teacher)
            }}
            successMessage={(t) => `${t.firstName} ${t.lastName} has been registered`}
            />
            {mutation.isPending && <LoadingSpinner/> }
            {mutation.error && "Error Adding teacher"}
        </div>
    )
}