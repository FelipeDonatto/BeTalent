import type { HttpContext } from '@adonisjs/core/http'
import Produtos from '#models/produto'
import { produtoValidator } from '#validators/produtos'

export default class ProdutosController {
  async listAllProducts({ response }: HttpContext) {
    const products = await Produtos.query()
      .orderBy('nome', 'asc')
      .select('id', 'nome', 'preco', 'descricao', 'ativo')
    return response.ok(products)
  }

  async showProduct({ params, response }: HttpContext) {
    const { id } = params
    const product = await Produtos.findOrFail(id)
    return response.ok(product)
  }

  async createProduct({ request, response }: HttpContext) {
    const payload = await request.validateUsing(produtoValidator)
    const product = await Produtos.create(payload)
    return response.created(product)
  }

  async editProduct({ request, response }: HttpContext) {
    const payload = await request.validateUsing(produtoValidator)
    const { id } = request.only(['id'])
    const product = await Produtos.findOrFail(id)
    await product.merge(payload).save()
    return response.ok(product)
  }

  async deleteProduct({ request, response }: HttpContext) {
    const { id } = request.only(['id'])
    const product = await Produtos.findOrFail(id)
    await product.delete()
    return response.accepted({ message: 'Produto deletado com sucesso' })
  }
  async softDeleteProduct({ request, response }: HttpContext) {
    const { id } = request.only(['id'])
    const product = await Produtos.findOrFail(id)
    await product.merge({ ativo: !product.ativo }).save()
    return response.accepted({
      message: `Produto ${product.ativo ? 'ativado' : 'desativado'} com sucesso`,
    })
  }
}
