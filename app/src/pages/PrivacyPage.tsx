import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const PrivacyPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-black font-['Montserrat'] mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none prose-headings:font-['Montserrat'] prose-headings:font-bold prose-p:text-[#5c5c5c]">
            <p className="text-lg text-[#5c5c5c] mb-8">
              Last updated: January 2024
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">1. Introduction</h2>
            <p>
              At Lumina, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">2. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mb-4 text-[#5c5c5c]">
              <li>Name and contact information</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information</li>
              <li>Email address</li>
              <li>Phone number</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4 text-[#5c5c5c]">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Prevent fraud and protect our rights</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">4. Information Sharing</h2>
            <p>
              We do not sell or rent your personal information to third parties. We may share your information with service providers who help us operate our business, such as payment processors and shipping carriers.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">5. Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 text-[#5c5c5c]">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@lumina.com.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PrivacyPage
