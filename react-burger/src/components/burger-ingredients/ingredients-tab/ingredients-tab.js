import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ingredients-tab.module.css";
import PropTypes from "prop-types";

const IngredientsTab = ({ tabId, getTabId }) => {
  return (
    <div className={style.wrapper}>
      <Tab
        value="Булки"
        active={tabId === "Булки"}
        onClick={() => {
          getTabId("Булки");
        }}
      >
        Булки
      </Tab>
      <Tab
        value="Соусы"
        active={tabId === "Соусы"}
        onClick={() => {
          getTabId("Соусы");
        }}
      >
        Соусы
      </Tab>
      <Tab
        value="Начинки"
        active={tabId === "Начинки"}
        onClick={() => {
          getTabId("Начинки");
        }}
      >
        Начинки
      </Tab>
    </div>
  );
};
IngredientsTab.propTypes = {
  tabId: PropTypes.string.isRequired,
  getTabId: PropTypes.func.isRequired,
};
export default IngredientsTab;
