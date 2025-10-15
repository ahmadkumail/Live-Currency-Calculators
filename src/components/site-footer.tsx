import { siteConfig } from "@/config/site";
import { Globe } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">{siteConfig.name}</h3>
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-primary">Features</a></li>
              <li><a href="#" className="hover:text-primary">Pricing</a></li>
              <li><a href="#" className="hover:text-primary">Help Center</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
              <li><a href="#" className="hover:text-primary">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Social</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="hover:text-primary">GitHub</a></li>
              <li><a href={siteConfig.links.twitter} target="_blank" rel="noreferrer" className="hover:text-primary">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>Built with love for currency conversion.</p>
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
                <Globe className="h-4 w-4" />
                <span>English (UK)</span>
            </div>
        </div>
      </div>
    </footer>
  );
}
