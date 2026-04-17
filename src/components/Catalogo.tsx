import { useState } from 'react';
import { products } from '../data/mockData';

const Catalogo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [editingProduct, setEditingProduct] = useState<typeof products[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['Todas', ...Array.from(new Set(products.map(p => p.category)))];

  const [productList, setProductList] = useState(products);

  const filteredProducts = productList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openEditModal = (product: typeof products[0]) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const saveProduct = () => {
    if (editingProduct) {
      setProductList(productList.map(p =>
        p.id === editingProduct.id ? editingProduct : p
      ));
      setIsModalOpen(false);
      setEditingProduct(null);
    }
  };

  const deleteProduct = () => {
    if (editingProduct) {
      setProductList(productList.filter(p => p.id !== editingProduct.id));
      setIsModalOpen(false);
      setEditingProduct(null);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Catálogo de Produtos</h2>
        <p className="text-gray-600 mt-1">Gerencie seus produtos e preços</p>
      </div>

      {/* Filtros e Ações */}
      <div className="card mb-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar produtos ou fornecedores..."
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-48">
            <select
              className="input-field"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <button className="btn-primary">
            + Novo Produto
          </button>
        </div>
      </div>

      {/* Tabela de Produtos - Compacta */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-3 font-semibold text-gray-700 text-sm">Produto</th>
                <th className="text-left p-3 font-semibold text-gray-700 text-sm">Categoria</th>
                <th className="text-left p-3 font-semibold text-gray-700 text-sm">Fornecedor</th>
                <th className="text-left p-3 font-semibold text-gray-700 text-sm">Preço</th>
                <th className="text-left p-3 font-semibold text-gray-700 text-sm">Estoque</th>
                <th className="text-left p-3 font-semibold text-gray-700 text-sm">Status</th>
                <th className="text-left p-3 font-semibold text-gray-700 text-sm">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-3 text-gray-700 text-sm">{product.supplier}</td>
                  <td className="p-3">
                    <span className="text-base font-bold text-green-600">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <span className={`text-base font-bold ${
                        product.stock <= product.minStock ? 'text-orange-600' : 'text-gray-900'
                      }`}>
                        {product.stock}
                      </span>
                      <span className="text-xs text-gray-500">un</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock === 0
                        ? 'bg-red-100 text-red-800'
                        : product.stock <= product.minStock
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock === 0 ? 'Esgotado' : product.stock <= product.minStock ? 'Baixo' : 'Disponível'}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => openEditModal(product)}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
        </div>
      )}

      {/* Modal de Edição */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Editar Produto</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                X
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  className="input-field"
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                >
                  {categories.filter(c => c !== 'Todas').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fornecedor
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={editingProduct.supplier}
                  onChange={(e) => setEditingProduct({ ...editingProduct, supplier: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preço (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="input-field"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estoque
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estoque Mínimo
                </label>
                <input
                  type="number"
                  className="input-field"
                  value={editingProduct.minStock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, minStock: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={saveProduct}
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
                onClick={deleteProduct}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Excluir Produto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalogo;
