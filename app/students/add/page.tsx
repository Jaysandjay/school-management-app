"use client"
import StudentDetailsForm from "@/app/components/forms/StudentDetailsForm"
import FormNavButtons from "@/app/components/navigation/FormNavButtons"
import PageTitle from "@/app/components/ui/PageTitle"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { Student } from "@/types/Student"
import { addStudent } from "@/api/students"
import LoadingSpinner from "@/app/components/ui/LoadingSpinner"

export default function addStudentPage(){
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: addStudent,
        onSuccess: () => {queryClient.invalidateQueries({queryKey: ["students"]})},
        onError:(err)=> console.error("Error adding student", err)
    })
    return(
        <div className="flex-col">
            <div className="flex">
            <PageTitle title="Add Student"/>
            <FormNavButtons/>
            </div>
            <StudentDetailsForm
            title="Add Student"
            onSubmit={async (student: Student) => {
                await mutation.mutateAsync(student)
            }}
            successMessage={(s: Student) => `${s.firstName} ${s.lastName} has been registered`}
            />
            {mutation.isPending && <LoadingSpinner/> }
            {mutation.error && "Error Adding Student"}
        </div>
    )
}