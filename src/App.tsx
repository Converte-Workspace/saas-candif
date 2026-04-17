import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Estoque from './components/Estoque'
import RegistrarVenda from './components/RegistrarVenda'
import HistoricoVendas from './components/HistoricoVendas'
import Catalogo from './components/Catalogo'
import Fornecedores from './components/Fornecedores'
import Clientes from './components/Clientes'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'estoque':
        return <Estoque />
      case 'vendas':
        return <RegistrarVenda />
      case 'historico':
        return <HistoricoVendas />
      case 'catalogo':
        return <Catalogo />
      case 'fornecedores':
        return <Fornecedores />
      case 'clientes':
        return <Clientes />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <main className={`flex-1 transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-20' : 'ml-64'
      }`}>
        {renderPage()}
      </main>
    </div>
  )
}

export default App
