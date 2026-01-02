import { GuardianRelationship } from "@/types/GuardianRelationship"
import { useState } from "react"
import BasicModalContainer from "./BasicModalContainer"
import { Guardian, GuardianRecord } from "@/types/Guardian";
import FormDropDownInput from "../forms/formComponents/FormDropdownInput";
import PrimaryButton from "../ui/PrimaryButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StudentGuardian } from "@/types/StudentGuardian";
import { assignStudentGuardian } from "@/api/students";

interface AssignGuardianModalProps {
    guardian: GuardianRecord,
    studentId: number,
    isOpen: boolean,
    onClose: () => void;
}

export default function AssignGuardianModal ({guardian, studentId, isOpen, onClose}: AssignGuardianModalProps) {
    const [relationship, setRelationship] = useState<GuardianRelationship>("Mother")
    const [isSuccessfullyAssigned, setIsSuccessfullyAssigned] = useState(false)
      
    const queryClient = useQueryClient()

    const mutation = useMutation({
    mutationFn: (studentGuardianInfo: StudentGuardian ) => assignStudentGuardian(studentGuardianInfo),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["student-guardians", studentId]})
        }
    })

    async function assignGuardian(){
        try {
            await mutation.mutateAsync({
                studentId,
                guardianId: guardian.guardianId,
                relationship
            })
            setIsSuccessfullyAssigned(true)
        }catch(err){
            console.error(err)
        }
    }

    const relationshipOptions = [
        {value: "Mother", label: "Mother"},
        {value: "Father", label: "Father"},
        {value: "Legal Guardian", label: "Legal Guardian"},
        {value: "Other", label: "Other"},
    ]


    if(!isOpen) return null

    return (
        <BasicModalContainer>
            <h3>Assign {guardian.firstName} {guardian.lastName} as Guardian</h3>
            {isSuccessfullyAssigned ? (
                <h2>Guardian has been assigned</h2>
            ):(
                <FormDropDownInput
                    label="Relationship"
                    name="relationship"
                    value={relationship}
                    options={relationshipOptions}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRelationship(e.target.value as GuardianRelationship)}
                />
            )}
            <div>
                <PrimaryButton title="Close" color="bg-red-600" onclick={onClose}/>
                {!isSuccessfullyAssigned && 
                <PrimaryButton title="Assign" color="bg-green-500" onclick={()=>assignGuardian()}/>
                }
            </div>
        </BasicModalContainer>
    )
}