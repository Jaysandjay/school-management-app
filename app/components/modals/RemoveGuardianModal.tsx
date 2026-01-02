import { useState } from "react"
import BasicModalContainer from "./BasicModalContainer"
import { Guardian, GuardianRecord } from "@/types/Guardian";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { removeStudentGuardian } from "@/api/students";
import PrimaryButton from "../ui/PrimaryButton";
import { StudentGuardian } from "@/types/StudentGuardian";
import { getGuardian } from "@/api/guardians";
import LoadingSpinner from "../ui/LoadingSpinner";

interface RemoveGuardianModalProps {
    guardianRelation: StudentGuardian,
    studentId: number,
    isOpen: boolean,
    onClose: () => void;
}

interface RemoveGuardianVariables {
    studentId: number,
    guardianId: number
}

export default function RemoveGuardianModal ({guardianRelation, studentId, isOpen, onClose}: RemoveGuardianModalProps) {
    const [isSuccessfullyRemoved, setIsSuccessfullyRemoved] = useState(false)
    const guardianId = guardianRelation.guardianId
    const queryClient = useQueryClient()

    const {data: guardian, isLoading, isError, error} = useQuery<Guardian>({
        queryKey: ["guardian", guardianId],
        queryFn: ()=>getGuardian(guardianId),
        enabled: typeof guardianId === "number"
    })
    
    const mutation = useMutation({
    mutationFn: ({studentId, guardianId}: RemoveGuardianVariables) => removeStudentGuardian(studentId, guardianId),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["student-guardians", studentId]})
        }
    })
    
    async function removeGuardian(guardianId: number){
        try {
            await mutation.mutateAsync({studentId: studentId, guardianId: guardianId})
            setIsSuccessfullyRemoved(true)
        }catch(err){
            console.error(err)
        }
    }
    
    
    
    if(isLoading) return <LoadingSpinner/>
    if(!isOpen) return null

    return (
        <BasicModalContainer >
             {guardian ? (
            <>
            <h3>
                Remove {guardian.firstName} {guardian.lastName} as Guardian
            </h3>

            {isSuccessfullyRemoved ? (
                <h2>Guardian has been removed</h2>
            ) : (
                <h2>Are you sure you want to remove this guardian?</h2>
            )}

            <div>
                {!isSuccessfullyRemoved ? (
                <PrimaryButton
                    title="Close"
                    color="bg-slate-500"
                    onclick={onClose}
                />
                ) : (
                <>
                    <PrimaryButton
                    title="Cancel"
                    color="bg-slate-500"
                    onclick={onClose}
                    />
                    <PrimaryButton
                    title="Remove"
                    color="bg-red-600"
                    onclick={()=>removeGuardian(guardianId)}
                    />
                </>
                )}
            </div>
            </>
        ) : (
            <h1>Error, guardian not found</h1>
        )}
        </BasicModalContainer>
    )
}