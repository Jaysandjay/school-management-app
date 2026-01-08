"use client"

import { useRouter, usePathname } from "next/navigation"
import PrimaryButton from "../ui/PrimaryButton"

export default function FormNavButtons() {
  const router = useRouter()
  const pathname = usePathname()

  const activeColor = "bg-blue-700"
  const inactiveColor = "bg-blue-300 text-slate-800 hover:bg-blue-400"

  return (
    <div className="flex gap-5 mb-5">
      <PrimaryButton
        title="Add Student"
        onclick={() => router.push("/students/add")}
        color={pathname === "/students/add" ? activeColor : inactiveColor}
      />

      <PrimaryButton
        title="Add Teacher"
        onclick={() => router.push("/teachers/add")}
        color={pathname === "/teachers/add" ? activeColor : inactiveColor}
      />

      <PrimaryButton
        title="Add Class"
        onclick={() => router.push("/classes/add")}
        color={pathname === "/classes/add" ? activeColor : inactiveColor}
      />

      <PrimaryButton
        title="Add Guardian"
        onclick={() => router.push("/guardians/add")}
        color={pathname === "/guardians/add" ? activeColor : inactiveColor}
      />
    </div>
  )
}
