import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import LandingPage from './pages/LandingPage'
import ChatApp from './pages/ChatApp'

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<ChatApp />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}
