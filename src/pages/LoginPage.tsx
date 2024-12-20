import { useState } from "react";
import { getUsers } from "../services/userService";
import { useNavigate } from 'react-router-dom';
import { userInterface } from "../entity/userInterface";

const LoginPage: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const users: userInterface[] = await getUsers();

      const user = users.find(user => user.name === name && user.password === password);

      if (user) {
        const token = "123"; // Simule un jeton
        localStorage.setItem('token', token);
        navigate('/'); 
      } else {
        setError('Identifiants incorrects');
      }
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      setError('Erreur du serveur. Veuillez réessayer.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="relative group">
        <label htmlFor="name" className="absolute left-3 top-2 text-green-800 text-sm transform -translate-y-2 scale-90 transition-all group-focus-within:scale-75 group-focus-within:-translate-y-4">
          Nom d'utilisateur:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full border border-green-500 rounded-lg p-4 text-green-900 bg-green-50 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-500"
        />
      </div>

      <div className="relative group">
        <label htmlFor="password" className="absolute left-3 top-2 text-green-800 text-sm transform -translate-y-2 scale-90 transition-all group-focus-within:scale-75 group-focus-within:-translate-y-4">
          Mot de passe:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full border border-green-500 rounded-lg p-4 text-green-900 bg-green-50 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-500"
        />
      </div>

      {error && <div className="font-medium text-red-400">{error}</div>}

      <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transform transition duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
        Login
      </button>
    </form>
  );
}

export default LoginPage;
