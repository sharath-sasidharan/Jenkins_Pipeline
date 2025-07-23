const mysql = require("mysql2/promise");

async function getConnection() {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Albin@2024",
    database: "sarathdb",
  });
}

async function insertData(name, email, role) {
  const connection = await getConnection();
  try {
    const [rows] = await connection.execute(
      "INSERT INTO users (name, email, role) VALUES (?, ?, ?)",
      [name, email, role]
    );
    return rows;
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new Error(`Email ${email} already exists`);
    }
    throw err;
  } finally {
    await connection.end();
  }
}

async function getUserByEmail(email) {
  const connection = await getConnection();
  // return array of object
  const [rows] = await connection.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  await connection.end();
  return rows[0];
}

async function updateUserByEmail(email, newName, newRole) {
  const connection = await getConnection();
  const [result] = await connection.execute(
    "UPDATE users SET name = ?, role = ? WHERE email = ?",
    [newName, newRole, email]
  );
  await connection.end();
  return result;
}
async function deleteUserByEmail(email) {
  const connection = await getConnection();
  const [result] = await connection.execute(
    "DELETE FROM users WHERE email = ?",
    [email]
  );
  await connection.end();
  return result;
}

module.exports = {
  getUserByEmail,
  insertData,
  updateUserByEmail,
  deleteUserByEmail,
};
