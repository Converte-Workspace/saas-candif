import { useState } from 'react';
import { customers, sales } from '../data/mockData';

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCustomer, setEditingCustomer] = useState<typeof customers[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNewCustomer, setShowNewCustomer] = useState(false);

  const [customerList, setCustomerList] = useState(customers);

  const filteredCustomers = customerList.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.cpf.includes(searchTerm)
  );

  const openEditModal = (customer: typeof customers[0]) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const saveCustomer = () => {
    if (editingCustomer) {
      setCustomerList(customerList.map(c =>
        c.id === editingCustomer.id ? editingCustomer : c
      ));
      setIsModalOpen(false);
      setEditingCustomer(null);
    }
  };

  const deleteCustomer = () => {
    if (editingCustomer) {
      setCustomerList(customerList.filter(c => c.id !== editingCustomer.id));
      setIsModalOpen(false);
      setEditingCustomer(null);
    }
  };

  const getCustomerStats = (customerId: number) => {
    const customerSales = sales.filter(s => s.customer.id === customerId);
    const totalPurchases = customerSales.reduce((sum, s) => sum + s.total, 0);
    const lastPurchase = customerSales.length > 0
      ? new Date(Math.max(...customerSales.map(s => new Date(s.date).getTime())))
      : null;

    return {
      totalOrders: customerSales.length,
      totalPurchases,
      lastPurchase
    };
  };

  // Mock de novo cliente
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    cpf: '',
    phone: '',
    email: '',
    address: ''
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gerenciar Clientes</h2>
        <p className="text-gray-600 mt-1">Cadastre e edite seus clientes</p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <div className="card p-4 text-center">
          <p className="text-3xl font-bold text-gray-900">{customerList.length}</p>
          <p className="text-sm text-gray-600">Total de Clientes</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl font-bold text-green-600">
            {customers.filter(c => c.cpf.length === 18).length}
          </p>
          <p className="text-sm text-gray-600">Pessoa Jurídica</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">
            {customers.filter(c => c.cpf.length === 14).length}
          </p>
          <p className="text-sm text-gray-600">Pessoa Física</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl font-bold text-purple-600">
            {sales.length}
          </p>
          <p className="text-sm text-gray-600">Vendas Realizadas</p>
        </div>
      </div>

      {/* Filtros e Ações */}
      <div className="card mb-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar clientes..."
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowNewCustomer(true)}
            className="btn-primary"
          >
            + Novo Cliente
          </button>
        </div>
      </div>

      {/* Cadastro de Novo Cliente */}
      {showNewCustomer && (
        <div className="card mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Cadastrar Novo Cliente</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
              <input
                type="text"
                className="input-field"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CPF/CNPJ *</label>
              <input
                type="text"
                className="input-field"
                value={newCustomer.cpf}
                onChange={(e) => setNewCustomer({ ...newCustomer, cpf: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone *</label>
              <input
                type="tel"
                className="input-field"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="input-field"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
              <input
                type="text"
                className="input-field"
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                setShowNewCustomer(false);
                setNewCustomer({ name: '', cpf: '', phone: '', email: '', address: '' });
              }}
              className="btn-secondary flex-1"
            >
              Cancelar
            </button>
            <button className="btn-primary flex-1">
              Salvar Cliente
            </button>
          </div>
        </div>
      )}

      {/* Lista de Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => {
          const stats = getCustomerStats(customer.id);
          const isCompany = customer.cpf.length === 18;

          return (
            <div key={customer.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isCompany ? 'bg-purple-100' : 'bg-green-100'
                }`}>
                  <span className={`text-xl font-bold ${
                    isCompany ? 'text-purple-600' : 'text-green-600'
                  }`}>
                    {customer.name.charAt(0)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">
                    {stats.totalOrders}
                  </p>
                  <p className="text-xs text-gray-600">pedidos</p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{customer.name}</h3>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center text-xs">D</span>
                  <span className="text-gray-700">{customer.cpf}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    isCompany ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {isCompany ? 'PJ' : 'PF'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center text-xs">T</span>
                  <span className="text-gray-700">{customer.phone}</span>
                </div>
                {customer.email && (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-green-100 rounded flex items-center justify-center text-xs">E</span>
                    <span className="text-gray-700 truncate">{customer.email}</span>
                  </div>
                )}
                {customer.address && (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-orange-100 rounded flex items-center justify-center text-xs">A</span>
                    <span className="text-gray-700 truncate">{customer.address}</span>
                  </div>
                )}
                {stats.totalPurchases > 0 && (
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-gray-600">
                      Total comprado: <span className="font-bold text-green-600">
                        R$ {stats.totalPurchases.toFixed(2)}
                      </span>
                    </p>
                    {stats.lastPurchase && (
                      <p className="text-xs text-gray-500">
                        Última compra: {stats.lastPurchase.toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => openEditModal(customer)}
                className="w-full btn-primary"
              >
                Editar Cliente
              </button>
            </div>
          );
        })}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum cliente encontrado</p>
        </div>
      )}

      {/* Modal de Edição */}
      {isModalOpen && editingCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Editar Cliente</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                X
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                <input
                  type="text"
                  className="input-field"
                  value={editingCustomer.name}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CPF/CNPJ *</label>
                <input
                  type="text"
                  className="input-field"
                  value={editingCustomer.cpf}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, cpf: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone *</label>
                <input
                  type="tel"
                  className="input-field"
                  value={editingCustomer.phone}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="input-field"
                  value={editingCustomer.email}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                <input
                  type="text"
                  className="input-field"
                  value={editingCustomer.address}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, address: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={saveCustomer}
                className="btn-primary flex-1"
              >
                Salvar Alterações
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={deleteCustomer}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Excluir Cliente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
