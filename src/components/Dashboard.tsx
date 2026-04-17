import { metrics, products } from '../data/mockData';

const Dashboard = () => {
  const produtosBaixoEstoque = products.filter(p => p.stock <= p.minStock);
  const produtosEsgotados = products.filter(p => p.stock === 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-2">Visão geral do seu negócio</p>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Vendas do Mês</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                R$ {metrics.vendasMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-green-600 text-sm font-medium">↑ {metrics.crescimentoVendas}%</span>
                <span className="text-gray-500 text-sm">vs mês anterior</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl font-bold">R$</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Vendas Hoje</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                R$ {metrics.vendasHoje.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-gray-500 text-sm mt-2">{new Date().toLocaleDateString('pt-BR')}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl font-bold">↑</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total de Produtos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalProdutos}</p>
              <p className="text-orange-600 text-sm mt-2">{metrics.produtosBaixoEstoque} com estoque baixo</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-xl font-bold">P</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Clientes Ativos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalClientes}</p>
              <p className="text-gray-500 text-sm mt-2">Cadastrados</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-xl font-bold">C</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alertas de Produtos Esgotados */}
      {produtosEsgotados.length > 0 && (
        <div className="card bg-red-50 border-red-200 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">!</span>
            </span>
            <h3 className="text-xl font-bold text-red-900">Produtos Esgotados - Ação Imediata Necessária</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {produtosEsgotados.map((produto) => (
              <div key={produto.id} className="bg-white rounded-lg p-4 border border-red-200">
                <div className="flex items-center gap-3">
                  <img
                    src={produto.image}
                    alt={produto.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{produto.name}</p>
                    <p className="text-sm text-gray-600">{produto.category}</p>
                    <p className="text-xs text-red-600 font-medium mt-1">Fornecedor: {produto.supplier}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">{produto.stock}</p>
                    <p className="text-xs text-gray-500">unidades</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alertas de Estoque Baixo */}
      {produtosBaixoEstoque.length > 0 && (
        <div className="card bg-orange-50 border-orange-200 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">!</span>
            </span>
            <h3 className="text-xl font-bold text-orange-900">Produtos com Estoque Baixo</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {produtosBaixoEstoque.filter(p => p.stock > 0).map((produto) => (
              <div key={produto.id} className="bg-white rounded-lg p-4 border border-orange-200">
                <div className="flex items-center gap-3">
                  <img
                    src={produto.image}
                    alt={produto.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{produto.name}</p>
                    <p className="text-sm text-gray-600">{produto.category}</p>
                    <p className="text-xs text-orange-600 font-medium mt-1">Fornecedor: {produto.supplier}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">{produto.stock}</p>
                    <p className="text-xs text-gray-500">unidades</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gráfico de Vendas (Mock Visual) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Vendas da Semana</h3>
          <div className="h-64 flex items-end justify-around gap-2">
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((dia, index) => {
              const heights = [65, 45, 80, 55, 90, 70, 40];
              return (
                <div key={dia} className="flex flex-col items-center flex-1">
                  <div
                    className="bg-blue-600 rounded-t-lg w-full transition-all hover:bg-blue-700"
                    style={{ height: `${heights[index]}%` }}
                  ></div>
                  <p className="text-xs text-gray-600 mt-2">{dia}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Categorias Mais Vendidas</h3>
          <div className="space-y-4">
            {[
              { category: 'Motor', percent: 85, color: 'bg-blue-600' },
              { category: 'Freios', percent: 72, color: 'bg-green-600' },
              { category: 'Elétrica', percent: 65, color: 'bg-purple-600' },
              { category: 'Fixação', percent: 48, color: 'bg-orange-600' },
              { category: 'Resfriamento', percent: 42, color: 'bg-red-600' },
            ].map((item) => (
              <div key={item.category}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.category}</span>
                  <span className="text-sm font-medium text-gray-500">{item.percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all`}
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
