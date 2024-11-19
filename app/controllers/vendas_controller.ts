import type { HttpContext } from '@adonisjs/core/http'
import Vendas from '#models/venda'
import { vendaValidator } from '#validators/vendas'

export default class VendasController {
  async registerSale({ request, response }: HttpContext) {
    const { clienteId, produtoId, quantidade, precoUnitario, precoTotal } =
      await request.validateUsing(vendaValidator)

    const sale = await Vendas.create({
      clienteId,
      produtoId,
      quantidade,
      precoUnitario,
      precoTotal,
    })

    return response.created(sale)
  }
  async showSale({ params, response }: HttpContext) {
    const { id } = params
    const sale = await Vendas.query().where('id', id).preload('produto').firstOrFail()

    return response.ok(sale.serialize())
  }
}
