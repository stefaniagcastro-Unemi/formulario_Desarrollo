import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

function App() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState({ nombre: '', correo: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const validarCorreo = (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

  const validarPassword = (valor) => {
    if (valor.length < 8) return 'Debe tener al menos 8 caracteres';
    if (!/[A-Z]/.test(valor)) return 'Debe contener al menos una letra mayúscula';
    if (!/[a-z]/.test(valor)) return 'Debe contener al menos una letra minúscula';
    if (!/[0-9]/.test(valor)) return 'Debe contener al menos un número';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(valor)) return 'Debe contener al menos un carácter especial';
    return '';
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    if (name === 'nombre') {
      setNombre(value);
      setErrores(prev => ({ ...prev, nombre: value.trim() === '' ? 'El nombre es obligatorio' : '' }));
    }
    if (name === 'correo') {
      setCorreo(value);
      setErrores(prev => ({ ...prev, correo: !validarCorreo(value) ? 'Correo inválido' : '' }));
    }
    if (name === 'password') {
      setPassword(value);
      setErrores(prev => ({ ...prev, password: validarPassword(value) }));
    }
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!errores.nombre && !errores.correo && !errores.password && nombre && correo && password) {
      alert('Formulario enviado con éxito ');
      setNombre('');
      setCorreo('');
      setPassword('');
    } else {
      alert('Por favor, corrige los errores antes de enviar ');
    }
  };

  return (
    <div className="form-container">
      <h2>Registro del Spa</h2>
      <form onSubmit={manejarSubmit}>
        <div className="input-wrapper">
          <FaUser className="input-icon" />
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nombre}
            onChange={manejarCambio}
            className="form-control"
          />
          {errores.nombre && <p className="error-text">{errores.nombre}</p>}
        </div>

        <div className="input-wrapper">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={correo}
            onChange={manejarCambio}
            className="form-control"
          />
          {errores.correo && <p className="error-text">{errores.correo}</p>}
        </div>

        <div className="input-wrapper">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={manejarCambio}
            className="form-control"
          />
          <span className="show-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errores.password && <p className="error-text">{errores.password}</p>}
        </div>

        <button type="submit" className="btn btn-custom w-100">Enviar</button>
      </form>
    </div>
  );
}

export default App;
