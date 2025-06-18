from qiskit import QuantumCircuit, Aer, execute
import numpy as np
import json

# Inisialisasi
t_values = np.linspace(0, 2*np.pi, 30)
energies = []

for t in t_values:
    qc = QuantumCircuit(3)
    qc.rx(np.sin(t), 0)
    qc.rx(np.sin(t), 1)
    qc.rx(np.sin(t), 2)

    backend = Aer.get_backend('statevector_simulator')
    job = execute(qc, backend)
    result = job.result()
    sv = result.get_statevector()

    # Estimasi energi sebagai proxy = jumlah amplitudo squared untuk |111>
    amp = sv[7]  # indeks 7 = |111⟩
    E = np.abs(amp) ** 2
    energies.append(E)

# Kembalikan dalam format JSON
print(json.dumps({
    "t": t_values.tolist(),
    "energies": energies
}))
