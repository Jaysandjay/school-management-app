"use client"

import { getGuardian } from "@/api/guardians"
import AddressCard from "@/app/components/cards/AddressCard"
import BasicInfoCard from "@/app/components/cards/BasicInfoCard"
import AssignedStudentsToGuardianCard from "@/app/components/guardians/AssignedStudentsToGuardianCard"
import RemoveButon from "@/app/components/RemoveButton"
import LoadingSpinner from "@/app/components/ui/LoadingSpinner"
import PageTitle from "@/app/components/ui/PageTitle"
import { GuardianRecord } from "@/types/Guardian"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"



export default function GuardianPage(){
    const params = useParams()
    const id = Number(params?.id)

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["guardian", id],
        queryFn: ()=>getGuardian(id),
        enabled: !!id
    })

    if (isLoading) return <LoadingSpinner/>
    if (isError) return <p>Error: {(error as Error).message}</p>
    if (!data) return <p>No student found</p>

    const guardian: GuardianRecord = data as GuardianRecord

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between w-full mb-2 items-center">
                <PageTitle title={`Guardian: ${guardian.firstName} ${guardian.lastName}`}/>
                <RemoveButon id={id} type="guardian"/>
            </div>
            <main className="min-h-0 overflow-y-auto flex flex-1 flex-col gap-5">
            <div className="w-full flex justify-around gap-1">
                <BasicInfoCard id={id} type="guardian"/>
                <AddressCard id={id} personType="guardian"/>
            </div>
                <AssignedStudentsToGuardianCard id={id}/>
            
        
            </main>
            
        </div>
    )
}