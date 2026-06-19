"use client";

import {
  Children,
  type ComponentProps,
  createContext,
  type FocusEvent,
  isValidElement,
  type KeyboardEvent,
  type ReactNode,
  use,
} from "react";
import {
  handleTabListFocusCapture,
  handleTabListKeyDown,
  useTabSelection,
} from "./shared";

type ShiftTabsContextValue = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
};

const ShiftTabsContext = createContext<ShiftTabsContextValue | null>(null);

type ShiftTabSlotContextValue = {
  index: number;
};

const ShiftTabSlotContext = createContext<ShiftTabSlotContextValue | null>(null);

function useShiftTabs() {
  const context = use(ShiftTabsContext);
  if (!context) {
    throw new Error("ShiftTabs primitives must be used within <ShiftTabs>.");
  }
  return context;
}

function useShiftTabSlot() {
  const context = use(ShiftTabSlotContext);
  if (!context) {
    throw new Error("ShiftTabs.Tab must be a direct child of <ShiftTabs.List>.");
  }
  return context;
}

type ShiftTabsRootProps = {
  children: ReactNode;
  defaultActiveIndex?: number;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  className?: string;
};

function ShiftTabsRoot({
  children,
  defaultActiveIndex = 0,
  activeIndex: activeIndexProp,
  onActiveIndexChange,
  className,
}: ShiftTabsRootProps) {
  const { activeIndex, setActiveIndex, focusedIndex, setFocusedIndex } = useTabSelection({
    defaultActiveIndex,
    activeIndex: activeIndexProp,
    onActiveIndexChange,
  });

  return (
    <ShiftTabsContext.Provider
      value={{ activeIndex, setActiveIndex, focusedIndex, setFocusedIndex }}
    >
      <div className={className}>{children}</div>
    </ShiftTabsContext.Provider>
  );
}

type ShiftTabsListProps = ComponentProps<"nav"> & {
  "aria-label"?: string;
};

function ShiftTabsList({
  className,
  children,
  "aria-label": ariaLabel = "Tabs",
  onKeyDown,
  onFocusCapture,
  ...props
}: ShiftTabsListProps) {
  const { activeIndex, setActiveIndex, setFocusedIndex } = useShiftTabs();
  const tabs = Children.toArray(children).filter(isValidElement);
  const count = tabs.length;

  const listStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    overflow: "visible",
  };

  return (
    <nav aria-label={ariaLabel} style={{ overflow: "visible" }} className={className} {...props}>
      <div
        role="tablist"
        onFocusCapture={(event: FocusEvent<HTMLElement>) => {
          onFocusCapture?.(event);
          handleTabListFocusCapture(event, activeIndex, setFocusedIndex);
        }}
        onKeyDown={(event: KeyboardEvent<HTMLElement>) => {
          onKeyDown?.(event);
          if (!event.defaultPrevented) {
            handleTabListKeyDown(event, count, setActiveIndex, setFocusedIndex);
          }
        }}
        style={listStyle}
      >
        {tabs.map((tab, index) => (
          <ShiftTabSlotContext.Provider key={tab.key ?? index} value={{ index }}>
            {tab}
          </ShiftTabSlotContext.Provider>
        ))}
      </div>
    </nav>
  );
}

function ShiftTabsLabel({ style, ...props }: ComponentProps<"span">) {
  const labelStyle: React.CSSProperties = {
    userSelect: "none",
    paddingLeft: "0.25rem",
    paddingRight: "0.25rem",
    textAlign: "center",
    fontFamily: "var(--font-mono)",
    fontSize: "0.8rem",
    fontWeight: 500,
    letterSpacing: "0.02em",
    ...style,
  };

  return <span style={labelStyle} {...props} />;
}

type ShiftTabsTabProps = ComponentProps<"button"> & {
  label?: string;
};

function ShiftTabsTab({
  className,
  children,
  label,
  onClick,
  onFocus,
  style,
  ...props
}: ShiftTabsTabProps) {
  const { activeIndex, setActiveIndex, setFocusedIndex } = useShiftTabs();
  const { index } = useShiftTabSlot();
  const isSelected = activeIndex === index;

  const buttonStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
    outline: "none",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    ...style,
  };

  const innerStyle: React.CSSProperties = {
    display: "flex",
    height: "2.25rem",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    border: isSelected
      ? "1.5px solid var(--accent-primary)"
      : "1.5px solid var(--border-subtle)",
    background: isSelected
      ? "rgba(127, 179, 255, 0.08)"
      : "var(--bg-surface)",
    padding: "0 0.85rem",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    transformOrigin: "top right",
    transform: isSelected ? "rotate(0deg)" : undefined,
    color: isSelected ? "var(--accent-primary)" : "var(--text-secondary)",
    boxShadow: isSelected
      ? "0 0 12px rgba(127, 179, 255, 0.15)"
      : "none",
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      {...(label ? { "aria-label": label } : {})}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setActiveIndex(index);
        }
      }}
      onFocus={(event: FocusEvent<HTMLButtonElement>) => {
        onFocus?.(event);
        if (!event.defaultPrevented) {
          setFocusedIndex(index);
        }
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          const inner = e.currentTarget.querySelector<HTMLElement>("[data-inner]");
          if (inner) {
            inner.style.transform = "rotate(6deg)";
            inner.style.borderColor = "var(--border-hover)";
            inner.style.color = "var(--text-primary)";
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          const inner = e.currentTarget.querySelector<HTMLElement>("[data-inner]");
          if (inner) {
            inner.style.transform = "rotate(0deg)";
            inner.style.borderColor = "var(--border-subtle)";
            inner.style.color = "var(--text-secondary)";
          }
        }
      }}
      style={buttonStyle}
      {...props}
    >
      <span data-inner="" style={innerStyle}>
        {children}
      </span>
    </button>
  );
}

const ShiftTabs = Object.assign(ShiftTabsRoot, {
  List: ShiftTabsList,
  Tab: ShiftTabsTab,
  Label: ShiftTabsLabel,
});

export default ShiftTabs;
export { ShiftTabsLabel, ShiftTabsList, ShiftTabsRoot, ShiftTabsTab, useShiftTabs };
