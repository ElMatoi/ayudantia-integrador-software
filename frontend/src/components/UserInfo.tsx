import { useState } from 'react';
import { getUser, getUsers } from '../api/userService';
import { User } from '../types/user';

export default function UserInfo() {
  const [rut, setRut] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    try {
      const found = await getUser(rut);
      setUser(found.data);
      setUsers([])
      setError(null);
    } catch (err: any) {
      setUser(null);
      setUsers([])
      setError(err.response?.data?.message || 'Usuario no encontrado');
    }
  };

  const handleFetchAll = async () => {
    try {
      const all = await getUsers();
      setUsers(all);
      setUser(null); // limpiar el usuario individual si hay lista
      setError(null);
    } catch (err: any) {
      setUsers([]);
      setUser(null);
      setError('Error al obtener usuarios');
    }
  };


  return (
    <div className="card">
      <div className="header-with-actions">
        <h2>Buscar Usuario</h2>
      </div>

      <div className="form-group">
        <label htmlFor="searchRut">RUT</label>
        <input
          id="searchRut"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          placeholder="Ej: 12.345.678-9"
        />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handleFetch} className="btn btn-secondary">Buscar</button>
        <button onClick={handleFetchAll} className="btn btn-primary">Mostrar todos</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {user && (
        <div style={{ marginTop: '16px' }}>
          <h3>Usuario encontrado</h3>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>RUT:</strong> {user.rut}</p>
        </div>
      )}

      {users.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <h3>Lista de usuarios</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>RUT</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.rut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}