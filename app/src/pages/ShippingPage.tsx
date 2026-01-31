import { Truck, Clock, Package, Globe } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const ShippingPage = () => {
  const shippingMethods = [
    {
      name: 'Standard Shipping',
      time: '5-7 business days',
      cost: '$10',
      freeOver: 50
    },
    {
      name: 'Express Shipping',
      time: '2-3 business days',
      cost: '$20',
      freeOver: null
    },
    {
      name: 'Next Day Delivery',
      time: '1 business day',
      cost: '$35',
      freeOver: null
    }
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#007fff]/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-black font-['Montserrat'] mb-4">
              Shipping Information
            </h1>
            <p className="text-xl text-[#5c5c5c] max-w-2xl mx-auto">
              Everything you need to know about our shipping policies and delivery options
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: Clock, title: 'Fast Processing', desc: 'Ships within 24 hours' },
              { icon: Package, title: 'Track Order', desc: 'Real-time tracking' },
              { icon: Globe, title: 'Worldwide', desc: 'We ship globally' }
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 bg-[#007fff]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-[#007fff]" />
                </div>
                <h3 className="font-bold text-black mb-2">{feature.title}</h3>
                <p className="text-[#5c5c5c]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Methods */}
      <section className="py-16 bg-[#f4f4f4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black font-['Montserrat'] mb-8 text-center">
            Shipping Methods
          </h2>
          <div className="space-y-4">
            {shippingMethods.map((method) => (
              <div key={method.name} className="bg-white rounded-2xl p-6 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-black">{method.name}</h3>
                  <p className="text-[#5c5c5c]">{method.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#007fff]">{method.cost}</p>
                  {method.freeOver && (
                    <p className="text-sm text-green-600">Free on orders over ${method.freeOver}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black font-['Montserrat'] mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'When will my order ship?',
                a: 'Orders are typically processed within 1-2 business days. You\'ll receive a confirmation email with tracking information once your order ships.'
              },
              {
                q: 'How can I track my order?',
                a: 'Once your order ships, you\'ll receive an email with a tracking number. You can use this number on our website or the carrier\'s website to track your package.'
              },
              {
                q: 'Do you ship internationally?',
                a: 'Yes! We ship to most countries worldwide. International shipping rates and delivery times vary by location.'
              },
              {
                q: 'What if my package is lost or damaged?',
                a: 'Please contact our customer service team within 7 days of delivery. We\'ll work with you to resolve the issue and ensure you receive your order.'
              },
              {
                q: 'Can I change my shipping address after ordering?',
                a: 'We can only change the shipping address if the order hasn\'t been processed yet. Please contact us immediately if you need to make changes.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-black mb-2">{faq.q}</h3>
                <p className="text-[#5c5c5c]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ShippingPage
