import { auth, db } from "./services/firebase";

function App() {
  console.log("Auth:", auth);
  console.log("DB:", db);
  return <div>MateCode</div>;
}

export default App;