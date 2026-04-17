import { useState } from 'react';
import { sales } from '../data/mockData';

const HistoricoVendas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [selectedSale, setSelectedSale] = useState<typeof sales[0] | null>(null);

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.customer.cpf.includes(searchTerm);
    const matchesStatus = statusFilter === 'Todos' || sale.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído':
        return 'bg-green-100 text-green-800';
      case 'Pendente':
        return 'bg-orange-100 text-orange-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'Dinheiro':
        return '💵';
      case 'Cartão de Crédito':
        return '💳';
      case 'PIX':
        return '📱';
      case 'Boleto':
        return '📄';
      default:
        return '💰';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Histórico de Vendas</h2>
        <p className="text-gray-600 mt-2">Visualize e gerencie todas as vendas realizadas</p>
      </div>

      {/* Filtros */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por cliente ou CPF..."
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-48">
            <select
              className="input-field"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="Todos">Todos os Status</option>
              <option value="Concluído">Concluído</option>
              <option value="Pendente">Pendente</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Vendas */}
      <div className="space-y-4">
        {filteredSales.map((sale) => (
          <div key={sale.id} className="card hover:shadow-md transition-shadow cursor-pointer">
            <div onClick={() => setSelectedSale(sale)}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{sale.customer.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(sale.status)}`}>
                      {sale.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">CPF/CNPJ: {sale.customer.cpf}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <span className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center text-xs">
                      T
                    </span>
                    {sale.customer.phone}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    R$ {sale.total.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center justify-end gap-1">
                    {getPaymentMethodIcon(sale.paymentMethod)}
                    {sale.paymentMethod}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(sale.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <p className="text-sm text-gray-600 mb-2">
                  {sale.items.length} {sale.items.length === 1 ? 'item' : 'itens'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {sale.items.slice(0, 3).map((item, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 flex items-center gap-1"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-4 h-4 object-cover rounded"
                      />
                      {item.product.name} ({item.quantity}x)
                    </span>
                  ))}
                  {sale.items.length > 3 && (
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                      +{sale.items.length - 3} itens
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
              <button className="btn-primary flex-1">
                Ver Detalhes
              </button>
              {sale.status === 'Pendente' && (
                <>
                  <button className="btn-secondary flex-1 bg-green-600 text-white hover:bg-green-700">
                    Aprovar
                  </button>
                  <button className="btn-secondary flex-1 bg-red-600 text-white hover:bg-red-700">
                    Cancelar
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredSales.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhuma venda encontrada</p>
        </div>
      )}

      {/* Modal de Detalhes da Venda */}
      {selectedSale && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Detalhes da Venda</h3>
              <button
                onClick={() => setSelectedSale(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                X
              </button>
            </div>

            {/* Informações do Cliente */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-bold text-lg mb-2">Cliente</h4>
              <p className="text-gray-900 font-semibold">{selectedSale.customer.name}</p>
              <p className="text-sm text-gray-600">CPF/CNPJ: {selectedSale.customer.cpf}</p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <span className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center text-xs">
                  T
                </span>
                {selectedSale.customer.phone}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center text-xs">
                  E
                </span>
                {selectedSale.customer.email}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <span className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center text-xs">
                  A
                </span>
                {selectedSale.customer.address}
              </p>
            </div>

            {/* Informações da Venda */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-600 font-medium">Data da Venda</p>
                <p className="text-lg font-bold text-blue-900">
                  {new Date(selectedSale.date).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-600 font-medium">Forma de Pagamento</p>
                <p className="text-lg font-bold text-green-900 flex items-center gap-2">
                  {getPaymentMethodIcon(selectedSale.paymentMethod)}
                  {selectedSale.paymentMethod}
                </p>
              </div>
            </div>

            {/* Itens da Venda */}
            <div className="mb-6">
              <h4 className="font-bold text-lg mb-3">Itens da Venda</h4>
              <div className="space-y-3">
                {selectedSale.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{item.product.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.quantity}x R$ {item.product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-blue-600">
                      R$ {item.subtotal.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-900">Total da Venda</span>
                <span className="text-3xl font-bold text-green-600">
                  R$ {selectedSale.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => window.print()}
                className="btn-primary flex-1"
              >
                Imprimir
              </button>
              <button
                onClick={() => setSelectedSale(null)}
                className="btn-secondary flex-1"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricoVendas;
