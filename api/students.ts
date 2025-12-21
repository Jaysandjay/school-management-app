import { Student } from "@/types/Student"

const API_URL = process.env.NEXT_PUBLIC_API_URL



export async function fetchStudents() {
    console.log("Fetching students....")
    const res = await(fetch(`${API_URL}/students`))
    if (!res.ok) throw new Error("Failed to fetch students")
    const data = await res.json()
    const students = data.map((student: any) => ({
        ...student,
        date_of_birth: student.date_of_birth ?
        new Date(student.date_of_birth).toISOString().slice(0, 10)
        :null
    }))

    console.log(students)
    return students
}

export async function addStudent(student:Student) {
    console.log("Adding Student....")
    const res = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(student)
    })
    if(!res.ok) throw new Error("Error adding Student")
    console.log("Student Added", student)
}