"use client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { addStudentAddress, getStudentAddress, updateStudentAddress } from "@/api/students"
import LoadingSpinner from "@/app/components/ui/LoadingSpinner"
import InfoCard from "@/app/components/ui/infoCard"
import { useState } from "react"
import AddressForm from "../forms/AddressForm"
import { Address, AddressRecord } from "@/types/Address"

interface StudentAddressProps {
    studentId: number,
}

export default function StudentAddress({studentId}: StudentAddressProps){
    const [isEditingDetails, setIsEditingDetails] = useState(false)
  
    const queryClient = useQueryClient()

    const {data: address, isLoading, isError, error} = useQuery<Address | null>({
        queryKey: ["student-address", studentId],
        queryFn: ()=>getStudentAddress(Number(studentId)),
        enabled: !!studentId
    })
    
    
    const mutation = useMutation({
        mutationFn: (updatedAddress: Address) => {
            if(address){
               return updateStudentAddress(Number(studentId), updatedAddress)
            } else {
                return addStudentAddress(studentId, updatedAddress)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["student-address", studentId]})
            setIsEditingDetails(false)
        }
    })
    if (isError) return <p>Error: {(error as Error).message}</p>
    
    const basicInfo = {
        "Street:": address ? address.street : "",
        "City:": address ? address.city : "",
        "Province: ": address ? address.province : "",
        "Postal Code: ": address? address.postalCode : ""
    }

    function toggleEdit(){
        setIsEditingDetails(!isEditingDetails)
    }

    function addressInfo(){
        if(address) return <InfoCard title="Address" data={basicInfo} toggle={toggleEdit}/>
        return <InfoCard title="Address" toggle={toggleEdit}/>
    }


    return (
        <>
        {isEditingDetails ? (
            <AddressForm
            currentAddress={address}
            onSubmit={async (updatedAddress) => {
                await mutation.mutateAsync(updatedAddress)
            }}
            toggle={toggleEdit}
            />):
        ( address? <InfoCard title="Address" data={basicInfo} toggle={toggleEdit} isLoading={isLoading}/>:
        <InfoCard title="Address" toggle={toggleEdit} isLoading={isLoading}/> 

        )}
        {mutation.isPending && <LoadingSpinner/>}
        </>
    )
}