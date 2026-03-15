import "./App.css"
import Dashboard from "@/components/pages/dashboard"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarProvider } from "@/components/ui/sidebar"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdvancedOptions from "./components/pages/advancedOptions"
import { ThemeProvider } from "./components/theme-provider"
import History from "./components/pages/history"

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <TooltipProvider>
          <SidebarProvider>
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/advanced" element={<AdvancedOptions />}></Route>
              <Route path="/history" element={<History/>}></Route>
            </Routes>
          </SidebarProvider>
        </TooltipProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App