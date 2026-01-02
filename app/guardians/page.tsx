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
            { key: "guardianId", label: "ID" },
            { key: "firstName", label: "First Name" },
            { key: "lastName", label: "Last Name" },
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
            idField="guardianId"
            />
            }
        </div>
    )
}