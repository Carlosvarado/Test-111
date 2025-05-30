"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Star, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface RatingData {
  taste: number
  presentation: number
  punctuality: number
  comments: string
}

export default function RatingPage() {
  const router = useRouter()
  const [selectedBakery, setSelectedBakery] = useState<string>("")
  const [submitted, setSubmitted] = useState(false)
  const [ratings, setRatings] = useState<RatingData>({
    taste: 0,
    presentation: 0,
    punctuality: 0,
    comments: "",
  })

  const bakeryNames: { [key: string]: string } = {
    "1": "Dulce Encanto",
    "2": "Pastelería Artesanal Luna",
    "3": "Repostería Tradicional",
    "4": "Confitería Premium",
  }

  useEffect(() => {
    const bakeryId = localStorage.getItem("selectedBakery")
    if (bakeryId) {
      setSelectedBakery(bakeryId)
    }
  }, [])

  const handleStarClick = (category: keyof RatingData, rating: number) => {
    setRatings((prev) => ({
      ...prev,
      [category]: rating,
    }))
  }

  const renderStarRating = (category: keyof RatingData, currentRating: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleStarClick(category, i + 1)}
            className="transition-colors hover:scale-110"
          >
            <Star
              className={`w-6 h-6 ${
                i < currentRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-300"
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the rating to your backend
    console.log("Rating submitted:", { bakery: selectedBakery, ratings })
    setSubmitted(true)
  }

  const handleNewOrder = () => {
    // Clear localStorage and redirect to home
    localStorage.removeItem("orderData")
    localStorage.removeItem("selectedBakery")
    router.push("/")
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-white/90 backdrop-blur-sm border-pink-100 text-center">
          <CardContent className="pt-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Gracias por tu Calificación!</h2>
            <p className="text-gray-600 mb-6">
              Tu opinión nos ayuda a mejorar el servicio y ayuda a otros clientes a tomar mejores decisiones.
            </p>
            <Button
              onClick={handleNewOrder}
              className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white"
            >
              Hacer Nuevo Pedido
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/quotes")}
              className="text-pink-600 hover:text-pink-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Califica tu Experiencia</h1>
          </div>
        </div>
      </header>

      {/* Rating Form */}
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm border-pink-100 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-800">
              {selectedBakery ? bakeryNames[selectedBakery] : "Pastelería Seleccionada"}
            </CardTitle>
            <p className="text-gray-600">Ayúdanos a mejorar calificando tu experiencia con esta pastelería</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Taste Rating */}
              <div className="space-y-3">
                <Label className="text-lg font-medium text-gray-700">Sabor</Label>
                <p className="text-sm text-gray-600">¿Qué tal estuvo el sabor de tu postre?</p>
                {renderStarRating("taste", ratings.taste)}
              </div>

              {/* Presentation Rating */}
              <div className="space-y-3">
                <Label className="text-lg font-medium text-gray-700">Presentación</Label>
                <p className="text-sm text-gray-600">¿Cómo calificarías la presentación y decoración?</p>
                {renderStarRating("presentation", ratings.presentation)}
              </div>

              {/* Punctuality Rating */}
              <div className="space-y-3">
                <Label className="text-lg font-medium text-gray-700">Puntualidad</Label>
                <p className="text-sm text-gray-600">¿La entrega fue puntual?</p>
                {renderStarRating("punctuality", ratings.punctuality)}
              </div>

              {/* Comments */}
              <div className="space-y-3">
                <Label htmlFor="comments" className="text-lg font-medium text-gray-700">
                  Comentarios Adicionales (Opcional)
                </Label>
                <Textarea
                  id="comments"
                  placeholder="Comparte más detalles sobre tu experiencia..."
                  value={ratings.comments}
                  onChange={(e) => setRatings((prev) => ({ ...prev, comments: e.target.value }))}
                  className="border-pink-200 focus:border-pink-400 min-h-[100px]"
                />
              </div>

              <Button
                type="submit"
                disabled={ratings.taste === 0 || ratings.presentation === 0 || ratings.punctuality === 0}
                className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar Calificación
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
