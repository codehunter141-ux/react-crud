import UserCrud from "./components/UserCrud";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          User Management 🚀
        </h1>
      </header>

      {/* User CRUD */}
      <UserCrud />
    </div>
  );
}

export default App;
