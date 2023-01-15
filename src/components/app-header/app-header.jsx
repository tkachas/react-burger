import React from 'react';
import headerStyles from './app-header.module.css';

import {
  Logo,
  ListIcon,
  BurgerIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function AppHeader() {
  return (
   <header className={headerStyles.header}>
   <div className={headerStyles.optionsBar}>
      <div className={`${headerStyles.option} ${headerStyles.option_active}`}>
        <BurgerIcon type="primary"/>
        <a className={`${headerStyles.header_link} ${headerStyles.active}`}
           href="/"
        >
                  <p className="text text_type_main-default">Конструктор</p>
        </a>
      </div>
      <div className={headerStyles.option}>
        <ListIcon type="secondary"/>
        <a className={headerStyles.header_link} href="/">
          <p className="text text_type_main-default">Лента заказов</p>
        </a>
      </div>
      <div className={`${headerStyles.option} ${headerStyles.profile}`}>
        <ProfileIcon type="secondary"/>
        <a className={`${headerStyles.header_link}`} href="/">
          <p className="text text_type_main-default">Личный кабинет</p>
        </a>
      </div>
    </div>
    <div className={[headerStyles.logo_container]}>
      <div>
        <Logo/>
      </div>
    </div>
   </header>
  )
}
