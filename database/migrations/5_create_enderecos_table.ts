import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'enderecos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('cliente_id')
        .unsigned()
        .references('id')
        .inTable('clientes')
        .onDelete('CASCADE')
      table.string('rua').notNullable()
      table.string('numero').notNullable()
      table.string('bairro').notNullable()
      table.string('cidade').notNullable()
      table.string('estado').notNullable()
      table.string('cep').notNullable()
      table.timestamp('criado_em').notNullable()
      table.timestamp('atualizado_em').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
