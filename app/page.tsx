import Image from "next/image";
import StatsCard from "./components/ui/StatsCard";
import PrimaryButton from "./components/ui/PrimaryButton";

export default function Home() {
  return (
    <main className="flex flex-col w-full max-w-5xl px-6 py-0">
      <h1 className="text-3xl font-bold mb-6">Welcome to My School Management System</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard title="Students"/>
        <StatsCard title="Teachers"/>
        <StatsCard title="Classes"/>
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-4 mt-8">
        <PrimaryButton href="/students" title="View Students"/>
        <PrimaryButton href="/teachers" title="View Teachers" color="bg-green-500"/>
        <PrimaryButton href="/classes" title="View Classes" color="bg-purple-500"/>
      </div>

      {/* Placeholder Chart */}
      <div className="mt-10 w-full h-64 bg-white shadow rounded flex items-center justify-center">
        <p className="text-gray-400">[Chart Placeholder]</p>
      </div>
    </main>

  );
}
