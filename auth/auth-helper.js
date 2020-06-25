const db = require("../data/dbConfig");

function findById(id) {
  return db("users").where({ id }).first();
}

function findBy(filter) {
  return db("users").select("id", "username", "password").where(filter);
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    // console.log(error);
  }
}

module.exports = {
  findById,
  add,
  findBy,
};
