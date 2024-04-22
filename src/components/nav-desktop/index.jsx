import { routes } from "../../routes";
import { Link } from 'react-router-dom'

export const NavDesktop = () => {
  return (
    <ul className="lg:flex lg:items-center gap-5 text-sm font-semibold text-white flex">
      {routes.map((route) => {
        const { Icon, path, title } = route;
        return (
          <li key={path}>
            <Link
              to={path}
              className="flex items-center gap-1 hover:text-neutral-400 transition-all"
            >
              <Icon />
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
