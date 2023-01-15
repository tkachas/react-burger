import React from 'react';
import tabStyle from './custom-tab.module.css';

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export default function CustomTab(props) {
  

  return (
    <div className={tabStyle.custom_tab}>
    
      <Tab value="one" active={props.switch === 'one'} onClick={props.setSwitch}>
      Булки
      </Tab>
      <Tab value="two" active={props.switch === 'two'} onClick={props.setSwitch}>
      Соусы
      </Tab>
      <Tab value="three" active={props.switch === 'three'} onClick={props.setSwitch}>
        Начинки
      </Tab>
    </div>
  )
}
