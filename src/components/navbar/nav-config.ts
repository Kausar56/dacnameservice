export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Search", href: "/search" },
  { label: "Domains", href: "/domains" },
  { label: "Docs", href: "/docs" },
  { label: "Dashboard", href: "/dashboard" },
];

export const defaultSearchPlaceholder = "Search .dac names";
