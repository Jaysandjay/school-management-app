"use client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {  getStudentGuardians } from "@/api/students"
import LoadingSpinner from "@/app/components/ui/LoadingSpinner"
import { useState } from "react"
import Table from "../ui/Table"
import RemoveGuardianModal from "../modals/RemoveGuardianModal"
import { StudentGuardianView } from "@/types/StudentGuardianView"

interface StudentGuardianListProps {
    id: number
}

export default function StudentGuardiansList({id}: StudentGuardianListProps){
    const [isRemovingGuardian, setIsRemovingGuardian] = useState(false)
    const [selectedGuardian, setSelectedGuardian] = useState<StudentGuardianView | null>(null)


    const {data: studentGuardians = [], isLoading, isError, error} = useQuery<StudentGuardianView[]>({
        queryKey: ["student-guardians", id],
        queryFn: ()=>getStudentGuardians(Number(id)),
        enabled: !!id
    })

    if(isLoading) return <LoadingSpinner/>

       const studentGuardianscolumns = [
            { key: "firstName", label: "First Name" },
            { key: "lastName", label: "Last Name" },
            { key: "relationship", label: "Relationship"},
        ] as const

    

    return (
        <>
        {isError && <p>Error..</p>}
            {studentGuardians.length !== 0? (
                <Table
                columns={studentGuardianscolumns}
                rows={studentGuardians}
                urls="/guardians"
                idField="guardianId"
                button={(row) => {
                    setSelectedGuardian(row)
                    setIsRemovingGuardian(true)

                }}
                addButtonColor="bg-red-600"
                addButtonTitle="Remove"
                />          
            ):
            <div className="w-full flex justify-center h-50 items-center">
                <h3 className="text-red-600">No guardians assigned</h3>
            </div>
        }
        {selectedGuardian && 
            <RemoveGuardianModal
            isOpen={isRemovingGuardian}
            studentId={id}
            guardianRelation={selectedGuardian}
            onClose={() => setIsRemovingGuardian(false)}
            />        
        }
        </>


 
    )
}