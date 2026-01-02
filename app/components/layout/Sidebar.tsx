import Link from "next/link"
import DropdownFolder from "../ui/DropdownFolder"

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen text-white bg-gradient-to-b from-red-500 to-blue-600">
        <div className="w-full h-10 flex justify-center items-center mb-3 border-b-black border-b-1">
            <h1 className="text-xl font-bold">School App</h1>
        </div>

      <nav className="flex flex-col gap-2 px-4">
        <Link href="/">Dashboard</Link>
        <DropdownFolder 
        title="Students"
        links={[
          {name: "Student Records", href: "/students"}, 
          {name: "Add Student", href: "/students/add"} 
        ]}
        />
        <DropdownFolder 
        title="Teachers"
        links={[
          {name: "Teacher Records", href: "/teachers"},
          {name: "Add Teacher", href: "/teachers/add"} 
         ]}
        />
        <DropdownFolder 
        title="Classes"
        links={[{
          name: "Class Records", href: "/classes"},
          {name: "Add Class", href: "/classes/add"}  
        ]}
        />
        <DropdownFolder 
        title="Guardians"
        links={[
          {name: "Guardian Records", href: "/guardians"},
          {name: "Add Guardian", href: "/guardians/add"}  
        ]}
        />
      </nav>
    </aside>
  )
}
