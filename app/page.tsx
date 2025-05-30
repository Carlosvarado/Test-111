"use client"

import { memo } from "react"
import { useRouter } from "next/navigation"
import { ChefHat, Heart, ArrowRight, CheckCircle, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FeatureCard } from "@/components/feature-card"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { FEATURES, TESTIMONIALS, PROCESS_STEPS } from "@/lib/constants"

const TestimonialCard = memo(function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof TESTIMONIALS)[0]
}) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
      <CardContent className="p-6">
        <div className="flex mb-4">
          {Array.from({ length: testimonial.rating }, (_, i) => (
            <svg key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
        <div className="border-t border-pink-100 pt-4">
          <p className="font-semibold text-gray-800">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.occasion}</p>
        </div>
      </CardContent>
    </Card>
  )
})

export default function LandingPage() {
  const router = useRouter()

  const updatedTestimonials = TESTIMONIALS.map((testimonial) => {
    if (
      testimonial.text ===
      "Como diabética, encontrar postres deliciosos era difícil. Sukary me conectó con la pastelería perfecta."
    ) {
      return {
        ...testimonial,
        text: "Como diabética, encontrar postres deliciosos era difícil. Dulvana me conectó con la pastelería perfecta.",
      }
    }
    return testimonial
  })

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <ChefHat className="w-16 h-16 text-pink-400" />
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Dulvana
              </h1>
            </div>
            <p className="text-3xl text-gray-600 mb-8 font-light">Tu postre perfecto</p>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Conectamos tus sueños dulces con las mejores pastelerías de tu ciudad. Personaliza cada detalle y recibe
              cotizaciones instantáneas.
            </p>
            <div className="flex flex-col gap-4 justify-center items-center">
              <Button
                onClick={() => router.push("/order")}
                size="lg"
                className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-4 text-lg font-medium"
              >
                Comenzar Ahora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Gratis y sin compromiso
              </p>
            </div>
          </div>
        </section>

        {/* Client CTA Section */}
        <section className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto text-white">
              <Heart className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h3 className="text-4xl font-bold mb-6">¿Listo Para Crear Algo Dulce?</h3>
              <p className="text-xl mb-8 opacity-90">
                Únete a miles de clientes que ya han encontrado su pastelería perfecta. Tu postre ideal está a solo unos
                clics de distancia.
              </p>
              <Button
                onClick={() => router.push("/order")}
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 text-lg font-medium"
              >
                Comenzar Mi Pedido
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Bakery CTA Section */}
        <section className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto text-white">
              <Store className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h3 className="text-4xl font-bold mb-6">¿Tienes una Pastelería?</h3>
              <p className="text-xl mb-8 opacity-90">
                Únete a nuestra red de pastelerías verificadas y llega a miles de clientes que buscan postres únicos.
                Aumenta tus ventas y haz crecer tu negocio con Dulvana.
              </p>
              <Button
                onClick={() => router.push("/bakery-register")}
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 text-lg font-medium"
              >
                Registrar Mi Pastelería
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">¿Por Qué Elegir Dulvana?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hemos revolucionado la forma de encargar postres personalizados, conectándote directamente con los mejores
              profesionales.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white/50 backdrop-blur-sm py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Cómo Funciona</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">En solo 3 simples pasos tendrás el postre de tus sueños</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {PROCESS_STEPS.map((step, index) => (
                <div key={step.number} className="text-center relative">
                  <div className="bg-gradient-to-r from-pink-400 to-purple-400 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full">
                      <ArrowRight className="w-6 h-6 text-pink-300 mx-auto" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Lo Que Dicen Nuestros Clientes</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Miles de clientes satisfechos han encontrado su postre perfecto con Dulvana
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {updatedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-sm border-t border-pink-100 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <ChefHat className="w-6 h-6 text-pink-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Dulvana
                </span>
              </div>
              <p className="text-gray-600 text-center md:text-right">© 2024 Dulvana.</p>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  )
}
