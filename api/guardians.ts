import { Guardian } from "@/types/Guardian"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchGuardians() {
    console.log("Fetching guardians....")
    const res = await(fetch(`${API_URL}/guardians`))
    if (!res.ok) throw new Error("Failed to fetch students")
    const guardians = await res.json()

    console.log(guardians)
    return guardians
}

export async function addGuardian(guardian: Guardian) {
    console.log("Adding Guardian....")
    const res = await fetch(`${API_URL}/guardians`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(guardian)
    })
    if(!res.ok) throw new Error("Error adding guardian")
    console.log("Guardian Added", guardian)
}

export async function getGuardian(guardianId: number){
    console.log("Getting Guardian....")
    const res = await fetch(`${API_URL}/guardians/${guardianId}`)
    if(!res.ok) throw new Error("Error getting guardian")
    const guardian = await res.json()    
    console.log("Guardian:", guardian)
    return guardian
}