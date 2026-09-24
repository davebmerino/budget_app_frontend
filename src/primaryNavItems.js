import { LayoutGrid, BarChart3, Plus, Wallet, Settings } from "lucide-react";
import { paths } from "@/paths";

export const primaryNavItems = [
  { label: "Dashboard", path: paths.dashboard, icon: LayoutGrid },
  { label: "Analytics", icon: BarChart3 },
  { label: "Add", icon: Plus, isAction: true },
  { label: "Budgets", icon: Wallet },
  { label: "Settings", icon: Settings },
];
