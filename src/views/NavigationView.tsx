import { Menu } from "lucide-react";
import { Button } from "../components/ui/Button";
import { FloatingDock, Navbar, NavBrand, NavContainer, NavLink, NavMenu, ProfileNavbar, SimpleNavbar, VisualMegaNavbar } from "../components/ui/Navigation";
import ComponentPreview from "./ComponentPreview";

const NavigationView = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Navigation</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Responsive navigation components including sticky navbars, branding, and mobile menus.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 overflow-hidden relative min-h-[400px]">
        <div className="absolute inset-0 flex items-start">
          <div className="w-full">
            <SimpleNavbar />
            <div className="p-8">
              <div className="max-w-3xl mx-auto space-y-4">
                <div className="h-64 rounded-xl bg-slate-200 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400">
                  Page Content
                </div>
                <div className="h-32 rounded-xl bg-slate-200 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ComponentPreview
        title="Navbar Composition"
        description="Build your navbar using Violet components: Navbar, NavContainer, NavBrand, NavMenu, and MobileMenu."
        code={`<Navbar sticky glass>
  <NavContainer>
    <NavBrand>Brand</NavBrand>
    <NavMenu>
      <NavLink href="#" active>Home</NavLink>
      <NavLink href="#">About</NavLink>
    </NavMenu>
    <MobileMenuToggle isOpen={isOpen} onToggle={toggle} />
  </NavContainer>
  <MobileMenu isOpen={isOpen}>
     <MobileNavLink href="#">Home</MobileNavLink>
  </MobileMenu>
</Navbar>`}
      >
        <div className="w-full rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <Navbar className="relative" isBordered={false}>
            <NavContainer>
              <NavBrand>
                <div className="h-6 w-6 rounded-full bg-indigo-500" />
                <span>Startup</span>
              </NavBrand>
              <NavMenu>
                <NavLink href="#" active>Product</NavLink>
                <NavLink href="#">Solutions</NavLink>
                <NavLink href="#">Resources</NavLink>
              </NavMenu>
              <div className="hidden lg:flex gap-2">
                <Button size="sm" variant="outline">Log in</Button>
                <Button size="sm">Get Started</Button>
              </div>
              <div className="lg:hidden">
                <Button size="icon" variant="ghost"><Menu size={20} /></Button>
              </div>
            </NavContainer>
          </Navbar>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Visual Mega Navbar"
        description="A rich mega-menu navbar featuring image-based navigation for high-impact categories."
        code={`<VisualMegaNavbar /> // See source for full implementation using NavDropdown`}
      >
        <div className="w-full rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden min-h-[300px] bg-slate-50 dark:bg-slate-900 relative">
          <VisualMegaNavbar />
          <div className="p-8 flex items-center justify-center text-slate-400">
            Hover over "Collections" to see the visual menu.
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Profile Dashboard Navbar"
        description="Application-style navbar with search, notifications, and user profile avatar."
        code={`<ProfileNavbar /> // See source for full implementation`}
      >
        <div className="w-full rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden min-h-[200px] bg-slate-900">
          <ProfileNavbar />
          <div className="p-8">
            <div className="h-32 rounded-lg bg-slate-800 border border-slate-700 border-dashed"></div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Floating Dock Navbar"
        description="A playful, floating navigation dock using icons and tooltips."
        code={`<FloatingDock />`}
      >
        <div className="w-full rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden min-h-[300px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-end pb-8">
          <FloatingDock />
        </div>
      </ComponentPreview>
    </div>
  );
};
export default NavigationView;