"use client"
import FormContainer from "./formComponents/FormContainer"
import FormDropDownInput from "./formComponents/FormDropdownInput"
import FormInput from "./formComponents/FormInput"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import SuccessModal from "../modals/SuccessModal"
import LoadingSpinner from "../ui/LoadingSpinner"
import { addGuardian } from "@/api/guardians"
import { Guardian } from "@/types/Guardian"


export default function GuardianDetailsForm(){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: addGuardian,
        onSuccess: () => {queryClient.invalidateQueries({queryKey: ["guardians"]})},
        onError:(err)=> console.error(err)
    })

    function clearInputs(){
        setFirstName("")
        setLastName("")
        setPhone("")
        setEmail("")
    }

    async function submit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const guardian: Guardian = {
            firstName,
            lastName,
            phone,
            email
        }
        try {
            await mutation.mutateAsync(guardian)
            console.log("Guardian Added", guardian)
            setIsSuccessModalOpen(true)
        }catch(err){
            console.error(err)
        }
    }

  return (
    
    <FormContainer title="Add Guardian" submit={submit}>
        <FormInput
        label="First Name"
        name="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        />
        <FormInput
        label="Last Name"
        name="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        />
        <FormInput
        label="Phone"
        name="phone"
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        />
        <FormInput
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
       
        {mutation.isPending && <LoadingSpinner/> }
       {mutation.error && "Error Adding Guardian"}
       <SuccessModal
       title="Guardian Added"
       message={`${firstName} ${lastName} has been registered`}
       isOpen={isSuccessModalOpen}
       onClose={()=>{
        setIsSuccessModalOpen(false)
        clearInputs()
        }}
       />
    </FormContainer>

    )
}