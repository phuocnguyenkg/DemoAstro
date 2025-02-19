import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Thay 'db.json' bằng tên file JSON của bạn
const middlewares = jsonServer.defaults();

// Middleware để cho phép CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
