import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class addCategoryIdToPosts extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('category_id')
        .unsigned()
        .references('categories.id')
        .onDelete('SET NULL')
        .nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('category_id')
    })
  }
}
