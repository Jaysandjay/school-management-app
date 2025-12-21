
interface StatCardPops {
    title: string
}

export default function StatsCard({title}: StatCardPops){

    return (
        <div className="bg-white shadow p-4 rounded">
            <h2 className="text-lg text-black font-bold">{title}</h2>
            <p className="text-2xl text-purple-600 mt-2">124</p>
        </div>
    )
}