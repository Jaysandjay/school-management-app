import { Address } from "@/types/Address"
import { Teacher } from "@/types/Teacher"

const API_URL = process.env.NEXT_PUBLIC_API_URL



export async function fetchTeachers() {
    console.log("Fetching teachers....")
    const res = await(fetch(`${API_URL}/teachers`))
    if (!res.ok) throw new Error("Failed to fetch teachers")
    const data = await res.json()
    console.log(data)
    return data
}

export async function addTeacher(teacher: Teacher) {
    console.log("Adding Student....")
    const res = await fetch(`${API_URL}/teachers`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(teacher)
    })
    if(!res.ok) throw new Error("Error adding teacher")
    console.log("Teacher Added", teacher)
}

export async function getTeacher(teacherId: number) {
    console.log("Getting Teacher...")
    const res = await fetch(`${API_URL}/teachers/${teacherId}`)
    if(!res.ok) throw new Error("Error getting teacher")
    const teacher = await res.json()
    return teacher
}

export async function updateTeacher(teacherId: number, teacher: Teacher){  
    console.log("Updating Teacher...")
    const res = await fetch(`${API_URL}/teachers/${teacherId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(teacher)
    })
    if(!res.ok) throw new Error("Error updating teacher")
    console.log('Teacher Updated', teacher)
}

export async function getTeacherClasses(teacherId: number){
    return []
}

export async function getAvailableTeacherClasses(teacherId: number){
    return []
}

export async function getTeacherAddress(teacherId: number){
    console.log("Getting Teacher Address....")
    const res = await fetch(`${API_URL}/teachers/${teacherId}/address`)
}

export async function updateTeacherAddress(teacherId: number, updatedAddress: Address){
    console.log("Updating Teacher Address....")
    const res = await fetch(`${API_URL}/teachers/${teacherId}/address`)
}
export async function addTeacherAddress(teacherId: number, updatedAddress: Address){
    console.log("Adding Teacher Address....")
    const res = await fetch(`${API_URL}/teachers/${teacherId}/address`)
}
