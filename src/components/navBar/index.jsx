import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from '../button';
import { NavMobile } from '../nav-mobile';
import { NavDesktop } from '../nav-desktop';
import { useMediaQuery } from 'react-responsive';
import { setUser } from '../../store/userSlice';

const NavBar = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // Define el breakpoint para dispositivos móviles
  const [btnText, setBtnText] = useState('Login');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (user.user) {
      setBtnText(user.user.username);
    } else {
      setBtnText('Login');
    }
  }, [user]);

  const handleLogin = () => {
    if (user.user) {
      dispatch(setUser(null));
      localStorage.removeItem('token');
    } else {
      navigate('/login');
    }
  }

  return (
    <header className="bg-blue-500 py-4 md:py-6">
      <div className="flex items-center justify-between px-4 md:px-6">

        <Link className="flex items-center space-x-2" to="/">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-10 w-10" alt="Logo" />
          <span className="font-semibold text-white">Distribuidora</span>
        </Link>

        {/* Renderiza NavMobile si el dispositivo es móvil, de lo contrario, renderiza NavDesktop */}
        {isMobile ?
          <div className='flex items-center'>
            {/* Botón de login */}
            <div className="md:flex items-center">
              <Button
                onClick={handleLogin}
                text={btnText}
                isActive={true}
              />
            </div>
            <NavMobile />
          </div>
          :
          <div className='flex items-center'>
            <NavDesktop />
            {/* Botón de login */}
            <div className="md:flex items-center ml-4">
              <Link to="/Login">
                <Button
                  onClick={handleLogin}
                  text={btnText}
                  isActive={true}
                />
              </Link>
            </div>
          </div>
        }

      </div>
    </header>
  );
};

export { NavBar };
