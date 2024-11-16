import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clientes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('usuario_id')
        .unsigned()
        .references('id')
        .inTable('usuarios')
        .onDelete('CASCADE')
      table.string('nome').notNullable()
      table.string('cpf').notNullable().unique()
      table.timestamp('criado_em').notNullable()
      table.timestamp('atualizado_em').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
