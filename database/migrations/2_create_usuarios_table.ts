import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('nome').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('senha').notNullable()
      table.timestamp('criado_em').notNullable()
      table.timestamp('atualizado_em').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
