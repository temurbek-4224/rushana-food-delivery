import { UtensilsCrossed } from "lucide-react";
import { T } from "@/components/ui/T";

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-auto">
      <div className="container mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-4 w-4 text-orange-500" />
          <span className="font-semibold text-gray-700">Rushana</span>
        </div>
        <p>© {new Date().getFullYear()} Rushana. <T k="footerRights" /></p>
      </div>
    </footer>
  );
}
