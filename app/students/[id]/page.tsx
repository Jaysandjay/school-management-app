"use client"
import PageTitle from "@/app/components/ui/PageTitle"
import { useQuery, useMutation, QueryClient, useQueryClient } from "@tanstack/react-query"
import { getStudent, updateStudent } from "@/api/students"
import { Student, StudentRecord } from "@/types/Student"
import { useParams } from "next/navigation"
import LoadingSpinner from "@/app/components/ui/LoadingSpinner"
import { useState } from "react"
import StudentBasicInfo from "@/app/components/students/StudentBasicInfo"
import StudentEnrollments from "@/app/components/students/StudentEnrollments"
import AddressForm from "@/app/components/forms/AddressForm"
import StudentAddress from "@/app/components/students/StudentAddress"
import StudentGuardian from "@/app/components/students/StudentGuardians"
import StudentGuardians from "@/app/components/students/StudentGuardians"
import SuccessModal from "@/app/components/modals/SuccessModal"
import AssignGuardianModal from "@/app/components/modals/AssignGuardianModal"


export default function StudentPage(){
    const [isEditingDetails, setIsEdtiingDetails] = useState(false)
    const params = useParams()
    const id = Number(params?.id)
    const queryClient = useQueryClient()

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["student", id],
        queryFn: ()=>getStudent(Number(id)),
        enabled: !!id
    })
    const mutation = useMutation({
        mutationFn: (updatedStudent: Student) => updateStudent(Number(id), updatedStudent),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["student", id]})
            queryClient.invalidateQueries({queryKey: ["students"]})
            setIsEdtiingDetails(false)
        }
    })
     if (isLoading) return <LoadingSpinner/>
    if (isError) return <p>Error: {(error as Error).message}</p>
    if (!data) return <p>No student found</p>

    
    const student: StudentRecord = data as StudentRecord

    return (
        <div className="flex-col">
            <PageTitle title={`Student: ${student.firstName} ${student.lastName} `}/>
            <main className="overflow-y-scroll h-full flex flex-wrap">
            {/* <StudentBasicInfo id={id}/>
            <StudentAddress studentId={id}/>
            <StudentEnrollments id={id}/> */}
            <StudentGuardians id={id}/>
            </main>
        </div>
    )
}