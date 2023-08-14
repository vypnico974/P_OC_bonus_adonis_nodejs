import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable
      table.text('content','longtext').nullable
      table.boolean('online').notNullable().defaultTo(false)
      table.string('thumbnail').nullable

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
