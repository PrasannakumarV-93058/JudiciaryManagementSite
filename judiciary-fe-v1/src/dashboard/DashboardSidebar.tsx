import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils"; 
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import {
  Gavel,
  Menu,
  Home,
  FileText,
  Calendar,
  Users,
  BarChart3,
  Settings,
  LogOut,
  BookOpen,
  MessageSquare,
  Clock,
  FileSearch,
} from "lucide-react";

interface SidebarProps {
  role: string;
}

export function DashboardSidebar({ role }: SidebarProps) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const getNavItems = (role: string) => {
    const commonItems = [
      {
        title: "Dashboard",
        href: `/dashboard/${role}`,
        icon: <Home className="h-5 w-5" />,
      },
      {
        title: "Calendar",
        href: `/dashboard/${role}/calendar`,
        icon: <Calendar className="h-5 w-5" />,
      }
    ];

    const roleSpecificItems: Record<string, { title: string; href: string; icon: React.ReactNode }[]> = {
      judge: [
        {
          title: "Cases",
          href: `/dashboard/${role}/cases`,
          icon: <FileText className="h-5 w-5" />,
        },
        {
          title: "Hearings",
          href: `/dashboard/${role}/hearings`,
          icon: <Gavel className="h-5 w-5" />,
        },
        {
          title: "Reports",
          href: `/dashboard/${role}/reports`,
          icon: <BarChart3 className="h-5 w-5" />,
        },
      ],
      lawyer: [
        {
          title: "Cases",
          href: `/dashboard/${role}/cases`,
          icon: <FileText className="h-5 w-5" />,
        },
        {
          title: "Clients",
          href: `/dashboard/${role}/clients`,
          icon: <Users className="h-5 w-5" />,
        },
        {
          title: "Legal Research",
          href: `/dashboard/${role}/research`,
          icon: <BookOpen className="h-5 w-5" />,
        },
      ],
      clerk: [
        {
          title: "Case Filing",
          href: `/dashboard/${role}/create-case`,
          icon: <FileText className="h-5 w-5" />,
        },
        {
          title: "Court Schedule",
          href: `/dashboard/${role}/schedule-hearing`,
          icon: <Clock className="h-5 w-5" />,
        }
      ],
      prosecutor: [
        {
          title: "Cases",
          href: `/dashboard/${role}/cases`,
          icon: <FileText className="h-5 w-5" />,
        },
        {
          title: "Investigations",
          href: `/dashboard/${role}/investigations`,
          icon: <FileSearch className="h-5 w-5" />,
        },
        {
          title: "Reports",
          href: `/dashboard/${role}/reports`,
          icon: <BarChart3 className="h-5 w-5" />,
        },
      ],
      client: [
        {
          title: "My Cases",
          href: `/dashboard/${role}/cases`,
          icon: <FileText className="h-5 w-5" />,
        },
        {
          title: "Documents",
          href: `/dashboard/${role}/documents`,
          icon: <FileSearch className="h-5 w-5" />,
        },
        {
          title: "Messages",
          href: `/dashboard/${role}/messages`,
          icon: <MessageSquare className="h-5 w-5" />,
        },
      ],
    };

    return [
      ...commonItems.slice(0, 1),
      ...(roleSpecificItems[role] || []),
      ...commonItems.slice(1),
    ];
  };

  const navItems = getNavItems(role);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <MobileSidebar role={role} navItems={navItems} pathname={location.pathname} setOpen={setOpen} />
        </SheetContent>
      </Sheet>
      <DesktopSidebar role={role} navItems={navItems} pathname={location.pathname} />
    </>
  );
}

interface SidebarContentProps {
  role: string;
  navItems: {
    title: string;
    href: string;
    icon: React.ReactNode;
  }[];
  pathname: string;
  setOpen?: (open: boolean) => void;
}

function MobileSidebar({ role, navItems, pathname, setOpen }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col border-r bg-slate-100/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold" onClick={() => setOpen?.(false)}>
          <Gavel className="h-6 w-6" />
          <span>KT Judiciary</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpen?.(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 hover:text-slate-900",
                pathname === item.href ? "bg-slate-100 text-slate-900" : "text-slate-700"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="mt-auto p-4 border-t">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium capitalize">{role}</span>
            <span className="text-xs text-slate-500">John Doe</span>
          </div>
        </div>
        <Button variant="outline" className="w-full mt-2 justify-start" asChild>
          <Link to="/login">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  );
}

function DesktopSidebar({ role, navItems, pathname }: SidebarContentProps) {
  return (
    <div className="hidden md:flex h-screen w-64 flex-col fixed inset-y-0 z-10">
      <div className="flex h-14 items-center border-b px-4 bg-white">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Gavel className="h-6 w-6" />
          <span>KT Judiciary</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 bg-white">
        <div className="flex flex-col gap-1 p-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 hover:text-slate-900",
                pathname === item.href ? "bg-slate-100 text-slate-900" : "text-slate-700"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="mt-auto p-4 border-t bg-white">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium capitalize">{role}</span>
            <span className="text-xs text-slate-500">John Doe</span>
          </div>
        </div>
        <Button variant="outline" className="w-full mt-2 justify-start" asChild>
          <Link to="/login">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  );
}
