
exports.seed = function(knex) {
      return knex('todos').insert([
        {title: 'test',description: "test", completed: true,  user_id: 1 },
        {title: 'test1',description: "test2", completed: true,  user_id: 2 },
        {title: 'test2',description: "test2", completed: false,  user_id: 2 },
        {title: 'test3',description: "test3", completed: false,  user_id: 3 }
      
      ]);
   
};