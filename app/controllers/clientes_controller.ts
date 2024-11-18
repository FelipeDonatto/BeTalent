import type { HttpContext } from '@adonisjs/core/http'
import Clientes from '#models/cliente'
import { clienteValidator } from '#validators/clientes'
export default class ClientesController {
  async createClient({ request, response, auth }: HttpContext) {
    const { nome, cpf, numero, rua, numeroRua, bairro, cidade, estado, cep } =
      await request.validateUsing(clienteValidator)
    const usuarioId = auth.user!.id
    const client = await Clientes.create({ nome, cpf, usuarioId })

    await client.related('endereco').create({ rua, numero: numeroRua, bairro, cidade, estado, cep })
    await client.related('telefones').create({ numero })

    return response.created({
      ...client.serialize(),
      endereco: client.endereco.serialize(),
      telefones: client.telefones.serialize(),
    })
  }

  async listAllClients({ request, response }: HttpContext) {
    const clients = await Clientes.query().preload('telefones').preload('endereco')

    return response.ok(clients)
  }
}
