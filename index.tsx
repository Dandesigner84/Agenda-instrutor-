
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const init = () => {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error("Elemento root não encontrado no DOM.");
  }

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("AutoDrive Smart inicializado com sucesso.");
  } catch (error) {
    console.error("Erro ao renderizar App:", error);
    const overlay = document.getElementById('error-overlay');
    if (overlay) {
      overlay.style.display = 'block';
      overlay.innerHTML += `<h2>Erro de Renderização React</h2><pre>${error instanceof Error ? error.stack : String(error)}</pre>`;
    }
  }
};

// Garante que o DOM está pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
