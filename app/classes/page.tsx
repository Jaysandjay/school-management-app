"use client"

import { useQuery } from "@tanstack/react-query"
import Table from "../components/ui/Table"
import { fetchClasses } from "@/api/classes"
import PageTitle from "../components/ui/PageTitle"

export default function ClassesPage() {

    const {data, isLoading, isError, error} = useQuery({
        queryKey:["classes"],
        queryFn: fetchClasses
    })
    const columns = [
            { key: "classId", label: "ID" },
            { key: "className", label: "Name" },
            { key: "teacherId", label: "Teacher"}
            ]

    return (
        <div>
            <PageTitle title="Class Records"/>
            {isError && <p>Error..</p>}
            {isLoading ? <p>Loading...</p>:

            <Table
            columns={columns}
            rows={data}
            urls="/classes"
            idField="classId"
            />
            }
        </div>
    )
}