"use client"
import PageTitle from "../components/ui/PageTitle"
import StudentList from "../components/students/StudentList"

export default function StudentPage() {

    return (
        <div className="flex flex-col h-full">
            <PageTitle title="Student Record"/>

            <StudentList/>

        </div>
    )
}