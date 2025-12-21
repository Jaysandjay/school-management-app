"use client"
import type { Student } from "@/types/Student"
import { addStudent } from "@/api/students"
import FormContainer from "./formComponents/FormContainer"
import FormDropDownInput from "./formComponents/FormDropdownInput"
import FormInput from "./formComponents/FormInput"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import SuccessModal from "../modals/SuccessModal"
import LoadingSpinner from "../ui/LoadingSpinner"

export default function AddStudentForm(){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [dateOfBirth, setDob] = useState("")
    const [gradeLevel, setGradeLevel] = useState(9)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: addStudent,
        onSuccess: () => {queryClient.invalidateQueries({queryKey: ["students"]})},
        onError:(err)=> console.error("Error adding student", err)
    })

    function clearInputs(){
        setFirstName("")
        setLastName("")
        setDob("")
        setGradeLevel(9)
    }

    async function submit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const student: Student = {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            gradeLevel
        }
        try {
            await mutation.mutateAsync(student)
            console.log("Student Added", student)
            setIsSuccessModalOpen(true)
        }catch(err){
            console.error(err)
        }
    }

  return (
    
    <FormContainer title="Add Student" submit={submit}>
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
        label="Date of Birth"
        name="dob"
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDob(e.target.value)}
        />
        <FormDropDownInput
        label="Grade Level"
        name="gradeLevel"
        options={[
            {value: "9", label: "9"},
            {value: "10", label: "10"},
            {value: "11", label: "11"},
            {value: "12", label: "12"},
        ]}
        value={gradeLevel}
        onChange={(e)=>setGradeLevel(parseInt(e.target.value))}
        />
        {mutation.isPending && <LoadingSpinner/> }
       {mutation.error && "Error Adding Student"}
       <SuccessModal
       title="Student Added"
       message={`${firstName} ${lastName} has been registered`}
       isOpen={isSuccessModalOpen}
       onClose={()=>{
        setIsSuccessModalOpen(false)
        clearInputs()
        }}
       />
    </FormContainer>




    // <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm p-6 w-full max-w-md">
    //   <h2 className="text-xl font-semibold mb-4">Title</h2>

    //   <form onSubmit={()=> console.log()} className="flex flex-col gap-4">
    //       <div className="flex flex-col">
    //         <label className="text-sm font-medium text-slate-700 mb-1">Label</label>
    //         <input
    //           type= "text"
    //           name="name"
    //           placeholder="placeholder"
    //           value=""
    //           onChange={()=>console.log()}
    //           className="px-4 py-2 border border-slate-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
    //         />
    //       </div>

    //     <button
    //       type="submit"
    //       className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-sm text-sm font-medium"
    //     >
    //       Add
    //     </button>
    //   </form>
    // </div>   
    )
}