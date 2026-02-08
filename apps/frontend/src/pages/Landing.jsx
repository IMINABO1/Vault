import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, Lock, CheckCircle2, Globe, Smartphone, Zap, AlertTriangle, ArrowRight, Play, Star, Menu, X, CreditCard, ShieldCheck, Wifi } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NOISE_TEXTURE = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

const features = [
  {
    icon: Lock,
    iconColor: 'bg-blue-100',
    iconBgColor: 'text-blue-600',
    title: 'Bank-Level Encryption',
    description: 'Your documents are protected with military-grade 256-bit encryption, ensuring maximum security.',
  },
  {
    icon: CheckCircle2,
    iconColor: 'bg-green-100',
    iconBgColor: 'text-green-600',
    title: 'Instant Verification',
    description: 'Get your documents verified quickly with our automated system and trusted verification partners.',
  },
  {
    icon: Globe,
    iconColor: 'bg-purple-100',
    iconBgColor: 'text-purple-600',
    title: 'Access Anywhere',
    description: 'Access your documents from any device, anywhere in the world, with secure cloud sync.',
  },
  {
    icon: Smartphone,
    iconColor: 'bg-blue-100',
    iconBgColor: 'text-blue-600',
    title: 'Mobile Ready',
    description: 'Fully responsive design works seamlessly on desktop, tablet, and mobile devices.',
  },
  {
    icon: Zap,
    iconColor: 'bg-orange-100',
    iconBgColor: 'text-orange-600',
    title: 'Lightning Fast',
    description: 'Upload and access your documents instantly with our optimized infrastructure.',
  },
  {
    icon: AlertTriangle,
    iconColor: 'bg-pink-100',
    iconBgColor: 'text-pink-600',
    title: 'Emergency Features',
    description: 'Share documents and location with trusted contacts in emergency situations.',
  },
]

function HeroCard({ gradient, label, icon: Icon, holder, expires, delay }) {
  return (
    <div
      className="animate-fade-in-up group"
      style={{ animationDelay: delay }}
    >
      <div
        className={`relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg group-hover:shadow-2xl group-hover:scale-[1.03] transition-all duration-300 cursor-pointer ${gradient}`}
        style={{ aspectRatio: '1.8 / 1' }}
      >
        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: NOISE_TEXTURE }}
        />
        {/* Blur orbs */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/30 rounded-full blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative h-full p-4 sm:p-5 flex flex-col justify-between z-10">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="p-1.5 sm:p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-white font-bold text-sm sm:text-base leading-none tracking-tight drop-shadow-md">
                  {label}
                </h3>
                <span className="text-white/50 text-[8px] sm:text-[10px] uppercase tracking-widest font-semibold mt-0.5">
                  Official Document
                </span>
              </div>
            </div>
            <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-300" />
              <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider">Verified</span>
            </div>
          </div>

          {/* Chip + NFC */}
          <div className="flex items-center gap-2 opacity-80 my-2 sm:my-0">
            <div className="w-8 h-6 sm:w-10 sm:h-8 rounded-md border border-white/20 bg-gradient-to-br from-yellow-100/20 to-yellow-600/20 backdrop-blur-md relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5" />
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20" />
              <div className="absolute top-0 left-1/3 h-full w-[1px] bg-white/20" />
              <div className="absolute top-0 right-1/3 h-full w-[1px] bg-white/20" />
            </div>
            <Wifi className="w-4 h-4 sm:w-5 sm:h-5 rotate-90 text-white/50" />
          </div>

          {/* Bottom Data */}
          <div className="grid grid-cols-2 items-end">
            <div className="min-w-0">
              <p className="text-[8px] sm:text-[9px] text-white/40 uppercase tracking-widest font-bold mb-0.5">Holder</p>
              <p className="text-white font-mono text-xs sm:text-sm font-medium tracking-wide truncate drop-shadow-sm">
                {holder}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[8px] sm:text-[9px] text-white/40 uppercase tracking-widest font-bold mb-0.5">Expires</p>
              <p className="text-white font-mono text-xs sm:text-sm font-medium tracking-wide drop-shadow-sm">
                {expires}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="border-b-[0.5px] border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(221,65%,52%)]">
                <Shield className="h-5 w-5 text-white fill-white" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">SecureVault</p>
                <p className="text-xs text-muted-foreground">Digital Documents</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-foreground hover:text-[hsl(221,83%,53%)] transition-colors">
                Features
              </a>
              <a href="#security" className="text-sm text-foreground hover:text-[hsl(221,83%,53%)] transition-colors">
                Security
              </a>
              <Link to="/login">
                <Button className="bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,45%)] text-white">
                  Get Started
                </Button>
              </Link>
            </nav>
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border py-4 space-y-3">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-foreground hover:text-[hsl(221,83%,53%)] transition-colors">
                Features
              </a>
              <a href="#security" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-foreground hover:text-[hsl(221,83%,53%)] transition-colors">
                Security
              </a>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,45%)] text-white mt-2">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              Your{' '}
              <span className="text-[hsl(221,83%,53%)]">Digital Document Wallet</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground mb-8">
              Store, verify, and manage all your official documents securely in one place. Government-grade encryption meets modern design.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 mb-8">
              <Link to="/login">
                <Button size="lg" className="bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,45%)] text-white px-6">
                  Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-6">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-blue-500 border-[1px] border-white" />
                  <div className="h-8 w-8 rounded-full bg-green-500 border-[1px] border-white" />
                  <div className="h-8 w-8 rounded-full bg-purple-500 border-[1px] border-white" />
                </div>
                <span className="text-sm font-medium text-foreground">50K+ Active Users</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm font-medium text-foreground ml-1">4.9/5</span>
              </div>
            </div>
          </div>

          {/* Right Side - Document Cards */}
          <div className="space-y-4 sm:space-y-5 max-w-sm mx-auto md:max-w-none md:mx-0">
            <Link to="/login" className="block">
              <HeroCard
                gradient="bg-gradient-to-br from-blue-700 via-indigo-800 to-violet-900"
                label="Driver License"
                icon={CreditCard}
                holder="Jane Doe"
                expires="08/28"
                delay="0.1s"
              />
            </Link>
            <Link to="/login" className="block">
              <HeroCard
                gradient="bg-gradient-to-br from-slate-800 via-zinc-900 to-black"
                label="Passport"
                icon={Globe}
                holder="Jane Doe"
                expires="12/30"
                delay="0.2s"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/30 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Everything you need to manage documents
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Secure, verified, and accessible from anywhere
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-card rounded-xl border-[0.5px] border-border p-5 sm:p-6 transition-colors"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${feature.iconColor} mb-4`}>
                    <Icon className={`h-6 w-6 ${feature.iconBgColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[hsl(221,83%,53%)] to-[hsl(221,83%,45%)] rounded-2xl px-6 py-10 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Ready to secure your documents?
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-8">
              Join thousands of users who trust SecureVault with their important documents
            </p>
            <Link to="/login">
              <Button size="lg" className="!bg-white !text-[hsl(221,83%,53%)] hover:!bg-white/90 px-8 mb-3">
                Get Started Free
              </Button>
            </Link>
            <p className="text-sm text-white/80">
              No credit card required &bull; 14-day free trial
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-[0.5px] border-border bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            {/* Company Branding */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(221,65%,52%)]">
                  <Shield className="h-5 w-5 text-white fill-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">SecureVault</p>
                  <p className="text-xs text-muted-foreground">Digital Documents</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                The most secure way to store and manage your official documents digitally. Trusted by thousands worldwide.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t-[0.5px] border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; 2026 SecureVault. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
