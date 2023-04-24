import React from "react";
import tabStyle from "./custom-tab.module.css";
import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab } from "../../../services/slices/ingredients/ingredients-slice";

export default function CustomTab() {
  const dispatch = useDispatch();

  const currentTab = useSelector((state) => state.ingredients.currentTab);

  const handleTabChange = (value) => {
    dispatch(setCurrentTab(value));
  };
  return (
    <div className={tabStyle.custom_tab}>
      <Tab value="one" active={currentTab === "one"} onClick={handleTabChange}>
        Булки
      </Tab>
      <Tab value="two" active={currentTab === "two"} onClick={handleTabChange}>
        Соусы
      </Tab>
      <Tab
        value="three"
        active={currentTab === "three"}
        onClick={handleTabChange}
      >
        Начинки
      </Tab>
    </div>
  );
}
