import Link from 'next/link'
import { Bot as Lotus, Heart, Github } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Lotus className="h-6 w-6 text-divine-purple" />
              <span className="font-poppins font-bold text-lg text-glow divine-glow-purple">Ayodhya</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              A divine community server blending mythology and modern tech for spiritual seekers and tech enthusiasts.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guidelines" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/members" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Members
                </Link>
              </li>
              <li>
                <Link href="/roles" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Server Roles
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Join Us</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect with our community on these platforms
            </p>
            <div className="flex space-x-4">
              <Link href="https://discord.gg/ayodhya" className="text-muted-foreground hover:text-divine-purple transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-discord">
                  <circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 17.5c0 1-1.356 3-1.5 3-2 0-3.5-2-3.5-6 0-6 4-10.98 5-10.98 1 0 1.5 1.75 1.5 4 0 0-1.5.5-1.5 2.5s1.5 2 1.5 2"/><path d="M16 17.5c0 1 1.356 3 1.5 3 2 0 3.5-2 3.5-6 0-6-4-10.98-5-10.98-1 0-1.5 1.75-1.5 4 0 0 1.5.5 1.5 2.5s-1.5 2-1.5 2"/>
                </svg>
              </Link>
              <Link href="https://github.com/ayodhya" className="text-muted-foreground hover:text-divine-gold transition-colors">
                <Github className="h-6 w-6" />
              </Link>
              <Link href="https://twitter.com/ayodhya" className="text-muted-foreground hover:text-divine-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 opacity-50" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Ayodhya. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 sm:mt-0 flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-divine-red" /> in the divine realm
          </p>
        </div>
      </div>
    </footer>
  )
}