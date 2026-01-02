"use client"

import { useQuery } from "@tanstack/react-query"
import Table from "../components/ui/Table"
import { fetchStudents } from "@/api/students"
import PageTitle from "../components/ui/PageTitle"
import LoadingSpinner from "../components/ui/LoadingSpinner"

export default function StudentPage() {

    const {data, isLoading, isError, error} = useQuery({
        queryKey:["students"],
        queryFn: fetchStudents
    })
    const columns = [
            { key: "studentId", label: "ID" },
            { key: "firstName", label: "First Name" },
            { key: "lastName", label: "Last Name" },
            { key: "dateOfBirth", label: "D.O.B" },
            { key: "gradeLevel", label: "Grade Level" },
            ]
    if (isLoading) return <LoadingSpinner/>
    if (isError) return <p>Error: {(error as Error).message}</p>
    if (!data) return <p>No student found</p>


    return (
        <div>
            <PageTitle title="Student Record"/>

            <Table
            columns={columns}
            rows={data}
            urls="/students"
            idField="studentId"
            />

        </div>
    )
}