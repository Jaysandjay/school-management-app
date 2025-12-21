const API_URL = process.env.NEXT_PUBLIC_API_URL



export async function fetchClasses() {
    console.log("Fetching classes....")
    const res = await(fetch(`${API_URL}/classes`))
    if (!res.ok) throw new Error("Failed to fetch classes")
    const data = await res.json()
    console.log(data)
    return data
}