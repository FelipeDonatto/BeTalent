import vine from '@vinejs/vine'

export const vendaValidator = vine.compile(
  vine.object({
    clienteId: vine.number(),
    produtoId: vine.number(),
    quantidade: vine.number(),
    precoUnitario: vine.number(),
    precoTotal: vine.number(),
  })
)
