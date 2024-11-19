// app/Models/Venda.ts
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Cliente from './cliente.js'
import Produto from './produto.js'
import { DateTime } from 'luxon'

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

  @column.dateTime({ autoCreate: true })
  declare criadoEm: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare atualizadoEm: DateTime | null

  @belongsTo(() => Cliente)
  declare cliente: BelongsTo<typeof Cliente>

  @belongsTo(() => Produto)
  declare produto: BelongsTo<typeof Produto>
}
