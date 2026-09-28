import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { HashRouter } from "react-router"
import App from "./App"
import { LanguageProvider } from "./lib/locale"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <LanguageProvider><App /></LanguageProvider>
    </HashRouter>
  </StrictMode>,
)
