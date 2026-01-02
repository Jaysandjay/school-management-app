import { Course } from "@/types/Course"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchClasses() {
    console.log("Fetching classes....")
    const res = await(fetch(`${API_URL}/classes`))
    if (!res.ok) throw new Error("Failed to fetch classes")
    const data = await res.json()
    console.log(data)
    return data
}

export async function addCourse(course:Course) {
    console.log("Adding Course....")
    const res = await fetch(`${API_URL}/classes`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(course)
    })
    if(!res.ok) throw new Error("Error adding Course")
    console.log("Course Added", course)
}