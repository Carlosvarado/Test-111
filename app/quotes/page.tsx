"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Star, MapPin, Clock, ArrowLeft, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { Bakery } from "@/lib/types"

function calculatePrice(orderData: any, pricing: any) {
  if (!orderData) return 0

  let basePrice = Number.parseFloat(orderData.weight || "1") * pricing.basePricePerKg

  // Floor multiplier
  const floors = Number.parseInt(orderData.floors || "1")
  if (floors > 1) {
    basePrice *= Math.pow(pricing.floorMultiplier, floors - 1)
  }

  // Coverage price
  if (orderData.coverage && pricing.coveragePrices[orderData.coverage]) {
    basePrice += pricing.coveragePrices[orderData.coverage]
  }

  // Diabetic surcharge
  if (orderData.sugarType === "diabetic") {
    basePrice += pricing.diabeticSurcharge
  }

  // Quantity multiplier
  const quantity = Number.parseInt(orderData.quantity || "1")
  basePrice *= quantity

  return Math.round(basePrice)
}

export default function QuotesPage() {
  const router = useRouter()
  const [orderData, setOrderData] = useState<any>(null)
  const [selectedBakery, setSelectedBakery] = useState<Bakery | null>(null)
  const [bakeries, setBakeriesState] = useState<Bakery[]>([
    {
      id: "1",
      name: "Dulce Encanto",
      location: "Centro, Ciudad",
      rating: 4.8,
      reviews: 127,
      specialties: ["Tortas Personalizadas", "Fondant", "Decoración Artística"],
      price: 0,
      deliveryTime: "2-3 días",
      portfolioImages: [
        "/placeholder.svg?height=200&width=300&text=Torta+Fondant",
        "/placeholder.svg?height=200&width=300&text=Torta+Bodas",
        "/placeholder.svg?height=200&width=300&text=Cupcakes+Decorados",
      ],
      responsibleFirstName: "María",
      responsibleLastName: "González",
      description:
        "Especialistas en tortas personalizadas con más de 10 años de experiencia. Utilizamos ingredientes de primera calidad y técnicas artesanales para crear postres únicos que superan las expectativas de nuestros clientes.",
      phone: "987654321",
      address: "Av. Principal 123, Centro, Lima",
      paymentMethods: ["yape", "plin", "transferencia"],
      yapePhone: "987654321",
      plinPhone: "987654321",
      bankAccount: "BCP - 123-456-789-012",
      galleryImages: [
        "/placeholder.svg?height=300&width=400&text=Galería+1",
        "/placeholder.svg?height=300&width=400&text=Galería+2",
        "/placeholder.svg?height=300&width=400&text=Galería+3",
        "/placeholder.svg?height=300&width=400&text=Galería+4",
        "/placeholder.svg?height=300&width=400&text=Galería+5",
      ],
    },
    {
      id: "2",
      name: "Pastelería Artesanal Luna",
      location: "Zona Norte, Ciudad",
      rating: 4.9,
      reviews: 89,
      specialties: ["Ingredientes Orgánicos", "Sin Gluten", "Vegano"],
      price: 0,
      deliveryTime: "1-2 días",
      portfolioImages: [
        "/placeholder.svg?height=200&width=300&text=Torta+Vegana",
        "/placeholder.svg?height=200&width=300&text=Sin+Gluten",
        "/placeholder.svg?height=200&width=300&text=Orgánico",
      ],
      responsibleFirstName: "Carlos",
      responsibleLastName: "Mendoza",
      description:
        "Pastelería artesanal enfocada en ingredientes orgánicos y opciones saludables. Perfecta para personas con restricciones alimentarias sin sacrificar el sabor.",
      phone: "976543210",
      address: "Jr. Los Olivos 456, San Martín de Porres, Lima",
      paymentMethods: ["yape", "transferencia"],
      yapePhone: "976543210",
      plinPhone: "",
      bankAccount: "BBVA - 987-654-321-098",
      galleryImages: [
        "/placeholder.svg?height=300&width=400&text=Proceso+1",
        "/placeholder.svg?height=300&width=400&text=Proceso+2",
        "/placeholder.svg?height=300&width=400&text=Ingredientes",
      ],
    },
    {
      id: "3",
      name: "Repostería Tradicional",
      location: "Zona Sur, Ciudad",
      rating: 4.6,
      reviews: 203,
      specialties: ["Recetas Familiares", "Sabores Clásicos", "Precios Accesibles"],
      price: 0,
      deliveryTime: "3-4 días",
      portfolioImages: [
        "/placeholder.svg?height=200&width=300&text=Torta+Clásica",
        "/placeholder.svg?height=200&width=300&text=Tres+Leches",
        "/placeholder.svg?height=200&width=300&text=Chocolate",
      ],
      responsibleFirstName: "Ana",
      responsibleLastName: "Vargas",
      description:
        "Repostería familiar con recetas tradicionales transmitidas por generaciones. Ofrecemos sabores auténticos a precios accesibles para toda la familia.",
      phone: "965432109",
      address: "Av. Los Héroes 789, Villa El Salvador, Lima",
      paymentMethods: ["yape", "plin"],
      yapePhone: "965432109",
      plinPhone: "965432109",
      bankAccount: "",
      galleryImages: [
        "/placeholder.svg?height=300&width=400&text=Familia+1",
        "/placeholder.svg?height=300&width=400&text=Tradición",
      ],
    },
  ])

  useEffect(() => {
    const storedData = localStorage.getItem("orderData")
    if (storedData) {
      const data = JSON.parse(storedData)
      setOrderData(data)

      // Calculate prices for each bakery
      const pricingStructures = [
        {
          basePricePerKg: 15000,
          floorMultiplier: 1.5,
          coveragePrices: { buttercream: 5000, chantilly: 3000, fondant: 8000 },
          diabeticSurcharge: 2000,
        },
        {
          basePricePerKg: 18000,
          floorMultiplier: 1.6,
          coveragePrices: { buttercream: 6000, chantilly: 4000, fondant: 10000 },
          diabeticSurcharge: 1500,
        },
        {
          basePricePerKg: 12000,
          floorMultiplier: 1.3,
          coveragePrices: { buttercream: 3000, chantilly: 2000, fondant: 6000 },
          diabeticSurcharge: 1000,
        },
      ]

      setBakeriesState((prev) =>
        prev.map((bakery, index) => ({
          ...bakery,
          price: calculatePrice(data, pricingStructures[index]),
        })),
      )
    }
  }, [])

  const handleSelectBakery = (bakery: Bakery) => {
    setSelectedBakery(bakery)
  }

  const handleConfirmSelection = () => {
    if (selectedBakery) {
      localStorage.setItem("selectedBakery", selectedBakery.id)
      router.push("/rating")
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const getPaymentMethodLabel = (method: string) => {
    const labels = {
      yape: "Yape",
      plin: "Plin",
      transferencia: "Transferencia Bancaria",
    }
    return labels[method as keyof typeof labels] || method
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Cargando información del pedido...</p>
          <Button onClick={() => router.push("/")} variant="outline">
            Volver al inicio
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push("/order")} className="text-pink-600 hover:text-pink-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Cotizaciones Disponibles</h1>
          </div>
        </div>
      </header>

      {/* Order Summary */}
      <div className="container mx-auto px-4 py-6">
        <Card className="mb-8 bg-white/90 backdrop-blur-sm border-pink-100">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Resumen de tu Pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Postre:</span> {orderData.dessertType}
              </div>
              <div>
                <span className="font-medium text-gray-700">Pisos:</span> {orderData.floors}
              </div>
              <div>
                <span className="font-medium text-gray-700">Peso:</span> {orderData.weight} Kg
              </div>
              <div>
                <span className="font-medium text-gray-700">Cantidad:</span> {orderData.quantity}
              </div>
              <div>
                <span className="font-medium text-gray-700">Masa:</span> {orderData.doughType}
              </div>
              <div>
                <span className="font-medium text-gray-700">Entrega:</span> {orderData.deliveryDate} a las{" "}
                {orderData.deliveryTime}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bakery Quotes */}
        <div className="grid md:grid-cols-2 gap-6">
          {bakeries.map((bakery) => (
            <Card
              key={bakery.id}
              className="bg-white/90 backdrop-blur-sm border-pink-100 hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-gray-800">{bakery.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 text-sm">{bakery.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-pink-600">S/{bakery.price.toLocaleString()}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{bakery.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex">{renderStars(bakery.rating)}</div>
                    <span className="text-sm text-gray-600">
                      {bakery.rating} ({bakery.reviews} reseñas)
                    </span>
                  </div>

                  {/* Portfolio Images */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Portafolio:</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {bakery.portfolioImages.slice(0, 3).map((image, index) => (
                        <img
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt={`Portafolio ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg border border-pink-100"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Especialidades:</h4>
                    <div className="flex flex-wrap gap-2">
                      {bakery.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="bg-pink-100 text-pink-700">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => handleSelectBakery(bakery)}
                        className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalles y Seleccionar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-gray-800">{bakery.name}</DialogTitle>
                      </DialogHeader>

                      {selectedBakery && (
                        <div className="space-y-6">
                          {/* Responsible Person */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Responsable</h3>
                            <p className="text-gray-700">
                              {selectedBakery.responsibleFirstName} {selectedBakery.responsibleLastName}
                            </p>
                          </div>

                          {/* Description */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
                            <p className="text-gray-700 leading-relaxed">{selectedBakery.description}</p>
                          </div>

                          {/* Gallery Images */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Galería</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {selectedBakery.galleryImages.map((image, index) => (
                                <img
                                  key={index}
                                  src={image || "/placeholder.svg"}
                                  alt={`Galería ${index + 1}`}
                                  className="w-full h-32 object-cover rounded-lg border border-pink-100"
                                />
                              ))}
                            </div>
                          </div>

                          {/* Contact Information */}
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-2">Información de Contacto</h3>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-gray-500" />
                                  <span className="text-gray-700">{selectedBakery.address}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-500">📞</span>
                                  <span className="text-gray-700">{selectedBakery.phone}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-2">Métodos de Pago</h3>
                              <div className="space-y-2">
                                {selectedBakery.paymentMethods.map((method) => (
                                  <div key={method} className="flex items-center gap-2">
                                    <Badge variant="outline" className="border-pink-300 text-pink-700">
                                      {getPaymentMethodLabel(method)}
                                    </Badge>
                                    {method === "yape" && selectedBakery.yapePhone && (
                                      <span className="text-sm text-gray-600">: {selectedBakery.yapePhone}</span>
                                    )}
                                    {method === "plin" && selectedBakery.plinPhone && (
                                      <span className="text-sm text-gray-600">: {selectedBakery.plinPhone}</span>
                                    )}
                                    {method === "transferencia" && selectedBakery.bankAccount && (
                                      <span className="text-sm text-gray-600">: {selectedBakery.bankAccount}</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Price Summary */}
                          <div className="bg-pink-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-semibold text-gray-800">Total del Pedido:</span>
                              <span className="text-2xl font-bold text-pink-600">
                                S/{selectedBakery.price.toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Tiempo de entrega: {selectedBakery.deliveryTime}
                            </p>
                          </div>

                          <Button
                            onClick={handleConfirmSelection}
                            className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white py-3 text-lg font-medium"
                          >
                            Confirmar Selección
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
