// src/App.tsx
import { analytics, logEvent } from "./firebase";
import { db } from "./db";

async function testDb() {
  await db.users.add({
    user_id: 1,
    username: "test",
    email: "test@test.com",
    password: "test",
    roles: ["admin"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sync_status: "pending"
  });
  await db.roles.add({
    role_id: 1,
    role_name: "admin",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    sync_status: "pending"
  });
  const users = await db.users.toArray();
  const roles = await db.roles.toArray();
  console.log("Users:", users, "Roles:", roles);
}

function App() {
  logEvent(analytics, "page_view");
  testDb();
  return <div>Welcome to POS PWA</div>;
}

export default App;