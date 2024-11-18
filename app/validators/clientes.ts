import vine from '@vinejs/vine'

export const clienteValidator = vine.compile(
  vine.object({
    nome: vine.string(),
    cpf: vine.string().minLength(11).maxLength(13),
    rua: vine.string(),
    numero: vine.string(),
    numeroRua: vine.string(),
    bairro: vine.string(),
    cidade: vine.string(),
    estado: vine.string(),
    cep: vine.string(),
  })
)
