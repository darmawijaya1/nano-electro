import { useState } from 'react'
import dynamic from 'next/dynamic'
import { getEnergyPlot, getVoltagePlot } from '../utils/chart'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

export default function Home() {
  const [data, setData] = useState<{ t: number[]; energies: number[] }>()

  const fetchData = async () => {
    const res = await fetch('/api/simulate')
    const json = await res.json()
    setData(json)
  }

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">Nano Electro Theory Simulator</h1>
      <button onClick={fetchData} className="bg-blue-600 text-white px-4 py-2 rounded mb-6">
        Run Simulation
      </button>

      {data && (
        <>
          <Plot {...getEnergyPlot(data)} />
          <div className="mt-10" />
          <Plot {...getVoltagePlot(data)} />
        </>
      )}
    </main>
  )
}
