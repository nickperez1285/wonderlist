exports.up = function (knex) {
  return knex.schema
   
    .createTable("users", tbl => {
      tbl.increments();
      tbl.string("username", 128).notNullable().unique().index();
      tbl.string("password", 256).notNullable();
      })

 .createTable("todos", tbl => {
      tbl.increments();
      tbl.string("todo", 128).notNullable();
    
      tbl
        .integer("user")
        .unsigned()
        .references("user.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("todos").dropTableIfExists("users");
};
