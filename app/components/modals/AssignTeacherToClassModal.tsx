import { useState } from "react"
import BasicModalContainer from "./ui/BasicModalContainer"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  enrollStudent } from "@/api/students";
import PrimaryButton from "../ui/PrimaryButton";
import { CourseRecord } from "@/types/Course";
import { assignClassTeacher } from "@/api/classes";
import { TeacherRecord } from "@/types/Teacher";

interface AssignTeacherToClassModalProps {
    classId: number,
    teacher: TeacherRecord,
    isOpen: boolean,
    onClose: () => void;
}

interface AssignVariables {
    classId: number
    teacherId: number,
}

export default function AssignTeacherToClassModal ({classId, teacher, isOpen, onClose}: AssignTeacherToClassModalProps) {
    const [isSuccessfullyAssigned, setIsSuccessfullyAssigned] = useState(false)
    const teacherId = teacher.teacherId
    const queryClient = useQueryClient()

    
    const mutation = useMutation({
    mutationFn: ({classId, teacherId}: AssignVariables) => assignClassTeacher(classId, teacherId),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["class-teacher", classId]})
    }
    })
    
    async function AssignTeacher(){
        try {
            await mutation.mutateAsync({classId: classId, teacherId: teacherId})
            setIsSuccessfullyAssigned(true)
        }catch(err){
            console.error(err)
        }
    }
    
    if(!isOpen) return null

    return (
        <BasicModalContainer >
             {teacher ? (
            <>

            {isSuccessfullyAssigned ? (
                <h2>Successfully assigned!</h2>
            ) : (
                <h2>Are you sure you want to assign {teacher.firstName} {teacher.lastName} to class?</h2>
            )}

            <div>
                {isSuccessfullyAssigned ? (
                <PrimaryButton
                    title="Close"
                    color="bg-slate-500"
                    onclick={() => {
                        onClose()
                        setIsSuccessfullyAssigned(false)
                    }}
                />
                ) : (
                <>
                    <PrimaryButton
                    title="Cancel"
                    color="bg-slate-500"
                    onclick={onClose}
                
                    />
                    <PrimaryButton
                    title="Assign"
                    color="bg-green-600"
                    onclick={AssignTeacher}
                    />
                </>
                )}
            </div>
            </>
        ) : (
            <h1>Error, Teacher not found</h1>
        )}
        </BasicModalContainer>
    )
}