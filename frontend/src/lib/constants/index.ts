import type { SocialMediaType, NavLinkType } from "#lib/types";

export const SOCIAL_MEDIA_LIST: SocialMediaType[] = [
    {name: "github", icon: "mdi:github", url: "https://github.com/NM4TT"},
    {name: "linkedin", icon: "mdi:linkedin", url: "https://linkedin.com/in/nmatute200"},
    {name: "instagram", icon: "mdi:instagram", url: "https://instagram.com/nmatute200"},
];

export const NAV_LINKS: NavLinkType[] = [
    { name: "Resume", href: "/" },
    { name: "Portfolio", href: "/portfolio/" },
    { name: "Biography", href: "/biography/" },
    { name: "Blog", href: "https://blog.nmatute.com", external: true },
];