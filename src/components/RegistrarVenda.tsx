import { useState } from 'react';
import { products, customers } from '../data/mockData';

interface CartItem {
  product: typeof products[0];
  quantity: number;
}

const RegistrarVenda = () => {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock de novo cliente
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    cpf: '',
    phone: '',
    email: '',
    address: ''
  });

  const addToCart = (product: typeof products[0]) => {
    const existingItem = cart.find(item => item.product.id === product.id);

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      }
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stock) }
          : item
      ));
    }
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Registrar Venda</h2>
        <p className="text-gray-600 mt-2">Adicione produtos e finalize a venda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Esquerda - Seleção de Produtos */}
        <div className="lg:col-span-2 space-y-6">
          {/* Seleção de Cliente */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Cliente</h3>

            {!showNewCustomer ? (
              <div className="space-y-4">
                <select
                  className="input-field"
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                >
                  <option value="">Selecione um cliente...</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name} - {customer.cpf}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setShowNewCustomer(true)}
                  className="btn-secondary w-full"
                >
                  + Novo Cliente
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome completo *"
                  className="input-field"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="CPF/CNPJ *"
                  className="input-field"
                  value={newCustomer.cpf}
                  onChange={(e) => setNewCustomer({ ...newCustomer, cpf: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Telefone"
                  className="input-field"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input-field"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Endereço"
                  className="input-field"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                />
                <div className="flex gap-2">
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
          </div>

          {/* Busca de Produtos */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Adicionar Produtos</h3>
            <input
              type="text"
              placeholder="Buscar produtos por nome ou categoria..."
              className="input-field mb-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`border rounded-lg p-4 transition-all cursor-pointer ${
                    product.stock === 0
                      ? 'border-gray-200 bg-gray-50 opacity-60'
                      : 'border-gray-200 hover:border-blue-500 hover:shadow-md'
                  }`}
                  onClick={() => product.stock > 0 && addToCart(product)}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.category}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-lg font-bold text-blue-600">
                          R$ {product.price.toFixed(2)}
                        </span>
                        <span className={`text-sm font-medium ${
                          product.stock <= product.minStock ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {product.stock} un
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna Direita - Carrinho */}
        <div className="lg:col-span-1">
          <div className="card sticky top-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Carrinho</h3>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-gray-400">C</span>
                </div>
                <p>Carrinho vazio</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="max-h-96 overflow-y-auto space-y-3">
                  {cart.map((item) => (
                    <div key={item.product.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-start gap-2 mb-2">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.product.name}</p>
                          <p className="text-sm text-blue-600 font-semibold">
                            R$ {item.product.price.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          X
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 font-bold"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 font-bold"
                          disabled={item.quantity >= item.product.stock}
                        >
                          +
                        </button>
                        <span className="ml-auto text-sm font-semibold text-gray-700">
                          R$ {(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>R$ {getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">R$ {getTotal().toFixed(2)}</span>
                  </div>
                </div>

                <button className="btn-primary w-full text-lg py-3">
                  Finalizar Venda
                </button>

                <button
                  onClick={() => setCart([])}
                  className="btn-secondary w-full"
                >
                  Limpar Carrinho
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarVenda;
