import Link from 'next/link';
import dynamic from 'next/dynamic';

const MobileMenu = dynamic(() => import('./MobileMenu'), {
  ssr: false
});

export default function Header() {
  // Mobile menu is handled by MobileMenu component

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6">
        <Link href="/" className="flex items-center flex-col">
          <span className="text-xl font-semibold text-openai-gray">Botsmann</span>
          <span className="text-xs text-gray-400">v0.0.1</span>
        </Link>
        
        <MobileMenu />

        <nav className="hidden lg:flex items-center space-x-8">
          <div className="relative group">
            <Link href="/bots" className="text-sm font-medium text-gray-600 hover:text-openai-green transition-colors">
              Bots
            </Link>
            <div className="absolute left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48 py-2 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              <Link href="/bots/artistic-advisor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Artistic Advisor
              </Link>
              <Link href="/bots/auto-shopper" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Auto Shopper
              </Link>
              <Link href="/bots/gov-spending-tracker" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Gov Spending Tracker
              </Link>
              <Link href="/bots/legal-expert" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Legal Expert
              </Link>
              <Link href="/bots/medical-expert" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Medical Expert
              </Link>
              <Link href="/bots/swiss-german-teacher" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Swiss German Teacher
              </Link>
            </div>
          </div>
          <div className="relative group">
            <Link href="/projects" className="text-sm font-medium text-gray-600 hover:text-openai-green transition-colors">
              Projects
            </Link>
            <div className="absolute left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48 py-2 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              <Link href="/projects/governance" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Governance
              </Link>
              <Link href="/projects/credit" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Credit
              </Link>
              <Link href="/projects/shopping" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Shopping
              </Link>
              <Link href="/projects/finance" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Project Finance
              </Link>
            </div>
          </div>
          <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-openai-green transition-colors">
            Blog
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-openai-green transition-colors">
            About
          </Link>
          <Link 
            href="/contact" 
            className="rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-opacity"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Menu Overlay */}
        <div
          className={`${
            isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          } fixed inset-0 top-16 z-50 transform bg-white transition-all duration-300 ease-in-out lg:hidden`}
        >
          <nav className="h-full overflow-y-auto px-6 py-6">
            <div className="flex flex-col space-y-4">
              {/* Mobile Bots Section */}
              <div className="space-y-4">
                <Link href="/bots" className="flex items-center min-h-[44px] text-lg font-medium text-gray-900 hover:text-openai-green active:text-openai-green transition-colors">
                  Bots
                </Link>
                <div className="flex flex-col space-y-4 pl-4">
                  <Link href="/bots/artistic-advisor" className="flex items-center min-h-[44px] text-base text-gray-600 hover:text-openai-green active:text-openai-green transition-colors">
                    Artistic Advisor
                  </Link>
                  <Link href="/bots/auto-shopper" className="flex items-center min-h-[44px] text-base text-gray-600 hover:text-openai-green active:text-openai-green transition-colors">
                    Auto Shopper
                  </Link>
                  <Link href="/bots/gov-spending-tracker" className="flex items-center min-h-[44px] text-base text-gray-600 hover:text-openai-green active:text-openai-green transition-colors">
                    Gov Spending Tracker
                  </Link>
                  <Link href="/bots/legal-expert" className="flex items-center min-h-[44px] text-base text-gray-600 hover:text-openai-green active:text-openai-green transition-colors">
                    Legal Expert
                  </Link>
                  <Link href="/bots/medical-expert" className="flex items-center min-h-[44px] text-base text-gray-600 hover:text-openai-green active:text-openai-green transition-colors">
                    Medical Expert
                  </Link>
                  <Link href="/bots/swiss-german-teacher" className="flex items-center min-h-[44px] text-base text-gray-600 hover:text-openai-green active:text-openai-green transition-colors">
                    Swiss German Teacher
                  </Link>
                </div>
              </div>
              
              {/* Mobile Projects Section */}
              <div className="space-y-4">
                <Link href="/projects" className="flex items-center min-h-[44px] text-lg font-medium text-gray-900 hover:text-openai-green active:text-openai-green transition-colors">
                  Projects
                </Link>
                <div className="flex flex-col space-y-4 pl-4">
                  <Link href="/projects/governance" className="flex items-center min-h-[44px] text-base text-gray-600 hover:text-openai-green active:text-openai-green transition-colors">
                    Governance
                  </Link>
                  <Link href="/projects/credit" className="flex items-center min-h-[44px] text-base text-gray-600 hover:text-openai-green active:text-openai-green transition-colors">
                    Credit
                  </Link>
                  <Link href="/projects/shopping" className="flex items-center min-h-[44px] text-base text-gray-600 hover:text-openai-green active:text-openai-green transition-colors">
                    Shopping
                  </Link>
                  <Link href="/projects/finance" className="flex items-center min-h-[44px] text-base text-gray-600 hover:text-openai-green active:text-openai-green transition-colors">
                    Project Finance
                  </Link>
                </div>
              </div>
              
              {/* Other Navigation Items */}
              <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-openai-green">
                Blog
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-openai-green">
                About
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-openai-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-opacity"
              >
                Contact Us
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
