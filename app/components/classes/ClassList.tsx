"use client"

import { useQuery } from "@tanstack/react-query"
import Table from "../ui/Table"
import { fetchClasses } from "@/api/classes"
import { CourseRecord } from "@/types/Course"



export default function ClassList() {

    const {data = [], isLoading, isError, error} = useQuery<CourseRecord[]>({
        queryKey:["classes"],
        queryFn: fetchClasses
    })
    const columns = [
            { key: "classId", label: "ID" },
            { key: "className", label: "Name" },
            { key: "gradeLevel", label: "Grade Level" },
            { key: "numStudents", label: "Enrolled"},
            { key: "capacity", label: "Capacity"},
            ] as const

    return (
        <div>
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