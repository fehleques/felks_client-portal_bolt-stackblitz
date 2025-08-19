"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Logo } from '@/components/logo';
import { BackgroundImageSection } from '@/components/background-image-section';
import { useAuth } from '@/contexts/auth-context';

// Removed broken import - video is referenced via public path

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect authenticated users to their dashboard
      if (user.role === 'client') {
        router.push('/client/dashboard');
      } else {
        router.push('/designer/dashboard');
      }
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Logo />
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/auth/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <BackgroundImageSection
          videoSrc="/hero_video_final_final.mp4"
          videoPoster=""
          minHeightClassName="min-h-[70vh]"
          contentAlign="center"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-8 md:space-y-10 lg:space-y-12">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                  Your On-Demand Design Team. No Hiring Required.
                </h1>
                <p className="text-white/90 text-lg md:text-xl max-w-[600px] mx-auto leading-relaxed">
                  Built for creative agencies and fast-moving teams.One flat
                  fee, zero contracts, unlimited design — handled by elite
                  creatives who get it right the first time.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="px-8 py-4 text-base font-medium rounded-xl shadow-soft hover:shadow-soft-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-4 text-base font-medium rounded-xl hover:shadow-soft transform hover:-translate-y-0.5 transition-all duration-200 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </BackgroundImageSection>

        <section id="how-it-works" className="py-24 md:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                How It Works
              </h2>
              <p className="text-muted-foreground text-lg max-w-[600px] leading-relaxed">
                Our platform makes design requests simple and efficient.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-16">
              <div className="flex flex-col items-center text-center p-8 bg-card rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary mb-6">
                  <span className="text-xl font-bold text-primary-foreground">
                    1
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Submit a Request</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Choose a category, describe your needs, and set a deadline.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-8 bg-card rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary mb-6">
                  <span className="text-xl font-bold text-primary-foreground">
                    2
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Designer Assignment
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our designers pick up your request and start working on it.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-8 bg-card rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary mb-6">
                  <span className="text-xl font-bold text-primary-foreground">
                    3
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Receive Designs</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get your completed designs within the specified timeframe.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo
              iconClassName="[&>svg]:h-5 [&>svg]:w-5"
              textClassName="text-sm font-medium"
            />
            <span className="text-sm text-muted-foreground">© 2025</span>
            <nav className="flex gap-6 text-sm">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="https://contra.com/fernando_felix?referralExperimentNid=DEFAULT_REFERRAL_PROGRAM&referrerUsername=fernando_felix"
                className="text-muted-foreground hover:text-foreground transition-colors" target='_blank'
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
