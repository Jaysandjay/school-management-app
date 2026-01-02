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
            { key: "teacherId", label: "ID" },
            { key: "firstName", label: "First Name" },
            { key: "lastName", label: "Last Name" },
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
            urls="/teachers"
            idField="teacherId"
            />
            }
        </div>
    )
}