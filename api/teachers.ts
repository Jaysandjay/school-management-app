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

export async function getTeacher(id:number) {
    console.log("Getting Teacher...")
    const res = await fetch(`${API_URL}/teachers/${id}`)
    if(!res.ok) throw new Error("Error getting teacher")
    const teacher = await res.json()
    return teacher
}

export async function updateTeacher(id: number, teacher: Teacher){  
    console.log("Updating Teacher...")
    const res = await fetch(`${API_URL}/teachers/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(teacher)
    })
    if(!res.ok) throw new Error("Error updating teacher")
    console.log('Teacher Updated', teacher)
}