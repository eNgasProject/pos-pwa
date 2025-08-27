// src/App.tsx
import { analytics, logEvent } from "./firebase";
import AdminRegister from "./components/AdminRegister";

function App() {
  logEvent(analytics, "page_view");
  return (
    <div>
      <AdminRegister />
    </div>
  );
}

export default App;