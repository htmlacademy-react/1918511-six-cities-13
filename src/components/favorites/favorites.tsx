import { Link } from 'react-router-dom';
import { TOffersList } from '../../types/offers-list';
import MemoizedCard from '../card/card';

type TFavotiresProps = {
  favList: TOffersList[];
}

function Favorites ({favList} : TFavotiresProps) : JSX.Element {

  const citiesSet = new Set<string>();
  favList.forEach((elem) => {
    citiesSet.add(elem.city.name);
  });
  const uniqueCities = Array.from(citiesSet);

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {uniqueCities.map((cityName) => (
              <li className="favorites__locations-items" key={`${cityName}-xxxcityxxx`}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to="#">
                      <span>{cityName}</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  {favList
                    .filter((offer) => offer.city.name === cityName)
                    .map((elem) => (
                      <MemoizedCard
                        key={`${elem.id}-favs`}
                        offer={elem}
                        isOfferPage={false}
                        isMainPage={false}
                        isFavPage
                        onListItemHover={()=> null}
                      />
                    ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Favorites;


