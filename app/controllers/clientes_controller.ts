import type { HttpContext } from '@adonisjs/core/http'
import Clientes from '#models/cliente'
import Vendas from '#models/venda'
import { clienteValidator } from '#validators/clientes'

export default class ClientesController {
  async createClient({ request, response, auth }: HttpContext) {
    const { nome, cpf, numero, rua, numeroRua, bairro, cidade, estado, cep } =
      await request.validateUsing(clienteValidator)
    const usuarioId = auth.user!.id
    const client = await Clientes.create({ nome, cpf, usuarioId })

    const enderecos = await client
      .related('endereco')
      .create({ rua, numero: numeroRua, bairro, cidade, estado, cep })
    const telefones = await client.related('telefones').create({ numero })

    return response.created({
      ...client.serialize(),
      endereco: enderecos.serialize(),
      telefones: telefones.serialize(),
    })
  }
  async getClient({ params, response }: HttpContext) {
    let { id } = params
    const client = await Clientes.findOrFail(id)

    const clientSales = await Vendas.query()
      .where('cliente_id', id)
      .preload('produto', (query) => {
        query.select('id', 'nome', 'preco')
      })
      .orderBy('criado_em', 'desc')
    return response.ok({
      ...client.serialize(),
      vendas: clientSales,
    })
  }

  async getClientWithDate({ params, response }: HttpContext) {
    let { id, ano, mes } = params

    mes = mes ? (Number(mes) + 1 > 12 ? 1 : Number(mes)) : new Date().getMonth() + 1
    mes = mes.toString().length === 1 ? `0${mes}` : mes

    const client = await Clientes.findOrFail(id)
    const clientSales = await Vendas.query()
      .where('cliente_id', id)
      .whereBetween('criado_em', [`${ano}-${mes}-01`, `${ano}-${Number(mes) + 1}-31`])
      .preload('produto', (query) => {
        query.select('id', 'nome', 'preco')
      })
      .orderBy('criado_em', 'desc')
    return response.ok({
      ...client.serialize(),
      vendas: clientSales,
    })
  }

  async deleteClient({ request, response }: HttpContext) {
    const { id } = request.only(['id'])
    const client = await Clientes.findOrFail(id)
    const clientSales = await Vendas.query().where('cliente_id', id)

    clientSales.forEach(async (sale) => {
      await sale.delete()
    })
    await client.delete()
    return response.accepted({ message: 'Cliente e suas vendas deletado com sucesso' })
  }

  async editClient({ request, response }: HttpContext) {
    const { id, nome, cpf, numero, rua, numeroRua, bairro, cidade, estado, cep } =
      await request.validateUsing(clienteValidator)

    const clientDB = await Clientes.findOrFail(id)
    const enderecoDB = await clientDB.related('endereco').query().firstOrFail()
    const telefonesDB = await clientDB.related('telefones').query().firstOrFail()

    await clientDB.merge({ nome, cpf }).save()
    await enderecoDB.merge({ rua, numero: numeroRua, bairro, cidade, estado, cep }).save()
    await telefonesDB.merge({ numero }).save()

    return response.ok({
      ...clientDB.serialize(),
      endereco: enderecoDB.serialize(),
      telefones: telefonesDB.serialize(),
    })
  }

  async listAllClients({ response }: HttpContext) {
    const clients = await Clientes.query()
      .preload('endereco', (query) => {
        query.select('rua', 'numero', 'bairro', 'cidade', 'estado', 'cep')
      })
      .preload('telefones', (query) => {
        query.select('numero')
      })
      .orderBy('id', 'asc')

    const serializedClients = clients.map((client) => {
      return {
        ...client.serialize(),
        endereco: client.endereco.serialize(),
        telefones: client.telefones.serialize(),
      }
    })

    return response.ok(serializedClients)
  }
}
