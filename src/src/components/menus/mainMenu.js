import { useState, useEffect } from 'react';
import Menu from './menu';

const MainMenu = ({ mainMenuOpen, setMainMenuOpen }) => {
  const [init, setInit] = useState(false);
  const [menuData, setMenuData] = useState();
  const [menuState, setMenuState] = useState();
  useEffect(() => {
    if (mainMenuOpen) {
      setInit(true);
      setMenuState((prevState) => ({ ...prevState, root: true }));
    } else {
      setMenuState((prevState) => {
        let resetState = {};
        for (const key in prevState) {
          resetState[key] = false;
        }
        return resetState;
      });
    }
  }, [mainMenuOpen]);
  useEffect(() => {
    (async () => {
      const data = await fetch('/menu.json')
        .then((res) => res.json(res))
        .catch((error) => console.error(error));
      setMenuData(data.menus);
    })();
  }, []);
  useEffect(() => {
    if (menuData) {
      try {
        if (menuData.find((menu) => menu.id === 'root') !== undefined) {
          let initState = {};
          menuData.forEach((menu) => (initState[menu.id] = false));
          setMenuState(initState);
        } else throw "There must be a menu with an id of 'root' in the data";
      } catch (error) {
        console.error(error);
      }
    }
  }, [menuData]);
  return menuData && menuState ? (
    <div
      className={`main-menu${
        init ? (menuState.root ? ' main-menu--open' : ' main-menu--closed') : ''
      }`}
    >
      {menuData?.map((menu) => (
        <Menu
          key={`${menu.id}`}
          allMenus={menuData}
          thisMenuId={menu.id}
          state={menuState}
          setState={setMenuState}
          setMainMenuOpen={setMainMenuOpen}
        />
      ))}
    </div>
  ) : null;
};

export default MainMenu;
