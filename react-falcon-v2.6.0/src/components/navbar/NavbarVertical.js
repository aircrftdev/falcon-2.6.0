import React, { useContext, useEffect, useRef } from 'react';
import { Button, Collapse, Nav, Navbar } from 'reactstrap';
import Logo from './Logo';
import NavbarVerticalMenu from './NavbarVerticalMenu';
import ToggleButton from './ToggleButton';
import AppContext from '../../context/Context';
import Flex from '../common/Flex';
import routes from '../../routes';
import { navbarBreakPoint } from '../../config';

const NavbarVertical = ({ isKanban }) => {
  const navBarRef = useRef(null);

  const { showBurgerMenu, isNavbarVerticalCollapsed, setIsNavbarVerticalCollapsed } = useContext(AppContext);

  const HTMLClassList = document.getElementsByTagName('html')[0].classList;
  //Control Component did mount and unmounted of hover effect
  if (isNavbarVerticalCollapsed) {
    HTMLClassList.add('navbar-vertical-collapsed');
  }

  useEffect(() => {
    return () => {
      HTMLClassList.remove('navbar-vertical-collapsed-hover');
    };
  }, [isNavbarVerticalCollapsed, HTMLClassList]);

  //Control mouseEnter event
  let time = null;
  const handleMouseEnter = () => {
    if (isNavbarVerticalCollapsed) {
      time = setTimeout(() => {
        HTMLClassList.add('navbar-vertical-collapsed-hover');
      }, 100);
    }
  };

  return (
    <Navbar expand={navbarBreakPoint} className="navbar-vertical navbar-glass" light>
      <Flex align="center">
        <ToggleButton
          isNavbarVerticalCollapsed={isNavbarVerticalCollapsed}
          setIsNavbarVerticalCollapsed={setIsNavbarVerticalCollapsed}
        />
        <Logo at="navbar-vertical" width={40} />
      </Flex>

      <Collapse
        navbar
        isOpen={showBurgerMenu}
        className="bg-200 scrollbar"
        innerRef={navBarRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => {
          clearTimeout(time);
          HTMLClassList.remove('navbar-vertical-collapsed-hover');
        }}
      >
        <Nav navbar vertical>
          <NavbarVerticalMenu routes={routes} />
        </Nav>
        <hr className="border-300 my-3" />

        <Button
          tag={'a'}
          href="https://themes.getbootstrap.com/product/falcon-admin-dashboard-webapp-template-react/"
          target="_blank"
          color="primary"
          size="sm"
          block
          className="my-3 btn-purchase"
        >
          Purchase
        </Button>
        {/* </Scrollbar> */}
      </Collapse>
    </Navbar>
  );
};

export default NavbarVertical;
