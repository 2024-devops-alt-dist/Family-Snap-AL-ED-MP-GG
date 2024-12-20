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
        navigate('/events'); 
      } else {
        setError('Identifiants incorrects');
      }
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      setError('Erreur du serveur. Veuillez réessayer.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-md mx-auto p-8 rounded-lg shadow-xl bg-gradient-to-br from-red-200 via-white to-red-100 border-4 border-red-500 transform transition-all hover:scale-105 hover:shadow-2xl"
    >
      <h2 className="text-4xl font-extrabold text-red-800 text-center animate-pulse">
        🎄 Connexion 🎁
      </h2>
  
      <div className="relative group">
        <label
          htmlFor="name"
          className="absolute left-3 top-2 text-red-800 text-sm transform -translate-y-2 scale-90 transition-all group-focus-within:scale-75 group-focus-within:-translate-y-4"
        >
          🎅 Nom d'utilisateur
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full border border-red-500 rounded-lg p-4 text-red-900 bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-400 focus:border-red-600 placeholder-red-800 transition-all duration-300 focus:shadow-lg"
          placeholder="Entrez votre nom"
        />
      </div>
  
      <div className="relative group">
        <label
          htmlFor="password"
          className="absolute left-3 top-2 text-red-800 text-sm transform -translate-y-2 scale-90 transition-all group-focus-within:scale-75 group-focus-within:-translate-y-4"
        >
          🎄 Mot de passe
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full border border-red-500 rounded-lg p-4 text-red-900 bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-400 focus:border-red-600 placeholder-red-800 transition-all duration-300 focus:shadow-lg"
          placeholder="Entrez votre mot de passe"
        />
      </div>
  
      {error && (
        <div className="font-medium text-red-600 text-center animate-bounce">
          {error}
        </div>
      )}
  
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-lg hover:bg-red-800 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
      >
        🎁 Se Connecter 🎄
      </button>
    </form>
  );
  
}

export default LoginPage;
