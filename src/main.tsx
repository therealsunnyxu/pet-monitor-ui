import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import './index.css';
import { store } from './store';

(async function () {
  await fetch("https://pet-monitor-api.therealsunnyxu.com/token/csrf", {
    credentials: "include"
  });
  const loadingDiv = document.getElementById("loading");
  if (!loadingDiv) return;
  loadingDiv.remove();
})();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
