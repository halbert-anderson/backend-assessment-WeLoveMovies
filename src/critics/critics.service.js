const knex = require("../db/connection");

function read(criticId) {
    return knex("critics")
        .select("*")
        .where({ "critic_id": criticId })
        .first();
}

function list() {
    return knex("critics")
        .select("*");
}

module.exports = { read, list, };