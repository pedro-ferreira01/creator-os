import {
  Home,
  FolderOpen,
  Download,
  BarChart3,
  Wallet,
  Sparkles,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    label: "Command Center",
    href: "/command-center",
    icon: Home,
  },
  {
    label: "Workspace",
    href: "/workspace",
    icon: FolderOpen,
  },
  {
    label: "Downloader",
    href: "/downloader",
    icon: Download,
  },
  {
    label: "AI Studio",
    href: "/ai-studio",
    icon: Sparkles,
  },
  {
    label: "Financeiro",
    href: "/finance",
    icon: Wallet,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Configurações",
    href: "/settings",
    icon: Settings,
  },
];