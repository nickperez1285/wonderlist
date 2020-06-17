
exports.seed = function(knex) {
      return knex('todos').insert([
        {todo: 'test', user: 1 },
      
      ]);
   
};