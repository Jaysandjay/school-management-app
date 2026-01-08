"use client"

import { getTeacher, updateTeacher } from "@/api/teachers"
import AddressCard from "@/app/components/cards/AddressCard"
import BasicInfoCard from "@/app/components/cards/BasicInfoCard"
import RemoveButon from "@/app/components/RemoveButton"
import TeacherClassesCard from "@/app/components/teachers/TeacherClassesCard"
import LoadingSpinner from "@/app/components/ui/LoadingSpinner"
import PageTitle from "@/app/components/ui/PageTitle"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"


export default function TeacherPage(){

    const params = useParams()
    const id = Number(params?.id)
    const {data: teacher, isLoading, isError, error} = useQuery({
        queryKey: ["teacher", id],
        queryFn: () => getTeacher(Number(id)),
        enabled: !!id
    })
 
    if (isLoading) return <LoadingSpinner/>
    if (isError) return <p>Error: {(error as Error).message}</p>
    if (!teacher) return <p>No student found</p>


    return (
        <div className="flex-col flex h-full">
            <div className="flex justify-between w-full mb-2 items-center">
                <PageTitle title={`Teacher: ${teacher.firstName} ${teacher.lastName}`}/>
                <RemoveButon id={id} type="teacher"/>
            </div>
            <main className="min-h-0 overflow-y-auto flex flex-1 flex-col gap-5">
                <div className="w-full flex justify-around gap-1">
                    <BasicInfoCard id={id} type="teacher"/>
                    <AddressCard id={id} personType="teacher"/>
                </div>
                <TeacherClassesCard id={id}/>
                             
           
            </main>
        </div>
    )
}