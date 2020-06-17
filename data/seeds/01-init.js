
exports.seed = function(knex) {
      return knex('users').insert([
        {username: 'test', password:'test'},
      
      ]);
      return knex('todos').insert([
        { todo: 'test'

        }
        ])
};