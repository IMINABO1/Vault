import { Link } from 'react-router-dom'
import { Shield, Lock, CheckCircle2, Globe, Smartphone, Zap, AlertTriangle, ArrowRight, Play, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-[0.5px] border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border-[0.5px] border-blue-200 mb-6">
              <Lock className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Bank-Level Security</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              Your{' '}
              <span className="text-[hsl(221,83%,53%)]">Digital Document Wallet</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Store, verify, and manage all your official documents securely in one place. Government-grade encryption meets modern design.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
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
            <div className="flex flex-wrap items-center gap-6">
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
          <div className="relative">
            <div className="space-y-4">
              {/* Passport Card */}
              <div style={{ transform: 'translate(80px, 60px)' }}>
              <Link to="/login" className="block group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="document-card-hero document-card-hero-blue group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm group-hover:bg-white/40 transition-colors">
                      <Shield className="h-5 w-5 text-white stroke-2" fill="none" />
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full !bg-white/90 !text-green-800 text-xs font-medium">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">Passport</h3>
                  <p className="text-lg font-bold text-white mb-3 font-mono">X12••••••••</p>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-12 bg-yellow-400 rounded" />
                    <span className="text-xs text-white/80">USA</span>
                  </div>
                </div>
              </Link>
              </div>

              {/* Driver's License Card */}
              <Link to="/dashboard" className="block group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="document-card-hero document-card-hero-green group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm group-hover:bg-white/40 transition-colors">
                      <Shield className="h-5 w-5 text-white stroke-2" fill="none" />
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full !bg-white/90 !text-green-800 text-xs font-medium">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">Driver's License</h3>
                  <p className="text-lg font-bold text-white mb-3 font-mono">DL-•••••••••</p>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-12 bg-yellow-400 rounded" />
                    <span className="text-xs text-white/80">California</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Everything you need to manage documents
            </h2>
            <p className="text-lg text-muted-foreground">
              Secure, verified, and accessible from anywhere
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-card rounded-xl border-[0.5px] border-border p-6 transition-colors"
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
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[hsl(221,83%,53%)] to-[hsl(221,83%,45%)] rounded-2xl p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              Ready to secure your documents?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join thousands of users who trust SecureVault with their important documents
            </p>
            <Link to="/login">
              <Button size="lg" className="!bg-white !text-[hsl(221,83%,53%)] hover:!bg-white/90 px-8 mb-3">
                Get Started Free
              </Button>
            </Link>
            <p className="text-sm text-white/80">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-[0.5px] border-border bg-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
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
              © 2026 SecureVault. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
