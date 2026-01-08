"use client"
import PageTitle from "@/app/components/ui/PageTitle"
import { useQuery } from "@tanstack/react-query"
import { getStudent } from "@/api/students"
import { StudentRecord } from "@/types/Student"
import { useParams } from "next/navigation"
import LoadingSpinner from "@/app/components/ui/LoadingSpinner"
import AddressCard from "@/app/components/cards/AddressCard"
import StudentGradesCard from "@/app/components/students/StudentGradesCard"
import BasicInfoCard from "@/app/components/cards/BasicInfoCard"
import StudentEnrollmentsCard from "@/app/components/students/StudentEnrollmentsCard"
import AssignedGuardiansToStudentCard from "@/app/components/students/AssignedGuardiansToStudentCard"
import RemoveButon from "@/app/components/RemoveButton"


export default function StudentPage(){
    const params = useParams()
    const id = Number(params?.id)

    const {data: student, isLoading, isError, error} = useQuery<StudentRecord>({
        queryKey: ["student", id],
        queryFn: ()=>getStudent(id),
        enabled: !!id
    })

    if (isLoading) return <LoadingSpinner/>
    if (isError) return <p>Error: {(error as Error).message}</p>
    if (!student) return <p>No student found</p>

   

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between w-full mb-2 items-center">
                <PageTitle title={`Student: ${student.firstName} ${student.lastName} `}/>
                <RemoveButon id={id} type="student"/>
            </div>
            <main className="min-h-0 overflow-y-auto flex flex-1 flex-col gap-5">
                <div className="w-full flex justify-around gap-1">
                    <BasicInfoCard id={id} type="student"/>
                    <AddressCard id={id} personType="student"/>
                    <StudentGradesCard studentId={id}/>
                </div>
             
                    <StudentEnrollmentsCard studentId={id}/>
                    <AssignedGuardiansToStudentCard studentId={id}/>

            </main>
        </div>
    )
}