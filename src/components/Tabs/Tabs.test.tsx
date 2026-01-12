import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tabs } from "./Tabs";
import { Tab } from "./Tab";

function setup(props?: { defaultIndex?: number }) {

    const user = userEvent.setup();

    render(
        <Tabs defaultIndex={props?.defaultIndex ?? 0}>
            <Tab label="Overview">Overview content</Tab>
            <Tab label="Files" badge={12}>
                Files content
            </Tab>
            <Tab label="Messages" badge={3} badgeVariant="error">
                Messages content
            </Tab>
        </Tabs>
    );

    const getTab = (name: RegExp) => screen.getByRole("tab", { name });
    const getPanel = () => screen.getByRole("tabpanel");

    return { user, getTab, getPanel };
}

describe("Tabs", () => {
    it("shows the defalt panel", () => {
        const { getTab, getPanel } = setup({ defaultIndex: 0 });

        expect(getTab(/overview/i)).toHaveAttribute("aria-selected", "true");
        expect(getPanel()).toHaveTextContent("Overview content");
    });

    it("changes panel onclick", async () => {
        const { user, getTab, getPanel } = setup();

        await user.click(getTab(/files/i));

        expect(getTab(/files/i)).toHaveAttribute("aria-selected", "true");
        expect(getPanel()).toHaveTextContent("Files content");
    });

    it("supports ArrowRight/ArrowLeft", async () => {
        const { user, getTab, getPanel } = setup();

        getTab(/overview/i).focus();
        expect(getTab(/overview/i)).toHaveFocus();

        await user.keyboard("{ArrowRight}");
        expect(getTab(/files/i)).toHaveFocus();
        expect(getPanel()).toHaveTextContent("Files content");

        await user.keyboard("{ArrowLeft}");
        expect(getTab(/overview/i)).toHaveFocus();
        expect(getPanel()).toHaveTextContent("Overview content");
    });

    it("supports Home/End navigation", async () => {
        const { user, getTab, getPanel } = setup();

        getTab(/overview/i).focus();

        await user.keyboard("{End}");
        expect(getTab(/messages/i)).toHaveFocus();
        expect(getPanel()).toHaveTextContent("Messages content");

        await user.keyboard("{Home}");
        expect(getTab(/overview/i)).toHaveFocus();
        expect(getPanel()).toHaveTextContent("Overview content");
    });

    it("renders badge when provided", () => {
        const { getTab } = setup();

        expect(getTab(/files/i)).toHaveTextContent("12");
        expect(getTab(/messages/i)).toHaveTextContent("3");
    });
});