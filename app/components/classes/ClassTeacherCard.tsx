"useClient"
import { useQuery } from "@tanstack/react-query";
import InfoCard from "../ui/infoCard";
import { useState } from "react";
import { getClassTeacher } from "@/api/classes";
import RemoveTeacherFromClassModal from "../modals/RemoveTeacherFromClassModal";
import { TeacherRecord } from "@/types/Teacher";
import EmptyMessage from "../cards/EmptyMessage";
import BasicContainer from "../ui/BasicContainer";
import { useRouter } from "next/navigation";
import BasicInfoCard from "../cards/BasicInfoCard";

interface ClassTeacherCardProps{
    id: number 
}


export default function ClassTeacherCard({id}: ClassTeacherCardProps){
    const [isRemovingTeacher, setIsRemovingTeacher] = useState(false)
    const {data: teacher, isLoading, isError, error} = useQuery<TeacherRecord>({
        queryKey: ["class-teacher", id],
        queryFn: () => getClassTeacher(id!),
        enabled: !!id
    })
    
    const router = useRouter()
    function handleRedirect() {
        if (teacher) router.push(`/teachers/${teacher.teacherId}`)
    }
    console.log("isremovingteacher", isRemovingTeacher)
    return (
        <>
            {teacher ? (
                 <BasicInfoCard 
                 type="teacher"
                 isForm={false}
                 id={teacher.teacherId}
                 toggle={()=> handleRedirect()} 
                 />
                          
               

            ):(
                <BasicContainer title="Teacher Details">
                    <div className="h-full flex align-center">
                        <EmptyMessage message="No teacher assigned"/>
                    </div>
                </BasicContainer>
            )}

            {isRemovingTeacher && teacher &&
            <RemoveTeacherFromClassModal
            classId={id}
            teacherId={teacher.teacherId}
            isOpen={isRemovingTeacher}
            onClose={() => setIsRemovingTeacher(false)}
            />
            }

        </>
    )
}