import React, { useState } from "react";

function App() {
  const [participantes, setParticipantes] = useState("");
  const [numeroDeTimes, setNumeroDeTimes] = useState<number>(2);
  const [times, setTimes] = useState<string[][]>([]);

  const handleGerarTimes = () => {
    const listaParticipantes = participantes
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p);

    if (listaParticipantes.length < 6) {
      alert("É necessário ter pelo menos 6 participantes para gerar os times.");
      return;
    }

    const shuffled = [...listaParticipantes].sort(() => Math.random() - 0.5);
    const novosTimes = Array.from({ length: numeroDeTimes }, () => [] as string[]);

    shuffled.forEach((participante, index) => {
      novosTimes[index % numeroDeTimes].push(participante);
    });

    setTimes(novosTimes);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gerador de Times</h1>
      <textarea
        rows="6"
        placeholder="Digite os nomes dos participantes (um por linha)"
        value={participantes}
        onChange={(e) => setParticipantes(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <input
        type="number"
        min="2"
        value={numeroDeTimes}
        onChange={(e) => setNumeroDeTimes(Number(e.target.value))}
        style={{ marginBottom: "10px", width: "100%" }}
      />
      <button onClick={handleGerarTimes} style={{ marginBottom: "20px" }}>
        Gerar Times
      </button>
      {times.length > 0 && (
        <div>
          {times.map((time, index) => (
            <div key={index}>
              <h3>Time {index + 1}</h3>
              <ul>
                {time.map((p: string, i: number) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
