"use client"

import { useQuery } from "@tanstack/react-query"
import Table from "../components/ui/Table"
import { fetchStudents } from "@/api/students"
import PageTitle from "../components/ui/PageTitle"

export default function StudentPage() {

    const {data, isLoading, isError, error} = useQuery({
        queryKey:["students"],
        queryFn: fetchStudents
    })
    const columns = [
            { key: "student_id", label: "ID" },
            { key: "first_name", label: "First Name" },
            { key: "last_name", label: "Last Name" },
            { key: "date_of_birth", label: "D.O.B" },
            { key: "grade_level", label: "Grade Level" },
            ]


    return (
        <div>
            <PageTitle title="Student Record"/>
            {isError && <p>Error..</p>}
            {isLoading ? <p>Loading...</p>:

            <Table
            columns={columns}
            rows={data}
            urls="/student"
            idField="student_id"
            />
            }
        </div>
    )
}