import React from "react";
import ReactDOM from "react-dom/client";
import { Tabs } from "./components/Tabs/Tabs";
import { Tab } from "./components/Tabs/Tab";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <Tabs>
            <Tab label="Overview">
                Overview content
            </Tab>

            <Tab label="Files" badge={12}>
                Files content
            </Tab>

            <Tab label="Messages" badge={3} badgeVariant="error">
                Messages content
            </Tab>
        </Tabs>
    </React.StrictMode>
);


