"use client"
import { useState } from "react"
import PrimaryButton from "../ui/PrimaryButton"
import BasicContainer from "../ui/BasicContainer"
import GuardianList from "../guardians/GuardianList"
import StudentGuardiansList from "./StudentGuardiansList"

interface StudentGuardianProps {
    id: number
}

export default function StudentGuardians({id}: StudentGuardianProps){
    const [isViewingAssignableGuardians, setIsViewingAssignableGuardians] = useState(false)

    return (
        <BasicContainer title="Guardians" width="w-full">

            {isViewingAssignableGuardians ? (
                <GuardianList studentId={id}/>  
            ):
                <StudentGuardiansList id={id}/>
            }
                <div className="mt-5 w-full flex justify-end">
                    {isViewingAssignableGuardians ? (
                        <PrimaryButton title="Cancel" color="bg-red-500" onclick={() => setIsViewingAssignableGuardians(!isViewingAssignableGuardians)}/>
                    ):(
                        <PrimaryButton title="Assign Guardian" onclick={ ()=> setIsViewingAssignableGuardians(!isViewingAssignableGuardians)}/>
                    )}
                </div>
            
        </BasicContainer>
    )
}