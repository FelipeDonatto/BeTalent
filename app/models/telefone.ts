import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Telefone extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare clienteId: number

  @column()
  declare numero: string
}
