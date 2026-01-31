import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const TermsPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-black font-['Montserrat'] mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none prose-headings:font-['Montserrat'] prose-headings:font-bold prose-p:text-[#5c5c5c]">
            <p className="text-lg text-[#5c5c5c] mb-8">
              Last updated: January 2024
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using Lumina's website and services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">2. Use of Our Services</h2>
            <p>You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc pl-6 mb-4 text-[#5c5c5c]">
              <li>Use our services in any way that violates applicable laws</li>
              <li>Attempt to interfere with the proper working of our website</li>
              <li>Circumvent any security measures we have in place</li>
              <li>Use our services to transmit harmful code or malware</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">3. Products and Purchases</h2>
            <p>
              All purchases through our website are subject to availability. We reserve the right to discontinue any product at any time. Prices are subject to change without notice.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">4. Shipping and Delivery</h2>
            <p>
              We aim to process and ship orders within 1-2 business days. Delivery times vary based on location and shipping method selected. Risk of loss passes to you upon delivery.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">5. Returns and Refunds</h2>
            <p>
              We accept returns within 30 days of purchase for unused items in original packaging. Refunds will be processed within 5-10 business days of receiving the returned item.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">6. Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos, and images, is the property of Lumina and protected by copyright and other intellectual property laws.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">7. Limitation of Liability</h2>
            <p>
              Lumina shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new terms on our website.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">9. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at legal@lumina.com.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default TermsPage
