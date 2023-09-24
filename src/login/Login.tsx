import React, { useState, useContext, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreContext from './Context';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

interface FormValues {
  nome: string;
  senha: string;
}

function initialState(): FormValues {
  return { nome: '', senha: '' };
}

async function login({ nome, senha }: FormValues) {
  try {
    const response = await axios.get(`https://backend-bibliotech.vercel.app/api/api/user?nome=${nome}`);
    const responseUserData = response.data;
    const userData = responseUserData.usuarios[0];

    if (userData && userData.senha === senha) {
      return {
        token: userData.token,
      };
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `Usuário ou senha inválido`,
        showConfirmButton: false,
        timer: 1500,
      });
      return {};
    }
  } catch (error) {
    return { error: 'Erro ao fazer a solicitação' };
  }
}

const UserLogin: React.FC = () => {
  const [values, setValues] = useState<FormValues>(initialState);
  const [, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setToken } = useContext(StoreContext);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { token, error } = await login(values);

    if (token) {
      setToken(token);
      localStorage.setItem('token', token);
      navigate('/');
    }

    setError(error || '');
    setValues(initialState);
  }

  return (
    <section className="secFormLoginUser">
      <dialog className="formLoginUser" open>
        <div className="dialogLoginRight">
          <form className="formLogin" onSubmit={onSubmit}>
            <div className="cabecalhoFormLogin">
              <h2>Bibliotech</h2>
            </div>
            <div className="divDadosFormLogin">
              <label htmlFor="nome">Nome de usuário</label>
              <input
                type="text"
                id="nome"
                placeholder="eeepluciahelena"
                autoComplete='off'
                name="nome"
                onChange={onChange}
                value={values.nome}
              />
            </div>
            <div className="divDadosFormLogin">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                placeholder="insira sua senha"
                autoComplete='off'
                name="senha"
                onChange={onChange}
                value={values.senha}
              />
            </div>
            <div className="btnConfirmeLogin">
              <button type="submit" id="btnenviarlogin">Login</button>
            </div>
          </form>
        </div>
      </dialog>
    </section>
  );
};

export default UserLogin;
