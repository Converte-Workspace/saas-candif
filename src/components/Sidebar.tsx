interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ currentPage, setCurrentPage, isCollapsed, setIsCollapsed }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'estoque', label: 'Estoque' },
    { id: 'vendas', label: 'Registrar Venda' },
    { id: 'historico', label: 'Histórico de Vendas' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'fornecedores', label: 'Fornecedores' },
    { id: 'clientes', label: 'Clientes' },
  ];

  return (
    <aside
      className={`bg-slate-900 min-h-screen text-white fixed left-0 top-0 transition-all duration-300 z-50 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4">
        <div className="mb-8">
          {!isCollapsed ? (
            <>
              <h1 className="text-xl font-bold">Candif Auto Peças</h1>
              <p className="text-slate-400 text-sm mt-1">Controle de Estoque</p>
            </>
          ) : (
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-xl font-bold">C</span>
            </div>
          )}
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center ${
                isCollapsed ? 'justify-center' : 'justify-start'
              } gap-3 px-4 py-3 rounded-lg transition-all ${
                currentPage === item.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
              title={item.label}
            >
              <div className="w-6 h-6 flex items-center justify-center bg-slate-700 rounded flex-shrink-0">
                <span className="text-xs font-bold">
                  {item.label.charAt(0)}
                </span>
              </div>
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-4 left-0 right-0 px-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`w-full flex items-center ${
            isCollapsed ? 'justify-center' : 'justify-start'
          } gap-3 px-4 py-3 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all`}
          title={isCollapsed ? 'Expandir menu' : 'Colapsar menu'}
        >
          {isCollapsed ? (
            <span className="text-xl">→</span>
          ) : (
            <>
              <span>←</span>
              <span className="font-medium">Colapsar</span>
            </>
          )}
        </button>

        {!isCollapsed && (
          <div className="bg-slate-800 rounded-lg p-4 mt-4">
            <p className="text-sm text-slate-400">Status do Sistema</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Online</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
