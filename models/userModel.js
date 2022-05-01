module.exports = {
  get: function (conn, callback) {
    conn.query("SELECT * FROM users", callback)
  },

  getById: function (conn, id, callback) {
    conn.query(`SELECT * FROM users WHERE id = ${id}`, callback)
  },

  create: function (conn, data, callback) {
    conn.query(
      `INSERT INTO users SET 
      username = '${data.username}', 
      password = '${data.password}', 
      email = '${data.email}', 
      fullname = '${data.fullname}', 
      role = '${data.role}'`,
      callback
    )
  },

  update: function (conn, data, id, callback) {
    conn.query(
      `UPDATE users SET 
      username = '${data.username}',
      password = '${data.password}',
      email = '${data.email}', 
      fullname = '${data.fullname}',
      role = '${data.role}'
      WHERE id = ${id}`,
      callback
    )
  },

  destroy: function (conn, id, callback) {
    conn.query(`DELETE FROM users WHERE id = ${id}`, callback)
  },
}
