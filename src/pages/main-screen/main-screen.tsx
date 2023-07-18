import { OffersList } from '../../types/offers-list';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import CitiesList from '../../components/cities/cities';
import Header from '../../components/header/header';
import Cards from '../../components/cards/cards';
import Map from '../../components/map/map';
import { getOffers } from '../../store/action';

// type MainScreenProps = {
//   offersList: OffersList[];
// };

function MainScreen(): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<OffersList | undefined>(undefined);
  const offersList = useAppSelector((state) => state.offers);
  const handleListItemHover = (listItemId: string) => {
    const currentOffer = offersList.find((offer) => offer.id === listItemId);

    setSelectedOffer(currentOffer);
  };

  const selectedCity = useAppSelector((state) => state.city);
  // const dispatch = useAppDispatch();

  // const filterDataByCity =
  // (offers : OffersList[], cityName: string) : OffersList[] =>
  //   offers.filter((elem) => elem.city.name === cityName);


  // dispatch(getOffers({ cityName: selectedCity}));
  const filteredOffersByCity = useAppSelector((state) => state.offers);
  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <CitiesList />
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {filteredOffersByCity.length} place{filteredOffersByCity.length !== 1 ? 's' : ''} to stay in {selectedCity}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>

              <Cards cardsList={filteredOffersByCity} onListItemHover={handleListItemHover}/>

            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {filteredOffersByCity.length !== 0 && <Map offers={filteredOffersByCity} selectedPoint={selectedOffer}/>}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
