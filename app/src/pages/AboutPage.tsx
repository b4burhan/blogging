import { Link } from 'react-router-dom'
import { ArrowRight, Target, Heart, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To inspire and elevate everyday life through curated stories and quality products that bring joy and meaning.'
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'We believe in authenticity, quality, sustainability, and creating meaningful connections with our community.'
    },
    {
      icon: Lightbulb,
      title: 'Our Vision',
      description: 'To become the go-to destination for those seeking inspiration and products that enhance their lifestyle.'
    }
  ]

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '500+', label: 'Blog Articles' },
    { number: '100+', label: 'Products' },
    { number: '4.9', label: 'Average Rating' }
  ]

  const team = [
    {
      name: 'Sarah Mitchell',
      role: 'Founder & CEO',
      avatar: 'SM',
      description: 'Visionary leader with 10+ years in lifestyle media'
    },
    {
      name: 'James Chen',
      role: 'Creative Director',
      avatar: 'JC',
      description: 'Award-winning designer and brand strategist'
    },
    {
      name: 'Emma Wilson',
      role: 'Head of Content',
      avatar: 'EW',
      description: 'Experienced writer and editor passionate about storytelling'
    },
    {
      name: 'Michael Torres',
      role: 'Product Manager',
      avatar: 'MT',
      description: 'Expert in curating quality lifestyle products'
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
              About <span className="text-[#007fff]">Lumina</span>
            </h1>
            <p className="text-xl text-[#5c5c5c] max-w-3xl mx-auto">
              We're a team of passionate creators, curators, and storytellers dedicated to bringing you the best in lifestyle content and products.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/hero-image.jpg" 
                  alt="Our Story" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#007fff] text-white rounded-2xl p-6 shadow-xl">
                <p className="text-4xl font-bold">2019</p>
                <p className="text-sm opacity-80">Founded</p>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-black font-['Montserrat']">Our Story</h2>
              <p className="text-lg text-[#5c5c5c] leading-relaxed">
                Lumina was born from a simple idea: that everyday life deserves to be elevated. In 2019, our founder Sarah Mitchell started a small blog sharing stories about mindful living and quality products she discovered.
              </p>
              <p className="text-lg text-[#5c5c5c] leading-relaxed">
                What began as a passion project quickly grew into a community of like-minded individuals seeking inspiration and products that truly enhance their lives. Today, Lumina is a trusted destination for curated content and carefully selected goods.
              </p>
              <p className="text-lg text-[#5c5c5c] leading-relaxed">
                Every product in our shop is handpicked, every story is thoughtfully crafted, and every interaction is designed to bring value to our community.
              </p>
              <Link to="/shop">
                <Button className="bg-[#007fff] hover:bg-[#0066cc] text-white px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 mt-4">
                  Explore Our Shop
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#f4f4f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black font-['Montserrat'] mb-4">What We Stand For</h2>
            <p className="text-lg text-[#5c5c5c] max-w-2xl mx-auto">
              Our core values guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 text-center">
                <div className="w-16 h-16 bg-[#007fff]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-[#007fff]" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">{value.title}</h3>
                <p className="text-[#5c5c5c]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-[#007fff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-5xl md:text-6xl font-bold text-white mb-2">{stat.number}</p>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black font-['Montserrat'] mb-4">Meet Our Team</h2>
            <p className="text-lg text-[#5c5c5c] max-w-2xl mx-auto">
              The passionate people behind Lumina
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 text-center border border-gray-100">
                <div className="w-24 h-24 bg-[#007fff] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold text-black mb-1">{member.name}</h3>
                <p className="text-[#007fff] font-medium mb-3">{member.role}</p>
                <p className="text-sm text-[#5c5c5c]">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#f4f4f4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-black font-['Montserrat'] mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-[#5c5c5c] mb-8">
            Be part of a growing community of people who value quality content and products.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/blog">
              <Button className="bg-[#007fff] hover:bg-[#0066cc] text-white px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105">
                Read Our Blog
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutPage
