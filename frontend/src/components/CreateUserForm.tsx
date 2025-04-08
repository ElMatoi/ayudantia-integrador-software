import { useState, FormEvent, ChangeEvent } from 'react';
import { CreateUserDto } from '../types/user';
import { createUser } from '../api/userService';

interface Props {
  onUserCreated: (userId: string) => void;
  setError: (error: string | null) => void;
}

export default function CreateUserForm({ onUserCreated, setError }: Props) {
  const [formData, setFormData] = useState<CreateUserDto>({ name: '', rut: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await createUser(formData);
      setError(null);
      onUserCreated(user.id);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear el usuario');
    }
  };

  return (
    <div className="card">
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input name="name" id="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="rut">RUT</label>
          <input name="rut" id="rut" value={formData.rut} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Crear Usuario</button>
      </form>
    </div>
  );
}
