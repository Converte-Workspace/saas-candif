import { useState } from 'react';
import { products } from '../data/mockData';

const Estoque = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [stockFilter, setStockFilter] = useState('Todos');
  const [sortBy, setSortBy] = useState('name');
  const [ sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const categories = ['Todas', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
      const matchesStock =
        stockFilter === 'Todos' ||
        (stockFilter === 'Disponível' && product.stock > product.minStock) ||
        (stockFilter === 'Baixo' && product.stock <= product.minStock && product.stock > 0) ||
        (stockFilter === 'Esgotado' && product.stock === 0);
      return matchesSearch && matchesCategory && matchesStock;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        comparison = a.price - b.price;
      } else if (sortBy === 'stock') {
        comparison = a.stock - b.stock;
      } else if (sortBy === 'category') {
        comparison = a.category.localeCompare(b.category);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const getStockStatus = (product: typeof products[0]) => {
    if (product.stock === 0) return { text: 'Esgotado', color: 'bg-red-100 text-red-800' };
    if (product.stock <= product.minStock) return { text: 'Baixo', color: 'bg-orange-100 text-orange-800' };
    return { text: 'Disponível', color: 'bg-green-100 text-green-800' };
  };

  const getStockPercentage = (product: typeof products[0]) => {
    return Math.min((product.stock / (product.minStock * 3)) * 100, 100);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Controle de Estoque</h2>
        <p className="text-gray-600 mt-1">Gerencie seu estoque de auto peças</p>
      </div>

      {/* Filtros */}
      <div className="card mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="input-field"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="Todas">Todas Categorias</option>
              {categories.filter(c => c !== 'Todas').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="input-field"
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
            >
              <option value="Todos">Todos os Status</option>
              <option value="Disponível">Disponível</option>
              <option value="Baixo">Estoque Baixo</option>
              <option value="Esgotado">Esgotado</option>
            </select>
          </div>
          <div>
            <select
              className="input-field"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order as 'asc' | 'desc');
              }}
            >
              <option value="name-asc">Nome (A-Z)</option>
              <option value="name-desc">Nome (Z-A)</option>
              <option value="price-asc">Preço (Menor)</option>
              <option value="price-desc">Preço (Maior)</option>
              <option value="stock-desc">Estoque (Maior)</option>
              <option value="stock-asc">Estoque (Menor)</option>
              <option value="category-asc">Categoria (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resumo dos Filtros */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="card p-3 text-center">
          <p className="text-2xl font-bold text-gray-900">{products.length}</p>
          <p className="text-xs text-gray-600">Total de Produtos</p>
        </div>
        <div className="card p-3 text-center">
          <p className="text-2xl font-bold text-green-600">
            {products.filter(p => p.stock > p.minStock).length}
          </p>
          <p className="text-xs text-gray-600">Disponíveis</p>
        </div>
        <div className="card p-3 text-center">
          <p className="text-2xl font-bold text-orange-600">
            {products.filter(p => p.stock <= p.minStock && p.stock > 0).length}
          </p>
          <p className="text-xs text-gray-600">Estoque Baixo</p>
        </div>
        <div className="card p-3 text-center">
          <p className="text-2xl font-bold text-red-600">
            {products.filter(p => p.stock === 0).length}
          </p>
          <p className="text-xs text-gray-600">Esgotados</p>
        </div>
      </div>

      {/* Cards Horizontais de Produtos */}
      <div className="space-y-3">
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product);

          return (
            <div key={product.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                {/* Imagem */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />

                {/* Informações Principais */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 truncate">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.category}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stockStatus.color} flex-shrink-0`}>
                      {stockStatus.text}
                    </span>
                  </div>

                  {/* Detalhes */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Fornecedor</p>
                      <p className="font-medium text-gray-900">{product.supplier}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Preço</p>
                      <p className="font-bold text-blue-600">R$ {product.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Estoque Mínimo</p>
                      <p className="font-medium text-gray-900">{product.minStock} un</p>
                    </div>
                  </div>
                </div>

                {/* Informações de Estoque */}
                <div className="w-48 flex-shrink-0">
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Estoque Atual</span>
                      <span className={`text-xl font-bold ${
                        product.stock <= product.minStock ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        {product.stock}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          product.stock <= product.minStock ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${getStockPercentage(product)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Ações Rápidas */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors text-xs font-medium">
                      Editar
                    </button>
                    <button className="flex-1 bg-green-100 text-green-700 px-3 py-2 rounded-lg hover:bg-green-200 transition-colors text-xs font-medium">
                      + Ajuste
                    </button>
                  </div>
                </div>
              </div>

              {/* Alerta de Estoque Baixo */}
              {product.stock <= product.minStock && product.stock > 0 && (
                <div className="mt-3 pt-3 border-t border-orange-200">
                  <p className="text-xs text-orange-600 font-medium">
                    Alerta: Estoque abaixo do mínimo recomendado ({product.minStock} unidades)
                  </p>
                </div>
              )}

              {/* Alerta de Produto Esgotado */}
              {product.stock === 0 && (
                <div className="mt-3 pt-3 border-t border-red-200">
                  <p className="text-xs text-red-600 font-medium">
                    Produto esgotado! Reabastecer urgentemente.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum produto encontrado com os filtros selecionados</p>
        </div>
      )}
    </div>
  );
};

export default Estoque;
