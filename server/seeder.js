// server/seeder.js
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

// Datos de ejemplo
const products = [
  {
    name: 'Smartphone XYZ',
    price: 599.99,
    category: 'Electrónica',
    description: 'Smartphone de última generación con cámara de alta resolución',
    image: 'https://via.placeholder.com/300x200?text=Smartphone',
    stock: 15
  },
  {
    name: 'Laptop Pro',
    price: 1299.99,
    category: 'Electrónica',
    description: 'Laptop potente para trabajo y gaming',
    image: 'https://via.placeholder.com/300x200?text=Laptop',
    stock: 8
  },
  {
    name: 'Auriculares Bluetooth',
    price: 89.99,
    category: 'Accesorios',
    description: 'Auriculares inalámbricos con cancelación de ruido',
    image: 'https://via.placeholder.com/300x200?text=Auriculares',
    stock: 20
  },
  {
    name: 'Zapatillas Running',
    price: 129.99,
    category: 'Deportes',
    description: 'Zapatillas ligeras para correr largas distancias',
    image: 'https://via.placeholder.com/300x200?text=Zapatillas',
    stock: 12
  },
  {
    name: 'Smartwatch Fitness',
    price: 199.99,
    category: 'Electrónica',
    description: 'Reloj inteligente con monitor de ritmo cardíaco y GPS',
    image: 'https://via.placeholder.com/300x200?text=Smartwatch',
    stock: 10
  },
  {
    name: 'Cámara DSLR',
    price: 699.99,
    category: 'Electrónica',
    description: 'Cámara profesional con lente intercambiable',
    image: 'https://via.placeholder.com/300x200?text=Camara',
    stock: 5
  }
];

// Función para importar datos
const importData = async () => {
  try {
    // Limpiar la base de datos
    await Product.deleteMany();

    // Insertar datos
    await Product.insertMany(products);

    console.log('Datos importados correctamente');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Función para eliminar datos
const destroyData = async () => {
  try {
    // Limpiar la base de datos
    await Product.deleteMany();

    console.log('Datos eliminados correctamente');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Ejecutar según el argumento
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}