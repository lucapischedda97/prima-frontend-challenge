import type { ReactElement, ReactNode } from "react";

export type BadgeVariant = "default" | "error" | "success";

export type TabsProps = {
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
  defaultIndex?: number;
};

export type TabProps = {
  label: string;
  badge?: string | number;
  badgeVariant?: BadgeVariant;
  children: ReactNode;
};
