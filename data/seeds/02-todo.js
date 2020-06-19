
exports.seed = function(knex) {
      return knex('todos').insert([
        {title: 'test',description: "test", completed: true,  user_id: 1 },
        {title: 'test1',description: "test1", completed: true,  user_id: 2 },
        {title: 'test1',description: "test1", completed: false,  user_id: 2 }
      
      ]);
   
};