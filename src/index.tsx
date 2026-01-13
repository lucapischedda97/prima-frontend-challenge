import React from "react";
import ReactDOM from "react-dom/client";
import { Tabs } from "./components/Tabs/Tabs";
import { Tab } from "./components/Tabs/Tab";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <div className="tabs-container">
      <div>
        <h3>Underline variant</h3>
        <Tabs ariaLabel="Underline tabs" variant="underline">
          <Tab label="Overview">Overview content</Tab>
          <Tab label="Files" badge={12}>Files content</Tab>
          <Tab label="Messages" badge={3} badgeVariant="error">
            Messages content
          </Tab>
        </Tabs>
      </div>

      <div>
        <h3>Boxed variant</h3>
        <Tabs ariaLabel="Boxed tabs" variant="boxed">
          <Tab label="Overview">Overview content</Tab>
          <Tab label="Files" badge={12}>Files content</Tab>
          <Tab label="Messages" badge={3} badgeVariant="error">
            Messages content
          </Tab>
        </Tabs>
      </div>
    </div>
  </React.StrictMode>
);
