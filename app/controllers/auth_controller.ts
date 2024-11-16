import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import { loginValidator, registerValidator } from '#validators/auth'

export default class UsuariosController {
  async login({ request, response, auth }: HttpContext) {
    const { email, senha } = await request.validateUsing(loginValidator)

    const user = await Usuario.verifyCredentials(email, senha)
    const token = await auth.use('jwt').generate(user)

    return response.ok({
      token: token,
      ...user.serialize(),
    })
  }

  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const user = await Usuario.create(payload)

    return response.created(user)
  }
}
