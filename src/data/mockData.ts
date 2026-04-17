// Mock de produtos - Peças reais de caminhão
export const products = [
  {
    id: 1,
    name: "Filtro de Óleo Motor Diesel",
    category: "Filtros",
    supplier: "Mann Filter",
    supplierId: 1,
    price: 85.90,
    stock: 150,
    minStock: 20,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop"
  },
  {
    id: 2,
    name: "Pastilha de Freio Dianteira",
    category: "Freios",
    supplier: "TRW",
    supplierId: 2,
    price: 289.90,
    stock: 75,
    minStock: 15,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop"
  },
  {
    id: 3,
    name: "Bateria 12V 180Ah",
    category: "Elétrica",
    supplier: "Moura",
    supplierId: 3,
    price: 650.00,
    stock: 25,
    minStock: 5,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=200&h=200&fit=crop"
  },
  {
    id: 4,
    name: "Amortecedor Dianteiro",
    category: "Suspensão",
    supplier: "Monroe",
    supplierId: 4,
    price: 420.00,
    stock: 40,
    minStock: 8,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop"
  },
  {
    id: 5,
    name: "Correia Dentada Motor",
    category: "Motor",
    supplier: "Gates",
    supplierId: 5,
    price: 125.00,
    stock: 60,
    minStock: 12,
    image: "https://images.unsplash.com/photo-1607799275518-d58665d096b1?w=200&h=200&fit=crop"
  },
  {
    id: 6,
    name: "Farol Traseiro LED",
    category: "Elétrica",
    supplier: "Hella",
    supplierId: 6,
    price: 180.00,
    stock: 90,
    minStock: 15,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop"
  },
  {
    id: 7,
    name: "Kit Embreagem Completo",
    category: "Transmissão",
    supplier: "Sachs",
    supplierId: 7,
    price: 1250.00,
    stock: 12,
    minStock: 3,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop"
  },
  {
    id: 8,
    name: "Radiador de Água Alumínio",
    category: "Resfriamento",
    supplier: "Valeo",
    supplierId: 8,
    price: 880.00,
    stock: 18,
    minStock: 4,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop"
  },
  {
    id: 9,
    name: "Parafuso Cabeça Hexagonal M12x40",
    category: "Fixação",
    supplier: "Würth",
    supplierId: 9,
    price: 8.50,
    stock: 500,
    minStock: 100,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=200&h=200&fit=crop"
  },
  {
    id: 10,
    name: "Parafuso Motor M14x60",
    category: "Fixação",
    supplier: "Würth",
    supplierId: 9,
    price: 12.90,
    stock: 350,
    minStock: 80,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=200&h=200&fit=crop"
  },
  {
    id: 11,
    name: "Pistão Motor Completo",
    category: "Motor",
    supplier: "Federal Mogul",
    supplierId: 10,
    price: 450.00,
    stock: 30,
    minStock: 6,
    image: "https://images.unsplash.com/photo-1607799275518-d58665d096b1?w=200&h=200&fit=crop"
  },
  {
    id: 12,
    name: "Injetor Diesel Common Rail",
    category: "Motor",
    supplier: "Bosch",
    supplierId: 11,
    price: 680.00,
    stock: 45,
    minStock: 10,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop"
  },
  {
    id: 13,
    name: "Turbo Compressor",
    category: "Motor",
    supplier: "Garrett",
    supplierId: 12,
    price: 2800.00,
    stock: 8,
    minStock: 2,
    image: "https://images.unsplash.com/photo-1607799275518-d58665d096b1?w=200&h=200&fit=crop"
  },
  {
    id: 14,
    name: "Disco de Freio Ventilado",
    category: "Freios",
    supplier: "Brembo",
    supplierId: 13,
    price: 320.00,
    stock: 55,
    minStock: 12,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop"
  },
  {
    id: 15,
    name: "Bomba de Água",
    category: "Resfriamento",
    supplier: "Aisin",
    supplierId: 14,
    price: 285.00,
    stock: 35,
    minStock: 8,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop"
  },
  {
    id: 16,
    name: "Alternador 24V 150A",
    category: "Elétrica",
    supplier: "Bosch",
    supplierId: 11,
    price: 920.00,
    stock: 22,
    minStock: 5,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=200&h=200&fit=crop"
  }
];

// Mock de fornecedores
export const suppliers = [
  {
    id: 1,
    name: "Mann Filter",
    cnpj: "12.345.678/0001-90",
    contact: "Carlos Silva",
    phone: "(11) 3456-7890",
    email: "vendas@mannfilter.com.br",
    address: "Av. Industrial, 1000 - São Paulo/SP",
    products: products.filter(p => p.supplierId === 1).length
  },
  {
    id: 2,
    name: "TRW",
    cnpj: "23.456.789/0001-01",
    contact: "Ana Santos",
    phone: "(11) 3456-7891",
    email: "contato@trw.com.br",
    address: "Rua das Peças, 200 - São Paulo/SP",
    products: products.filter(p => p.supplierId === 2).length
  },
  {
    id: 3,
    name: "Moura",
    cnpj: "34.567.890/0001-12",
    contact: "Roberto Costa",
    phone: "(11) 3456-7892",
    email: "comercial@moura.com.br",
    address: "Av. Baterias, 300 - Guarulhos/SP",
    products: products.filter(p => p.supplierId === 3).length
  },
  {
    id: 4,
    name: "Monroe",
    cnpj: "45.678.901/0001-23",
    contact: "Marina Oliveira",
    phone: "(11) 3456-7893",
    email: "vendas@monroe.com.br",
    address: "Rua Suspensão, 400 - São Paulo/SP",
    products: products.filter(p => p.supplierId === 4).length
  },
  {
    id: 5,
    name: "Gates",
    cnpj: "56.789.012/0001-34",
    contact: "Paulo Ferreira",
    phone: "(11) 3456-7894",
    email: "contato@gates.com.br",
    address: "Av. Correias, 500 - São Caetano do Sul/SP",
    products: products.filter(p => p.supplierId === 5).length
  },
  {
    id: 6,
    name: "Hella",
    cnpj: "67.890.123/0001-45",
    contact: "Carla Mendes",
    phone: "(11) 3456-7895",
    email: "vendas@hella.com.br",
    address: "Rua Luzes, 600 - São Paulo/SP",
    products: products.filter(p => p.supplierId === 6).length
  },
  {
    id: 7,
    name: "Sachs",
    cnpj: "78.901.234/0001-56",
    contact: "Fernando Lima",
    phone: "(11) 3456-7896",
    email: "compras@sachs.com.br",
    address: "Av. Embreagem, 700 - São Paulo/SP",
    products: products.filter(p => p.supplierId === 7).length
  },
  {
    id: 8,
    name: "Valeo",
    cnpj: "89.012.345/0001-67",
    contact: "Luciana Pereira",
    phone: "(11) 3456-7897",
    email: "contato@valeo.com.br",
    address: "Rua Resfriamento, 800 - Campinas/SP",
    products: products.filter(p => p.supplierId === 8).length
  },
  {
    id: 9,
    name: "Würth",
    cnpj: "90.123.456/0001-78",
    contact: "Ricardo Almeida",
    phone: "(11) 3456-7898",
    email: "vendas@werth.com.br",
    address: "Av. Fixação, 900 - São Paulo/SP",
    products: products.filter(p => p.supplierId === 9).length
  },
  {
    id: 10,
    name: "Federal Mogul",
    cnpj: "91.234.567/0001-89",
    contact: "Beatriz Costa",
    phone: "(11) 3456-7899",
    email: "comercial@federalmogul.com.br",
    address: "Rua Motores, 1000 - São Paulo/SP",
    products: products.filter(p => p.supplierId === 10).length
  },
  {
    id: 11,
    name: "Bosch",
    cnpj: "92.345.678/0001-90",
    contact: "André Santos",
    phone: "(11) 3456-7800",
    email: "contato@bosch.com.br",
    address: "Av. Tecnologia, 1100 - São Paulo/SP",
    products: products.filter(p => p.supplierId === 11).length
  },
  {
    id: 12,
    name: "Garrett",
    cnpj: "93.456.789/0001-01",
    contact: "Camila Oliveira",
    phone: "(11) 3456-7801",
    email: "vendas@garrett.com.br",
    address: "Rua Turbo, 1200 - São Paulo/SP",
    products: products.filter(p => p.supplierId === 12).length
  },
  {
    id: 13,
    name: "Brembo",
    cnpj: "94.567.890/0001-12",
    contact: "Diego Ferreira",
    phone: "(11) 3456-7802",
    email: "compras@brembo.com.br",
    address: "Av. Freios, 1300 - São Paulo/SP",
    products: products.filter(p => p.supplierId === 13).length
  },
  {
    id: 14,
    name: "Aisin",
    cnpj: "95.678.901/0001-23",
    contact: "Fernanda Costa",
    phone: "(11) 3456-7803",
    email: "contato@aisin.com.br",
    address: "Rua Água, 1400 - São Paulo/SP",
    products: products.filter(p => p.supplierId === 14).length
  }
];

// Mock de clientes
export const customers = [
  {
    id: 1,
    name: "Transportes Rápidos Ltda",
    cpf: "12.345.678/0001-90",
    phone: "(11) 98765-4321",
    email: "contato@transportesrapidos.com.br",
    address: "Rua das Indústrias, 1000 - São Paulo/SP"
  },
  {
    id: 2,
    name: "João Silva",
    cpf: "123.456.789-00",
    phone: "(11) 91234-5678",
    email: "joao.silva@email.com",
    address: "Av. Principal, 500 - Guarulhos/SP"
  },
  {
    id: 3,
    name: "Logística Express S.A.",
    cpf: "98.765.432/0001-10",
    phone: "(11) 99876-5432",
    email: "compras@logisticaexpress.com.br",
    address: "Rodovia BR-116, km 50 - São Paulo/SP"
  },
  {
    id: 4,
    name: "Pedro Santos",
    cpf: "987.654.321-11",
    phone: "(11) 94567-8901",
    email: "pedro.santos@email.com",
    address: "Rua Comercial, 200 - São Paulo/SP"
  },
  {
    id: 5,
    name: "Caminhões Brasil Ltda",
    cpf: "45.678.901/0001-23",
    phone: "(11) 92345-6789",
    email: "contato@caminhoesbrasil.com.br",
    address: "Av. Industrial, 1500 - São Caetano do Sul/SP"
  },
  {
    id: 6,
    name: "Rodovia Transportes",
    cpf: "67.890.123/0001-45",
    phone: "(11) 99876-5123",
    email: "compras@rodoviatransportes.com.br",
    address: "Av. das Nações, 2000 - São Paulo/SP"
  },
  {
    id: 7,
    name: "Maria Oliveira",
    cpf: "456.789.123-44",
    phone: "(11) 91234-9876",
    email: "maria.oliveira@email.com",
    address: "Rua das Flores, 300 - São Paulo/SP"
  },
  {
    id: 8,
    name: "Auto Peças Central Ltda",
    cpf: "78.901.234/0001-56",
    phone: "(11) 94567-2345",
    email: "contato@autpecascentral.com.br",
    address: "Av. Comercial, 800 - São Paulo/SP"
  }
];

// Mock de vendas
export const sales = [
  {
    id: 1,
    customer: customers[0],
    items: [
      { product: products[0], quantity: 5, subtotal: 429.50 },
      { product: products[1], quantity: 2, subtotal: 579.80 }
    ],
    total: 1009.30,
    date: "2024-01-15",
    status: "Concluído",
    paymentMethod: "Cartão de Crédito"
  },
  {
    id: 2,
    customer: customers[1],
    items: [
      { product: products[2], quantity: 1, subtotal: 650.00 }
    ],
    total: 650.00,
    date: "2024-01-14",
    status: "Concluído",
    paymentMethod: "Dinheiro"
  },
  {
    id: 3,
    customer: customers[2],
    items: [
      { product: products[3], quantity: 4, subtotal: 1680.00 },
      { product: products[4], quantity: 3, subtotal: 375.00 }
    ],
    total: 2055.00,
    date: "2024-01-14",
    status: "Concluído",
    paymentMethod: "Boleto"
  },
  {
    id: 4,
    customer: customers[3],
    items: [
      { product: products[5], quantity: 6, subtotal: 1080.00 }
    ],
    total: 1080.00,
    date: "2024-01-13",
    status: "Concluído",
    paymentMethod: "PIX"
  },
  {
    id: 5,
    customer: customers[4],
    items: [
      { product: products[6], quantity: 2, subtotal: 2500.00 },
      { product: products[7], quantity: 1, subtotal: 880.00 }
    ],
    total: 3380.00,
    date: "2024-01-13",
    status: "Pendente",
    paymentMethod: "Cartão de Crédito"
  },
  {
    id: 6,
    customer: customers[0],
    items: [
      { product: products[8], quantity: 50, subtotal: 425.00 },
      { product: products[9], quantity: 30, subtotal: 387.00 }
    ],
    total: 812.00,
    date: "2024-01-12",
    status: "Concluído",
    paymentMethod: "Boleto"
  }
];

// Mock de métricas
export const metrics = {
  totalVendas: 8986.30,
  vendasMes: 6434.30,
  vendasHoje: 1009.30,
  totalProdutos: products.length,
  produtosBaixoEstoque: products.filter(p => p.stock <= p.minStock).length,
  totalClientes: customers.length,
  totalFornecedores: suppliers.length,
  vendasPendentes: sales.filter(s => s.status === "Pendente").length,
  crescimentoVendas: 18.5,
  lucroMes: 2345.50
};
