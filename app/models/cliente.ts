import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import Endereco from './endereco.js'
import Telefone from './telefone.js'
import Usuario from './usuario.js'
import { DateTime } from 'luxon'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare usuarioId: number

  @column()
  declare nome: string

  @column()
  declare cpf: string

  @column.dateTime({ autoCreate: true })
  declare criadoEm: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare atualizadoEm: DateTime | null

  @belongsTo(() => Usuario)
  declare usuario: BelongsTo<typeof Usuario>

  @hasOne(() => Endereco)
  declare endereco: HasOne<typeof Endereco>

  @hasOne(() => Telefone)
  declare telefones: HasOne<typeof Telefone>
}
