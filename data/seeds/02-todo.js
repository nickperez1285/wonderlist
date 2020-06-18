
exports.seed = function(knex) {
      return knex('todos').insert([
        {title: 'test',description: "test", completed: true,  user: 1, },
      
      ]);
   
};