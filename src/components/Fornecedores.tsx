import { useState } from 'react';
import { suppliers, products } from '../data/mockData';

const Fornecedores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingSupplier, setEditingSupplier] = useState<typeof suppliers[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNewSupplier, setShowNewSupplier] = useState(false);

  const [supplierList, setSupplierList] = useState(suppliers);

  const filteredSuppliers = supplierList.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.cnpj.includes(searchTerm)
  );

  const openEditModal = (supplier: typeof suppliers[0]) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  const saveSupplier = () => {
    if (editingSupplier) {
      setSupplierList(supplierList.map(s =>
        s.id === editingSupplier.id ? editingSupplier : s
      ));
      setIsModalOpen(false);
      setEditingSupplier(null);
    }
  };

  const deleteSupplier = () => {
    if (editingSupplier) {
      setSupplierList(supplierList.filter(s => s.id !== editingSupplier.id));
      setIsModalOpen(false);
      setEditingSupplier(null);
    }
  };

  // Mock de novo fornecedor
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    cnpj: '',
    contact: '',
    phone: '',
    email: '',
    address: ''
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gerenciar Fornecedores</h2>
        <p className="text-gray-600 mt-1">Cadastre e edite seus fornecedores</p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="card p-4 text-center">
          <p className="text-3xl font-bold text-gray-900">{supplierList.length}</p>
          <p className="text-sm text-gray-600">Total de Fornecedores</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">
            {products.length}
          </p>
          <p className="text-sm text-gray-600">Produtos Cadastrados</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl font-bold text-green-600">
            {suppliers.length}
          </p>
          <p className="text-sm text-gray-600">Fornecedores Ativos</p>
        </div>
      </div>

      {/* Filtros e Ações */}
      <div className="card mb-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar fornecedores..."
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowNewSupplier(true)}
            className="btn-primary"
          >
            + Novo Fornecedor
          </button>
        </div>
      </div>

      {/* Cadastro de Novo Fornecedor */}
      {showNewSupplier && (
        <div className="card mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Cadastrar Novo Fornecedor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
              <input
                type="text"
                className="input-field"
                value={newSupplier.name}
                onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ *</label>
              <input
                type="text"
                className="input-field"
                value={newSupplier.cnpj}
                onChange={(e) => setNewSupplier({ ...newSupplier, cnpj: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contato</label>
              <input
                type="text"
                className="input-field"
                value={newSupplier.contact}
                onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone *</label>
              <input
                type="tel"
                className="input-field"
                value={newSupplier.phone}
                onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="input-field"
                value={newSupplier.email}
                onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
              <input
                type="text"
                className="input-field"
                value={newSupplier.address}
                onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                setShowNewSupplier(false);
                setNewSupplier({ name: '', cnpj: '', contact: '', phone: '', email: '', address: '' });
              }}
              className="btn-secondary flex-1"
            >
              Cancelar
            </button>
            <button className="btn-primary flex-1">
              Salvar Fornecedor
            </button>
          </div>
        </div>
      )}

      {/* Lista de Fornecedores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xl font-bold">
                  {supplier.name.charAt(0)}
                </span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{supplier.products}</p>
                <p className="text-xs text-gray-600">produtos</p>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">{supplier.name}</h3>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center text-xs">C</span>
                <span className="text-gray-700">{supplier.cnpj}</span>
              </div>
              {supplier.contact && (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-100 rounded flex items-center justify-center text-xs">P</span>
                  <span className="text-gray-700">{supplier.contact}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center text-xs">T</span>
                <span className="text-gray-700">{supplier.phone}</span>
              </div>
              {supplier.email && (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-purple-100 rounded flex items-center justify-center text-xs">E</span>
                  <span className="text-gray-700 truncate">{supplier.email}</span>
                </div>
              )}
              {supplier.address && (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-orange-100 rounded flex items-center justify-center text-xs">A</span>
                  <span className="text-gray-700 truncate">{supplier.address}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => openEditModal(supplier)}
              className="w-full btn-primary"
            >
              Editar Fornecedor
            </button>
          </div>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum fornecedor encontrado</p>
        </div>
      )}

      {/* Modal de Edição */}
      {isModalOpen && editingSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Editar Fornecedor</h3>
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
                  value={editingSupplier.name}
                  onChange={(e) => setEditingSupplier({ ...editingSupplier, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ *</label>
                <input
                  type="text"
                  className="input-field"
                  value={editingSupplier.cnpj}
                  onChange={(e) => setEditingSupplier({ ...editingSupplier, cnpj: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contato</label>
                <input
                  type="text"
                  className="input-field"
                  value={editingSupplier.contact}
                  onChange={(e) => setEditingSupplier({ ...editingSupplier, contact: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone *</label>
                <input
                  type="tel"
                  className="input-field"
                  value={editingSupplier.phone}
                  onChange={(e) => setEditingSupplier({ ...editingSupplier, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="input-field"
                  value={editingSupplier.email}
                  onChange={(e) => setEditingSupplier({ ...editingSupplier, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                <input
                  type="text"
                  className="input-field"
                  value={editingSupplier.address}
                  onChange={(e) => setEditingSupplier({ ...editingSupplier, address: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={saveSupplier}
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
                onClick={deleteSupplier}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Excluir Fornecedor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fornecedores;
