import { Building2, ShoppingCart, Utensils, ShoppingBag, Repeat, GraduationCap, MoreHorizontal } from "lucide-react";

// Mirrors the Expense schema's `category` enum exactly — ids here are what
// gets submitted as the `category` field, so don't rename them without
// updating the schema too.
export const EXPENSE_CATEGORIES = [
  { id: "housing", name: "Housing", icon: Building2 },
  { id: "groceries", name: "Groceries", icon: ShoppingCart },
  { id: "foodAndDrinks", name: "Food & Drinks", icon: Utensils },
  { id: "shopping", name: "Shopping", icon: ShoppingBag },
  { id: "subscription", name: "Subscription", icon: Repeat },
  { id: "schoolFees", name: "School Fees", icon: GraduationCap },
  { id: "others", name: "Others", icon: MoreHorizontal },
];
