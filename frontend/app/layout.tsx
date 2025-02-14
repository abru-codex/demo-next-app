"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const formatBreadcrumb = (slug: string) => {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== ""); // Remove empty segments

  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />

                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    {pathSegments.map((segment, index) => {
                      const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                      const isLast = index === pathSegments.length - 1;
                      return (
                        <div key={href} className="flex items-center">
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            {isLast ? (
                              <BreadcrumbPage>{formatBreadcrumb(segment)}</BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink href={href}>{formatBreadcrumb(segment)}</BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                        </div>
                      );
                    })}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <main>{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
