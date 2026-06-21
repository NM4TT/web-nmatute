import type { NavLinkType } from "#lib/types";

export const NAV_LINKS: NavLinkType[] = [
    { name: "Resume", href: "/" },
    { name: "Portfolio", href: "/portfolio/" },
    { name: "Biography", href: "/biography/" },
    { name: "Blog", href: "https://blog.nmatute.com", external: true },
    { name: "Services", href: "https://nmatute.dev", external: true},
];

export const MAINTENANCE = false;