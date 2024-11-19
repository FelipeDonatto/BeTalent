import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const VendasController = () => import('#controllers/vendas_controller')
const ProdutosController = () => import('#controllers/produtos_controller')

const AuthController = () => import('#controllers/auth_controller')
const ClientesController = () => import('#controllers/clientes_controller')

router
  .group(() => {
    router.post('registrar', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
  })
  .prefix('usuario')

router
  .group(() => {
    router.post('registrar', [ClientesController, 'createClient'])
    router.put('editar', [ClientesController, 'editClient'])
    router.get('listar', [ClientesController, 'listAllClients'])
    router.get('buscar/:id', [ClientesController, 'getClient'])
    router.get('buscar/:id/:ano/:mes?', [ClientesController, 'getClientWithDate'])
    router.delete('deletar', [ClientesController, 'deleteClient'])
  })
  .prefix('clientes')
  .use(middleware.auth())

router
  .group(() => {
    router.post('registrar', [ProdutosController, 'createProduct'])
    router.put('editar', [ProdutosController, 'editProduct'])
    router.get('listar', [ProdutosController, 'listAllProducts'])
    router.get('buscar/:id', [ProdutosController, 'showProduct'])
    router.delete('deletar', [ProdutosController, 'deleteProduct'])
    router.put('desativar', [ProdutosController, 'softDeleteProduct'])
  })
  .prefix('produtos')
  .use(middleware.auth())

router
  .group(() => {
    router.post('registrar', [VendasController, 'registerSale'])
    router.get('buscar/:id', [VendasController, 'showSale'])
  })
  .prefix('vendas')
  .use(middleware.auth())
