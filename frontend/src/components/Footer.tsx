import type { ReactNode } from 'react'

const quickLinks = [
  { label: 'Home', href: 'https://shrishtidairyfarm.com/' },
  { label: 'About Us', href: 'https://shrishtidairyfarm.com/about-us' },
  { label: 'Products', href: 'https://shrishtidairyfarm.com/products' },
  { label: 'Subscription', href: 'https://shrishtidairyfarm.com/subscription' },
  { label: 'Blog', href: 'https://shrishtidairyfarm.com/blog' },
  { label: 'Contact Us', href: 'https://shrishtidairyfarm.com/contact-us' },
]

const products = [
  'Gir Cow Milk',
  'Farm Fresh Buffalo Milk',
  'High Protein Milk',
  'High Protein Coffee',
  'Curd & Ghee',
]

const legalLinks = [
  { label: 'Privacy Policy', href: 'https://shrishtidairyfarm.com/privacy-policy' },
  { label: 'Terms & Conditions', href: 'https://shrishtidairyfarm.com/terms-conditions' },
  { label: 'Refund & Cancellation', href: 'https://shrishtidairyfarm.com/refund-cancellation' },
  { label: 'Shipping & Delivery', href: 'https://shrishtidairyfarm.com/shipping-delivery' },
]

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/shrishtidairyfarm',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/shrishtidairyfarm',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.427.403a4.92 4.92 0 0 1 1.77 1.153 4.92 4.92 0 0 1 1.153 1.77c.163.457.349 1.257.403 2.427.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.427a4.92 4.92 0 0 1-1.153 1.77 4.92 4.92 0 0 1-1.77 1.153c-.457.163-1.257.349-2.427.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.427-.403a4.92 4.92 0 0 1-1.77-1.153 4.92 4.92 0 0 1-1.153-1.77c-.163-.457-.349-1.257-.403-2.427C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.427a4.92 4.92 0 0 1 1.153-1.77 4.92 4.92 0 0 1 1.77-1.153c.457-.163 1.257-.349 2.427-.403C8.416 2.175 8.796 2.163 12 2.163zm0 1.622c-3.15 0-3.522.012-4.756.069-1.002.046-1.548.215-1.908.357a3.3 3.3 0 0 0-1.197.78 3.3 3.3 0 0 0-.78 1.197c-.142.36-.311.906-.357 1.908-.057 1.234-.069 1.606-.069 4.756s.012 3.522.069 4.756c.046 1.002.215 1.548.357 1.908.183.465.42.897.78 1.197s.732.597 1.197.78c.36.142.906.311 1.908.357 1.234.057 1.606.069 4.756.069s3.522-.012 4.756-.069c1.002-.046 1.548-.215 1.908-.357a3.3 3.3 0 0 0 1.197-.78 3.3 3.3 0 0 0 .78-1.197c.142-.36.311-.906.357-1.908.057-1.234.069-1.606.069-4.756s-.012-3.522-.069-4.756c-.046-1.002-.215-1.548-.357-1.908a3.3 3.3 0 0 0-.78-1.197 3.3 3.3 0 0 0-1.197-.78c-.36-.142-.906-.311-1.908-.357-1.234-.057-1.606-.069-4.756-.069zm0 3.351a5.864 5.864 0 1 1 0 11.728 5.864 5.864 0 0 1 0-11.728zm0 1.622a4.242 4.242 0 1 0 0 8.484 4.242 4.242 0 0 0 0-8.484zm6.406-4.845a1.37 1.37 0 1 1-2.74 0 1.37 1.37 0 0 1 2.74 0z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@shrishtidairyfarm208',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/917721881777',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
]

function FooterSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-serif text-lg font-semibold">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-[#0b1f3d] text-white">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-5 py-10 sm:gap-x-8 sm:px-6 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1">
          <img
            src="/shrishti-logo.png"
            alt="Shrishti Dairy Farm"
            className="h-20 w-auto"
          />
          <p className="mt-4 text-sm leading-6 text-blue-100">
            Shrishti Dairy Farm — Farm Fresh Certified milk. 100% Natural Products Farm to
            Home.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <FooterSection title="Quick Links">
          <ul className="space-y-2 text-sm text-blue-100">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </FooterSection>

        <FooterSection title="Our Products">
          <ul className="space-y-2 text-sm text-blue-100">
            {products.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </FooterSection>

        <div className="col-span-2 lg:col-span-1">
          <FooterSection title="Contact Us">
            <div className="space-y-3 text-sm leading-6 text-blue-100">
              <p>
                <span className="text-white">Phone:</span>
                <br />
                <a href="tel:+917721881777" className="hover:text-white">
                  +91 7721881777
                </a>
                <br />
                <a href="tel:+919511731391" className="hover:text-white">
                  +91 9511731391
                </a>
              </p>
              <p>
                <span className="text-white">Address:</span>
                <br />
                BR2 437, 4th Floor, INOX Leisure Ltd, JAI GANESH VISION Mall, Akurdi Chowk,
                Shubhashri Residency, Ganga Nagar, Akurdi, Pune, Pimpri-Chinchwad, Maharashtra
                411035
              </p>
            </div>
          </FooterSection>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-5 text-xs text-blue-100 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-center lg:text-left">
            © 2026 Shrishti Dairy Farm | Farm Fresh Certified milk Dairy Farm
          </p>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-end">
            {legalLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
          <p className="mx-auto rounded bg-white px-2 py-1 text-center text-[10px] font-semibold text-[#0b1f3d] lg:mx-0">
            FSSAI 21524003000030
          </p>
        </div>
      </div>
    </footer>
  )
}
