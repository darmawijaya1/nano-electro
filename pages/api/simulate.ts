import type { NextApiRequest, NextApiResponse } from 'next'

// Simulasi Nano Electro Theory langsung di JS!
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const t_values = Array.from({ length: 30 }, (_, i) => i * (2 * Math.PI / 29))
  const energies = t_values.map(t => Math.pow(Math.sin(t), 2)) // contoh: energi proxy

  res.status(200).json({
    t: t_values,
    energies
  })
}
