"use client"

import { useQuery } from "@tanstack/react-query"
import Table from "../ui/Table"
import { fetchTeachers } from "@/api/teachers"
import { TeacherRecord } from "@/types/Teacher"
import EmptyMessage from "../cards/EmptyMessage"
import { useState } from "react"
import AssignTeacherToClassModal from "../modals/AssignTeacherToClassModal"
import PrimaryButton from "../ui/PrimaryButton"
import RemoveTeacherFromClassModal from "../modals/RemoveTeacherFromClassModal"
import { getClassTeacher } from "@/api/classes"

interface TeacherListProps {
    id?: number,
    height?: string
}

export default function TeacherList({id, height}: TeacherListProps) {
    const [selectedTeacher, setSelectedTeacher] = useState<TeacherRecord | null>(null)
    const [isAssiginingTeacher, setIsAssigningTeacher] = useState(false)
    const [isRemovingTeacher, setIsRemovingTeacher] = useState(false)

    const {data, isLoading, isError, error} = useQuery<TeacherRecord[]>({
        queryKey: id ? ["class-teachers", id] : ["teachers"],
        queryFn: () => fetchTeachers(),
        enabled: !!id
    })
    const {data: assignedTeacher} = useQuery<TeacherRecord>({
            queryKey: ["class-teacher", id],
            queryFn: () => getClassTeacher(id!),
            enabled: !!id
        })
    const columns = [
            { key: "teacherId", label: "ID" },
            { key: "firstName", label: "First Name" },
            { key: "lastName", label: "Last Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            ] as const
        

    return (
        <div className="flex flex-col">
            {isError && <p>Error..</p>}
            {isLoading ? <p>Loading...</p>:
            data ? (
                <Table
                columns={columns}
                rows={data}
                urls="/teachers"
                idField="teacherId"
                addButtonColor="bg-green-600"
                addButtonOnClick={(row)=> {
                    setSelectedTeacher(row)
                    setIsAssigningTeacher(true)
                    setIsRemovingTeacher(false)
                }}
                addButtonTitle="Assign"
                maxHeight={height}
                />

            ):(
                <EmptyMessage message="No available Teachers"/>
            )
            }
            {assignedTeacher && (
                <div className="w-full flex justify-end mt-1">
                    <PrimaryButton title="Remove Assigned Teacher" color="bg-red-600" onclick={() => setIsRemovingTeacher(true)}/>
                </div>

            )}
           
            {isAssiginingTeacher && id && selectedTeacher &&
                <AssignTeacherToClassModal 
                classId={id} 
                teacher={selectedTeacher}
                isOpen={isAssiginingTeacher}
                onClose={() => setIsAssigningTeacher(false)}
                />
            }
            {isRemovingTeacher && id && assignedTeacher &&
                <RemoveTeacherFromClassModal
                classId={id}
                teacher={assignedTeacher}
                isOpen={isRemovingTeacher}
                onClose={() => setIsRemovingTeacher(false)}
                />
            }
        </div>
    )
}