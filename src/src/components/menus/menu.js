import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Menu = ({ allMenus, thisMenuId, state, setState, setMainMenuOpen }) => {
  const [thisMenu, setThisMenu] = useState();
  const [parentMenu, setParentMenu] = useState();
  const drillDown = (child) => (event) => {
    event.preventDefault();
    setState((prevState) => ({ ...prevState, [child.substring(1)]: true }));
  };
  const drillUp = (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      [thisMenu?.parent]: true,
      [thisMenu?.id]: false
    }));
  };
  useEffect(() => {
    setThisMenu(allMenus.find((menu) => menu.id === thisMenuId));
  }, [allMenus, thisMenuId]);

  useEffect(() => {
    if (thisMenu?.parent) {
      setParentMenu(allMenus.find((menu) => menu.id === thisMenu.parent));
    } else setParentMenu(null);
  }, [thisMenu, allMenus]);

  return thisMenu && parentMenu !== undefined ? (
    <nav
      className={`main-menu__nav ${
        state[thisMenu?.id]
          ? ` main-menu__nav--open`
          : ` main-menu__nav--closed`
      }`}
      id={`main-menu__nav--${thisMenu?.id}`}
      aria-label={thisMenu.title}
    >
      {parentMenu ? (
        <a
          className="main-menu__back-link"
          href={`#main-menu__nav--${parentMenu.id}`}
          onClick={drillUp}
        >
          {parentMenu.title}
        </a>
      ) : null}
      <h2>{thisMenu.title}</h2>
      <ul>
        {thisMenu.items?.map((item) => (
          <li key={item.title}>
            {item.href.charAt(0) === '#' ? (
              <a href={item.href} onClick={drillDown(item.href)}>
                {item.title}
              </a>
            ) : (
              <Link to={item.href} onClick={() => setMainMenuOpen(false)}>
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  ) : null;
};

export default Menu;
