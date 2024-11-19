import vine from '@vinejs/vine'

export const produtoValidator = vine.compile(
  vine.object({
    id: vine.number().optional(),
    nome: vine.string(),
    descricao: vine.string(),
    preco: vine.number(),
    ativo: vine.boolean().optional(),
  })
)
