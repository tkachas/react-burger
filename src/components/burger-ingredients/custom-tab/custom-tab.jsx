import React from "react";
import tabStyle from "./custom-tab.module.css";
import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export default function CustomTab({ tab, change }) {
  return (
    <div className={tabStyle.custom_tab}>
      <Tab value="one" active={tab === "one"} onClick={change}>
        Булки
      </Tab>
      <Tab value="two" active={tab === "two"} onClick={change}>
        Соусы
      </Tab>
      <Tab value="three" active={tab === "three"} onClick={change}>
        Начинки
      </Tab>
    </div>
  );
}

CustomTab.propTypes = {
  tab: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};
