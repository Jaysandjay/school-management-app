"use client"
import { getClass } from "@/api/classes"
import BasicInfoCard from "@/app/components/cards/BasicInfoCard"
import AssignTeacherCard from "@/app/components/classes/AssignTeacherCard"
import ClassTeacherCard from "@/app/components/classes/ClassTeacherCard"
import EnrollStudentsToClassCard from "@/app/components/classes/EnrollStudentToClassCard"
import StudentsGradesList from "@/app/components/classes/StudentGradesList"
import DeleteModal from "@/app/components/modals/DeleteModal"
import RemoveButon from "@/app/components/RemoveButton"
import LoadingSpinner from "@/app/components/ui/LoadingSpinner"
import PageTitle from "@/app/components/ui/PageTitle"
import { CourseRecord } from "@/types/Course"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

export default function ClassPage(){
    const params = useParams()
    const id = Number(params?.id)
    
    const {data: course, isLoading, isError, error} = useQuery<CourseRecord>({
        queryKey: ["class", id],
        queryFn: ()=>getClass(id),
        enabled: !!id
    })

    if (isLoading) return <LoadingSpinner/>
    if (isError) return <p>Error: {(error as Error).message}</p>
    if (!course) return <p>No student found</p>

    return(
        <div className="flex flex-col h-full">
            <div className="flex justify-between w-full mb-2 items-center">
                <PageTitle title={`Class: ${course.className}`}/>
                <RemoveButon id={id} type="class"/>
            </div>
        
            <main className="min-h-0 overflow-y-auto flex flex-1 flex-col gap-5">
                <div className="w-full flex justify-around gap-1">
                    <BasicInfoCard id={id} type="class"/>
                    <ClassTeacherCard id={id}/>
                </div>
                <div className="w-full flex justify-around gap-1">
                <StudentsGradesList id={id}/>
                <EnrollStudentsToClassCard id={id}/>
                </div>
                <AssignTeacherCard id={id}/>



            </main>
        </div>
    )

}

