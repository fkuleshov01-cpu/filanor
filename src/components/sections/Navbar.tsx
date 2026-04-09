"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import {
  IconBriefcase,
  IconFlask,
  IconBuildingStore,
  IconUsers,
  IconShieldCheck,
  IconMail,
} from "@tabler/icons-react";

const navItems = [
  {
    name: "Services",
    link: "#services",
    icon: <IconBriefcase size={18} />,
  },
  {
    name: "Laboratoire",
    link: "#laboratoire",
    icon: <IconFlask size={18} />,
  },
  {
    name: "Secteurs",
    link: "#secteurs",
    icon: <IconBuildingStore size={18} />,
  },
  {
    name: "Qui sommes-nous",
    link: "#qui-sommes-nous",
    icon: <IconUsers size={18} />,
  },
  {
    name: "Garanties",
    link: "#garanties",
    icon: <IconShieldCheck size={18} />,
  },
  {
    name: "Contact",
    link: "#contact",
    icon: <IconMail size={18} />,
  },
];

export default function Navbar() {
  return <FloatingNav navItems={navItems} />;
}
