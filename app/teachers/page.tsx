"use client"

import { useQuery } from "@tanstack/react-query"
import Table from "../components/ui/Table"
import { fetchTeachers } from "@/api/teachers"
import PageTitle from "../components/ui/PageTitle"

export default function TeachersPage() {

    const {data, isLoading, isError, error} = useQuery({
        queryKey:["teachers"],
        queryFn: fetchTeachers
    })
    const columns = [
            { key: "teacher_id", label: "ID" },
            { key: "first_name", label: "First Name" },
            { key: "last_name", label: "Last Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            ]
        

    return (
        <div>
            <PageTitle title="Teacher Records"/>
            {isError && <p>Error..</p>}
            {isLoading ? <p>Loading...</p>:

            <Table
            columns={columns}
            rows={data}
            urls="/teacher"
            idField="teacher_id"
            />
            }
        </div>
    )
}