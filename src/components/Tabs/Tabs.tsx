import { Children, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactElement } from "react";
import type { TabProps, TabsProps } from "./types";
import "./Tabs.css";

export function Tabs({ children, defaultIndex = 0 }: TabsProps) {
  
  const baseId = useId();

  const tabs = useMemo(
    () => Children.toArray(children) as ReactElement<TabProps>[],
    [children],
  );

  const safeDefaultIndex = tabs.length === 0 ? 0 : Math.min(Math.max(defaultIndex, 0), tabs.length - 1);

  const [activeIndex, setActiveIndex] = useState(safeDefaultIndex);

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    tabRefs.current[index]?.focus();
  };

  const setActiveAndFocus = (index: number) => {
    setActiveIndex(index);
    focusTab(index);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (tabs.length === 0) return;

    switch (e.key) {
      case "ArrowRight": {
        e.preventDefault();
        const next = (index + 1) % tabs.length;
        setActiveAndFocus(next);
        break;
      }
      case "ArrowLeft": {
        e.preventDefault();
        const prev = (index - 1 + tabs.length) % tabs.length;
        setActiveAndFocus(prev);
        break;
      }
      case "Home": {
        e.preventDefault();
        setActiveAndFocus(0);
        break;
      }
      case "End": {
        e.preventDefault();
        setActiveAndFocus(tabs.length - 1);
        break;
      }
    }
  };

  return (
    <div className="tabs">
      <div className="tabs-header" role="tablist" aria-label="Tabs">
        {tabs.map((tab, index) => {
          const selected = activeIndex === index;
          const tabId = `${baseId}-tab-${index}`;
          const panelId = `${baseId}-panel-${index}`;

          return (
            <button
              key={tabId}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={tabId}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              className={`tab-button ${selected ? "active" : ""}`}
              onClick={() => setActiveAndFocus(index)}
              onKeyDown={(e) => onKeyDown(e, index)}
            >
              {tab.props.label}
              {tab.props.badge != null && tab.props.badge !== "" && (
                <span className={`badge ${tab.props.badgeVariant ?? "default"}`}>
                  {tab.props.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {tabs.map((tab, index) => {
        const selected = activeIndex === index;
        const tabId = `${baseId}-tab-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={panelId} id={panelId} role="tabpanel" aria-labelledby={tabId} hidden={!selected} className="tabs-content">
            {tab}
          </div>
        );
      })}
    </div>
  );
}
