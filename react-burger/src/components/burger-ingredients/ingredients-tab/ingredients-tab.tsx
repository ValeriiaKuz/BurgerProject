import React, { FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ingredients-tab.module.css";
import { TabType } from "../burger-ingredients";

type IngredientsTabTypes = {
  tabId: TabType;
  setTabId: (tabId: TabType) => void;
};
const IngredientsTab: FC<IngredientsTabTypes> = ({ tabId, setTabId }) => {
  return (
    <div className={style.wrapper}>
      <Tab
        value={TabType.bun}
        active={tabId === TabType.bun}
        onClick={() => {
          setTabId(TabType.bun);
        }}
      >
        {TabType.bun}
      </Tab>
      <Tab
        value={TabType.sauces}
        active={tabId === TabType.sauces}
        onClick={() => {
          setTabId(TabType.sauces);
        }}
      >
        {TabType.sauces}
      </Tab>
      <Tab
        value={TabType.main}
        active={tabId === TabType.main}
        onClick={() => {
          setTabId(TabType.main);
        }}
      >
        {TabType.main}
      </Tab>
    </div>
  );
};

export default IngredientsTab;
