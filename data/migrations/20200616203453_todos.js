exports.up = function (knex) {
  return knex.schema
   
    .createTable("users", tbl => {
      tbl.increments();
      tbl.string("username", 128).notNullable().unique().index();
      tbl.string("password", 256).notNullable();
      })

 .createTable("todos", tbl => {
      tbl.increments();
      tbl.string("title", 128).notNullable();
      tbl.string("description", 128).notNullable();
      tbl.boolean("completed").notNullable();
	    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("todos").dropTableIfExists("users");
};
