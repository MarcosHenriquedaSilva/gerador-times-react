import React, { useState } from "react";

function App() {
  // Estado para armazenar a lista de participantes (como texto)
  const [participantes, setParticipantes] = useState("");
  
  // Estado para armazenar o número de times a serem gerados
  const [numeroDeTimes, setNumeroDeTimes] = useState(2);
  
  // Estado para armazenar os times gerados
  const [times, setTimes] = useState([]);
  
  // Estado para mensagens de erro
  const [mensagemErro, setMensagemErro] = useState("");

  // Função que gera os times a partir da lista de participantes
  const handleGerarTimes = () => {
    // Divide os participantes em uma lista, removendo linhas vazias e espaços extras
    const listaParticipantes = participantes
      .split("\n") // Quebra o texto em linhas
      .map((p) => p.trim()) // Remove espaços extras
      .filter((p) => p); // Remove entradas vazias

    // Validação: Verifica se há participantes suficientes
    if (listaParticipantes.length < 6) {
      setMensagemErro("Adicione pelo menos 6 participantes para gerar os times."); // Define a mensagem de erro
      return;
    }

    if (numeroDeTimes < 2) {
      setMensagemErro("O número de times deve ser pelo menos 2."); // Define a mensagem de erro
      return;
    }

    // Embaralha os participantes aleatoriamente
    const shuffled = [...listaParticipantes].sort(() => Math.random() - 0.5);
    
    // Cria a estrutura de times
    const novosTimes = Array.from({ length: numeroDeTimes }, () => []);

    // Distribui os participantes entre os times
    shuffled.forEach((participante, index) => {
      novosTimes[index % numeroDeTimes].push(participante);
    });

    // Atualiza o estado com os times gerados
    setTimes(novosTimes);

    // Limpa a mensagem de erro após a geração bem-sucedida
    setMensagemErro("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gerador de Times</h1>

      {/* Campo de texto para inserir os participantes */}
      <textarea
        rows="6"
        placeholder="Digite os nomes dos participantes (um por linha)"
        value={participantes} // Valor do texto
        onChange={(e) => setParticipantes(e.target.value)} // Atualiza o estado ao digitar
        style={{ width: "100%", marginBottom: "10px" }}
      />
      
      {/* Campo de entrada para definir o número de times */}
      <input
        type="number"
        min="2"
        value={numeroDeTimes} // Valor do número de times
        onChange={(e) => setNumeroDeTimes(Number(e.target.value))} // Atualiza o estado ao digitar
        style={{ marginBottom: "10px", width: "100%" }}
      />
      
      {/* Botão para gerar os times */}
      <button onClick={handleGerarTimes} style={{ marginBottom: "20px" }}>
        Gerar Times
      </button>

      {/* Exibição de mensagens de erro */}
      {mensagemErro && (
        <p style={{ color: "red", marginBottom: "20px" }}>{mensagemErro}</p>
      )}

      {/* Exibição dos times gerados */}
      {times.length > 0 && (
        <div>
          {times.map((time, index) => (
            <div key={index}>
              <h3>Time {index + 1}</h3>
              <ul>
                {time.map((p, i) => (
                  <li key={i}>{p}</li> // Exibe cada participante do time
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
