import { useState } from 'react';
import './App.css';
import CreateUserForm from './components/CreateUserForm';
import UserInfo from './components/UserInfo';

export default function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="container">
      <header className="header">
        <h1>Gestión de Usuarios</h1>
        <p>Crear y buscar usuarios en el sistema</p>
      </header>

      <CreateUserForm onUserCreated={setUserId} setError={setError} />
      <UserInfo />

      {userId && (
        <div className="card">
          <p><strong>Usuario creado con ID:</strong> {userId}</p>
        </div>
      )}
    </div>
  );
}
