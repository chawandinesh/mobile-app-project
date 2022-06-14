import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MainMenu } from '../menus';
import { BasketSummary } from '../basketSummary/basketSummary';

const SiteHeader = () => {
  const [mainMenuOpen, setMainMenuOpen] = useState(false);

  return (
    <>
      <header className="main-header">
        <div className="main-header__icons">
          <Link to="#" className="main-header__links">
            <svg className="svg-account">
              <use href="#svg-account" />
            </svg>
            <p className="main-header__text">Account</p>
          </Link>
          <BasketSummary />
          <Link
            to={{search: window.location.search}}
            className="main-header__links"
            onClick={() => setMainMenuOpen(!mainMenuOpen)}
          >
            {mainMenuOpen ? (
              <svg className="svg-menu-close">
                <use href="#svg-menu-close" />
              </svg>
            ) : (
              <svg className="svg-menu">
                <use href="#svg-menu" />
              </svg>
            )}
            <p className="main-header__text">Menu</p>
          </Link>
        </div>
      </header>
      <MainMenu mainMenuOpen={mainMenuOpen} setMainMenuOpen={setMainMenuOpen} />
    </>
  );
};

export default SiteHeader;
