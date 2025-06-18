import { useState } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { getEnergyPlot, getVoltagePlot } from '../utils/chart'

// Tambahkan ini agar TypeScript kenal tipe PlotProps!
import type { PlotParams } from 'react-plotly.js'
const Plot = dynamic<PlotParams>(() => import('react-plotly.js'), { ssr: false })

export default function Home() {
  const [data, setData] = useState<{ t: number[]; energies: number[] }>()

  const fetchData = async () => {
    const res = await fetch('/api/simulate')
    const json = await res.json()
    setData(json)
  }

  return (
    <>
      <Head>
        <title>Nano Electro Simulator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-10">
        <div className="flex items-center gap-4 mb-6">
          <Image src="/nano.png" alt="Nano Electro Theory Logo" width={50} height={50} />
          <h1 className="text-2xl font-bold">Nano Electro Theory Simulator</h1>
        </div>
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
    </>
  )
}
