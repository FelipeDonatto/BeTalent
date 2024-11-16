// app/Models/Venda.ts
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Cliente from './cliente.js'
import Produto from './produto.js'

export default class Venda extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare clienteId: number

  @column()
  declare produtoId: number

  @column()
  declare quantidade: number

  @column()
  declare precoUnitario: number

  @column()
  declare precoTotal: number

  @column()
  declare dataHora: Date

  @belongsTo(() => Cliente)
  declare cliente: BelongsTo<typeof Cliente>

  @belongsTo(() => Produto)
  declare produto: BelongsTo<typeof Produto>
}
