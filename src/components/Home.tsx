import { FC } from "react";

export const Home: FC = () => {
  return (
    <div>
      <div>
        <div>Strona główna</div>
        <div> Profil</div>
        <div> Wyloguj</div>
      </div>
      <h2>Oblicz emisję dwutlenku węgla swojego samochodu </h2>
      <form>
        <label>
          Wpisz długość dystansu:
          <input type="text" />
        </label>

        <label>
          Wpisz markę samochodu:
          <input type="select" />
        </label>

        <label>
          Wpisz model samochodu:
          <input type="text" />
        </label>

        <button>Oblicz emisję</button>
        <div> to jest div pokazujący wynik</div>
      </form>

      {/* <Wykres/> tutaj później włożyc komponent z wykresem*/}
      <button> Wyślij wynik obliczeń emisji do moich danych w </button>
    </div>
  );
};
