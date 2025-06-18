import type { NextApiRequest, NextApiResponse } from 'next'
import { exec } from 'child_process'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  exec('python3 ibmq_sim.py', (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr })
    try {
      const data = JSON.parse(stdout)
      res.status(200).json(data)
    } catch {
      res.status(500).json({ error: 'Invalid JSON response' })
    }
  })
}
