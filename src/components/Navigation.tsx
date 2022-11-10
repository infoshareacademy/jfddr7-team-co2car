import { FC } from "react";

import { Link } from "react-router-dom";
export const Navigation: FC = () => {
  return (
    <>
      <div>Strona główna</div>
      <div> Profil</div>
      <div> Wyloguj</div>
      <ul>
        <li>
          <Link to="/">Strona główna</Link>
        </li>
        <li>
          <Link to="/">Profil</Link>
        </li>
        <li>
          <Link to="/">Wyloguj</Link>
        </li>
      </ul>
    </>
  );
};
