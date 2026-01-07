"use client"

import BasicContainer from "../ui/BasicContainer"
import Table from "../ui/Table"
import { StudentGrade } from "@/types/StudentGrade"

interface StudentGradesCardProps {
    studentId: number
}

export default function StudentGradesCard({studentId}: StudentGradesCardProps){

    const dummydata: StudentGrade[] = [
        {classId: 100, className: "Math", grade: 75},
        {classId: 101, className: "Math", grade: 75},
        {classId: 102, className: "Math", grade: 60},
        {classId: 103, className: "Math", grade: 35},
        {classId: 104, className: "Math", grade: 20},
    ]

    const columns = [
        {key: "classId", label: "ID" },
        {key: "className", label: "Class" },
        {key: "grade", label: "Current Grade" },
    ] as const

    const total = dummydata.reduce((sum, item) => sum + item.grade, 0)
    const average = total / dummydata.length
    

    return (
        <BasicContainer title="Grades" subtitle={`Average: ${average}%`}>
            <Table
            columns={columns}
            rows={dummydata}
            idField={"classId"}
            maxHeight="max-h-50"
            searchBar={false}
            />

        </BasicContainer>
    )
}