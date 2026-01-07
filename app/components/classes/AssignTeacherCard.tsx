"useClient"
import BasicContainer from "../ui/BasicContainer";
import TeacherList from "../teachers/TeacherList";
import { getClassTeacher } from "@/api/classes";
import { TeacherRecord } from "@/types/Teacher";


interface ClassTeacherCardProps{
    id: number 
}


export default function AssignTeacherCard({id}: ClassTeacherCardProps){

    return (

        <div>
        <BasicContainer title="Assign Teacher" width="w-full">
            <TeacherList id={id} height="max-h-80"/>
        </BasicContainer>
        </div>
    )
}