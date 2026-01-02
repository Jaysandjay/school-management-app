import { useQuery } from "@tanstack/react-query"
import BasicContainer from "../ui/BasicContainer"
import Table from "../ui/Table"
import LoadingSpinner from "../ui/LoadingSpinner"
import { getStudentEnrollments } from "@/api/students"
import PrimaryButton from "../ui/PrimaryButton"

interface StudentEnrollmentsProps {
    id: number
}

export default function StudentEnrollments({id}: StudentEnrollmentsProps) {

     const {data, isLoading, isError, error} = useQuery({
        queryKey:["studentEnrollments", id],
        queryFn: () =>  getStudentEnrollments(id),
        enabled: !!id
    })

    const columns = [
            { key: "classId", label: "ID" },
            { key: "className", label: "Name" },
            { key: "teacherId", label: "Teacher"}
            ]
    

    return (
        <BasicContainer title="Enrollments" isLoading={isLoading}>
            {isError && <p>Error..</p>}
                {data ? (
                    <Table
                    columns={columns}
                    rows={data}
                    urls="/classes"
                    idField="classId"
                    />          
                ):
                <div className="w-full flex justify-center h-50 items-center">
                    <h3 className="text-red-600">Not currently enrolled in any classes</h3>
                </div>
            }
                <div className="mt-5 w-full flex justify-end">
                    <PrimaryButton title="Add Course"/>
                </div>
                
            
        </BasicContainer>
    )
}