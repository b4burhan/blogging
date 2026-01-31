import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      category: 'Orders',
      questions: [
        {
          q: 'How do I place an order?',
          a: 'Simply browse our shop, add items to your cart, and proceed to checkout. You\'ll need to provide your shipping and payment information to complete the purchase.'
        },
        {
          q: 'Can I modify or cancel my order?',
          a: 'Orders can be modified or cancelled within 1 hour of placement. After that, we begin processing and cannot guarantee changes. Contact us as soon as possible if you need to make changes.'
        },
        {
          q: 'How do I track my order?',
          a: 'Once your order ships, you\'ll receive an email with a tracking number. You can also view your order status in your account dashboard.'
        }
      ]
    },
    {
      category: 'Shipping',
      questions: [
        {
          q: 'How long does shipping take?',
          a: 'Standard shipping takes 5-7 business days, Express takes 2-3 business days, and Next Day delivers in 1 business day. International orders may take 10-20 business days.'
        },
        {
          q: 'Do you offer free shipping?',
          a: 'Yes! We offer free standard shipping on all orders over $50 within the United States.'
        },
        {
          q: 'Do you ship internationally?',
          a: 'Yes, we ship to most countries worldwide. International shipping rates are calculated at checkout based on your location.'
        }
      ]
    },
    {
      category: 'Returns',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'We accept returns within 30 days of purchase for unused items in original packaging. Items must be in resellable condition.'
        },
        {
          q: 'How do I initiate a return?',
          a: 'Contact our customer service team with your order number. We\'ll provide you with a return label and instructions.'
        },
        {
          q: 'When will I receive my refund?',
          a: 'Refunds are processed within 5-10 business days of receiving your returned item. The refund will be issued to your original payment method.'
        }
      ]
    },
    {
      category: 'Products',
      questions: [
        {
          q: 'Are your products sustainable?',
          a: 'We prioritize sustainable and ethically sourced products. Many of our items are made from eco-friendly materials, and we work with suppliers who share our values.'
        },
        {
          q: 'How do I care for my products?',
          a: 'Each product comes with specific care instructions. You can also find care guides on individual product pages.'
        },
        {
          q: 'Do you offer gift wrapping?',
          a: 'Yes! Gift wrapping is available at checkout for $5. You can also include a personalized message with your gift.'
        }
      ]
    },
    {
      category: 'Account',
      questions: [
        {
          q: 'Do I need an account to shop?',
          a: 'No, you can checkout as a guest. However, creating an account allows you to track orders, save favorites, and checkout faster in the future.'
        },
        {
          q: 'How do I reset my password?',
          a: 'Click "Forgot Password" on the login page and follow the instructions. You\'ll receive an email with a link to reset your password.'
        },
        {
          q: 'Is my personal information secure?',
          a: 'Absolutely. We use industry-standard encryption and security measures to protect your data. Read our Privacy Policy for more details.'
        }
      ]
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
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-[#5c5c5c] max-w-2xl mx-auto">
              Find answers to common questions about our products, shipping, and more
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category, catIndex) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-2xl font-bold text-black font-['Montserrat'] mb-6 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-[#007fff]" />
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => {
                  const index = catIndex * 10 + qIndex
                  const isOpen = openIndex === index
                  return (
                    <div key={qIndex} className="border border-gray-200 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-black pr-4">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <p className="text-[#5c5c5c]">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#f4f4f4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-black font-['Montserrat'] mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-[#5c5c5c] mb-8">
            Can't find what you're looking for? We're here to help!
          </p>
          <a 
            href="/contact"
            className="inline-block bg-[#007fff] hover:bg-[#0066cc] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default FAQPage
