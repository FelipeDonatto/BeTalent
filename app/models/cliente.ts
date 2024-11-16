import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Endereco from './endereco.js'
import Telefone from './telefone.js'
import Usuario from './usuario.js'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare usuarioId: number

  @column()
  declare nome: string

  @column()
  declare cpf: string

  @belongsTo(() => Usuario)
  declare usuario: BelongsTo<typeof Usuario>

  @hasOne(() => Endereco)
  declare endereco: HasOne<typeof Endereco>

  @hasMany(() => Telefone)
  declare telefones: HasMany<typeof Telefone>
}
