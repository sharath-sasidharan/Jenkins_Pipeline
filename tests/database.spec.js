const {
  insertData,
  getUserByEmail,
  updateUserByEmail,
  deleteUserByEmail,
} = require("../connection.js");
const { test, expect } = require("@playwright/test");

const { userData } = require("../data/test.json");

//Insert
for (let { name, email, role } of userData) {
  console.log(userData, "userData===========");
  test(`Insert user: ${email}`, async () => {
    try {
      await insertData(name, email, role);
      console.log(`✅ Inserted: ${email}`);
    } catch (err) {
      console.error(`❌ ${err.message}`);
    }
  });
}

// Retrieve
test("Verify user role from DB", async () => {
  const user = await getUserByEmail();
  console.log(user, "user");
  expect(user.role).toBe("Admin");
});

// Update
test("Update user by email", async () => {
  const email = "jerome@facebbok.com";
  const newName = "Johnny Updated";
  const newRole = "Super ADMIN";

  const updateResult = await updateUserByEmail(email, newName, newRole);
  console.log(`Rows affected: ${updateResult.affectedRows}`);

  const updatedUser = await getUserByEmail(email);
  console.log("Updated user:", updatedUser);
});

//Delete
test("Delete user by email", async () => {
  const email = "jerome@facebbok.com";
  const deleteResult = await deleteUserByEmail(email);
  console.log(`Deleted: ${deleteResult.affectedRows}`);
});
