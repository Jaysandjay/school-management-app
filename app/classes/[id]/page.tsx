"use client"
import { getClass, getClassTeacher } from "@/api/classes"
import BasicInfoCard from "@/app/components/cards/BasicInfoCard"
import AssignTeacherCard from "@/app/components/classes/AssignTeacherCard"
import ClassTeacherCard from "@/app/components/classes/ClassTeacherCard"
import EnrollStudentsToClassCard from "@/app/components/classes/EnrollStudentToClassCard"
import InfoCard from "@/app/components/ui/infoCard"
import LoadingSpinner from "@/app/components/ui/LoadingSpinner"
import PageTitle from "@/app/components/ui/PageTitle"
import { CourseRecord } from "@/types/Course"
import { TeacherRecord } from "@/types/Teacher"
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
            <PageTitle title={`Class: ${course.className}`}/>
        
            <main className="min-h-0 overflow-y-auto flex flex-1 flex-col gap-5">
                <div className="w-full flex justify-around gap-1">
                    <BasicInfoCard id={id} type="class"/>
                    <ClassTeacherCard id={id}/>
                </div>
                <EnrollStudentsToClassCard id={id}/>
                <AssignTeacherCard id={id}/>


            </main>
        </div>
    )

}