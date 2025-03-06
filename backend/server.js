const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Crear una instancia de Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Base de datos simulada (puedes usar SQLite o MongoDB en producción)
let facturas = [
  { id: 1, amount: 100, status: 'Pendiente', customerEmail: 'cliente1@dominio.com' },
  { id: 2, amount: 200, status: 'Pagada', customerEmail: 'cliente2@dominio.com' }
];

// Ruta para obtener todas las facturas
app.get('/facturas', (req, res) => {
  res.json(facturas);
});

// Ruta para crear una factura
app.post('/create-invoice', (req, res) => {
    const { amount, customerEmail } = req.body;
    console.log("Datos recibidos en el backend:", { amount, customerEmail }); // Imprime los datos
  
    if (!amount || !customerEmail) {
      return res.status(400).json({ message: "Faltan datos" }); // Verifica si faltan datos
    }
  
    const newInvoice = { id: facturas.length + 1, amount, status: 'Pendiente', customerEmail };
    facturas.push(newInvoice);
    console.log("Factura creada:", newInvoice);  // Log para ver que se ha creado la factura
    res.status(201).json(newInvoice);
  });
  
  

// Ruta para procesar el pago
app.post('/process-payment', (req, res) => {
  const { facturaId, metodo } = req.body;
  const factura = facturas.find(f => f.id === parseInt(facturaId));

  if (factura) {
    factura.status = 'Pagada';
    console.log(`Pago procesado con ${metodo} para la factura ID: ${facturaId}`);  // Log para ver el pago procesado

    res.json({ message: `Pago procesado con ${metodo}` });
  } else {
    res.status(404).json({ message: 'Factura no encontrada' });
  }
});


// Iniciar el servidor
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
