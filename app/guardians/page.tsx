"use client"

import { useQuery } from "@tanstack/react-query"
import Table from "../components/ui/Table"
import { fetchGuardians } from "@/api/guardians"
import PageTitle from "../components/ui/PageTitle"

export default function GuardiansPage() {

    const {data, isLoading, isError, error} = useQuery({
        queryKey:["guardian"],
        queryFn: fetchGuardians
    })
    const columns = [
            { key: "guardian_id", label: "ID" },
            { key: "first_name", label: "First Name" },
            { key: "last_name", label: "Last Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            ]


    return (
        <div>
            <PageTitle title="Guardian Records"/>
            {isError && <p>Error..</p>}
            {isLoading ? <p>Loading...</p>:

            <Table
            columns={columns}
            rows={data}
            urls="/guardians"
            idField="guardian_id"
            />
            }
        </div>
    )
}