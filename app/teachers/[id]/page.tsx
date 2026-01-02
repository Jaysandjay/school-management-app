"use client"

import { getTeacher, updateTeacher } from "@/api/teachers"
import TeacherDetailsForm from "@/app/components/forms/TeacherDetailsForm"
import InfoCard from "@/app/components/ui/infoCard"
import LoadingSpinner from "@/app/components/ui/LoadingSpinner"
import PageTitle from "@/app/components/ui/PageTitle"
import { Teacher, TeacherRecord } from "@/types/Teacher"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useState } from "react"


export default function TeacherPage(){
    const [isEditingDetails, setIsEdtiingDetails] = useState(false)
    const params = useParams()
    const id = params?.id
    const queryClient = useQueryClient()

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["teacher", id],
        queryFn: () => getTeacher(Number(id)),
        enabled: !!id
    })
    const mutation = useMutation({
        mutationFn: (updatedTeacher: Teacher) => updateTeacher(Number(id), updatedTeacher),
        onSuccess:  () => {
            queryClient.invalidateQueries({queryKey: ["teacher", id]}),
            queryClient.invalidateQueries({queryKey: ["teachers"]}),
            setIsEdtiingDetails(false)
        }
    })
    if (isLoading) return <LoadingSpinner/>
    if (isError) return <p>Error: {(error as Error).message}</p>
    if (!data) return <p>No student found</p>

    const teacher: TeacherRecord = data as TeacherRecord
    
    const basicInfo = {
        "First Name:": teacher.firstName,
        "Last Name:": teacher.lastName,
        "Phone:": teacher.phone,
        "Email:": teacher.email
    }

    function toggleEdit(){
        setIsEdtiingDetails(!isEditingDetails)
    }

    return (
        <div className="flex-col">
            <PageTitle title={`Teacher: ${teacher.firstName} ${teacher.lastName}`}/>
            <main className="overflow-y-scroll h-full">
                {isEditingDetails ? (
                    <TeacherDetailsForm
                    title="Edit Teacher"
                    currentTeacher={teacher}
                    onSubmit={async (updatedTeacher) => {
                        await mutation.mutateAsync(updatedTeacher)
                    }}
                    successMessage={(t) => `Details have been edited`}
                    toggle={toggleEdit}
                    />
                ):(
                    <InfoCard data={basicInfo} toggle={toggleEdit}/>
                )}
                {mutation.isPending && <LoadingSpinner/>}
            </main>
        </div>
    )
}