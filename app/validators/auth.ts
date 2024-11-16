import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    senha: vine.string().minLength(8).maxLength(32),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    nome: vine.string().minLength(3).maxLength(64),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('usuarios').where('email', value).first()
        return !user
      }),
    senha: vine.string().minLength(8).maxLength(32),
  })
)
