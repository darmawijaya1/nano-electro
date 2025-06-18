type PlotData = {
  t: number[]
  energies: number[]
}

export function getEnergyPlot(data: PlotData) {
  return {
    data: [
      {
        x: data.t,
        y: data.energies,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'orange' },
        name: 'Energi Kuantum'
      }
    ],
    layout: {
      title: 'Energi Kuantum terhadap Waktu',
      xaxis: { title: 'Waktu (t)' },
      yaxis: { title: 'Energi Ekspektasi' },
      margin: { t: 40 }
    }
  }
}

export function getVoltagePlot(data: PlotData) {
  const dt = data.t[1] - data.t[0]
  const deltaE = data.energies.map((e, i, arr) =>
    i === 0 ? 0 : (e - arr[i - 1]) / dt
  )

  return {
    data: [
      {
        x: data.t,
        y: deltaE,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' },
        name: 'ΔE / Δt (Tegangan Kuantum)'
      }
    ],
    layout: {
      title: 'Tegangan Kuantum (ΔE/Δt)',
      xaxis: { title: 'Waktu (t)' },
      yaxis: { title: 'Tegangan Kuantum (arb. unit)' },
      margin: { t: 40 }
    }
  }
}
