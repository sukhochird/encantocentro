import { Facebook, Instagram, Twitter } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Content */}
        <div className="text-center mb-8">
          {/* Logo Image */}
          <div className="flex justify-center mb-6">
            <ImageWithFallback
              src="https://centro.encantotown.mn/images/cento-logo.webp"
              alt="Өндөр зэрэглэлийн орон сууц Logo"
              className="h-16 w-auto"
            />
          </div>

          {/* Brand Name */}
          <h3 className="text-2xl text-white mb-4 leading-tight">
            ӨНДӨР ЗЭРЭГЛЭЛИЙН ОРОН СУУЦ
            <br />
            ХУДАЛДАА ҮЙЛЧИЛГЭЭНИЙ ТӨВ
          </h3>

          {/* Brief Description */}
          <p className="text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Орчин үеийн тансаг амьдралын орчинг бүрдүүлэх хотын
            төвийн орон сууцны төсөл
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://www.facebook.com/EncantoTower"
              target="_blank"
              className="text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a
              href="#"
              className="text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className="text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6">
          <div className="text-center space-y-2">
            <p className="text-white/50 text-sm">
              © 2025 ӨНДӨР ЗЭРЭГЛЭЛИЙН ОРОН СУУЦ. Бүх эрх
              хуулиар хамгаалагдсан.
            </p>
            <p className="text-white/40 text-xs">
              Developed by{" "}
              <a
                href="https://www.instagram.com/coding_with_sukhee"
                target="_blank"
              >
                coding_with_sukhee{" "}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}