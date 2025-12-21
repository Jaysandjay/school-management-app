const API_URL = process.env.NEXT_PUBLIC_API_URL



export async function fetchGuardians() {
    console.log("Fetching guardians....")
    const res = await(fetch(`${API_URL}/guardians`))
    if (!res.ok) throw new Error("Failed to fetch students")
    const guardians = await res.json()

    console.log(guardians)
    return guardians
}