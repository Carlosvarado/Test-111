"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChefHat, ArrowLeft, Store, DollarSign, Star, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import type { BakeryData } from "@/lib/types"
import { PAYMENT_METHODS, DESSERT_TYPES } from "@/lib/constants"

export default function BakeryRegisterPage() {
  const router = useRouter()
  const [bakeryData, setBakeryData] = useState<BakeryData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    specialties: [],
    experience: "",
    responsibleFirstName: "",
    responsibleLastName: "",
    paymentMethods: [],
    yapePhone: "",
    plinPhone: "",
    bankAccount: "",
    portfolioImages: [],
    galleryImages: [],
    whatsappAlerts: "",
    emailAlerts: "",
    alertMethods: [],
  })

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      setBakeryData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, specialty],
      }))
    } else {
      setBakeryData((prev) => ({
        ...prev,
        specialties: prev.specialties.filter((s) => s !== specialty),
      }))
    }
  }

  const handlePaymentMethodChange = (method: string, checked: boolean) => {
    if (checked) {
      setBakeryData((prev) => ({
        ...prev,
        paymentMethods: [...prev.paymentMethods, method],
      }))
    } else {
      setBakeryData((prev) => ({
        ...prev,
        paymentMethods: prev.paymentMethods.filter((m) => m !== method),
      }))
    }
  }

  const handleImageUpload = (type: "portfolio" | "gallery", files: FileList | null) => {
    if (!files) return

    // Simulate image upload - in real app, upload to Supabase Storage
    const imageUrls = Array.from(files).map((file, index) => `/placeholder.svg?height=300&width=400&text=${file.name}`)

    if (type === "portfolio") {
      setBakeryData((prev) => ({
        ...prev,
        portfolioImages: [...prev.portfolioImages, ...imageUrls].slice(0, 3),
      }))
    } else {
      setBakeryData((prev) => ({
        ...prev,
        galleryImages: [...prev.galleryImages, ...imageUrls],
      }))
    }
  }

  const removeImage = (type: "portfolio" | "gallery", index: number) => {
    if (type === "portfolio") {
      setBakeryData((prev) => ({
        ...prev,
        portfolioImages: prev.portfolioImages.filter((_, i) => i !== index),
      }))
    } else {
      setBakeryData((prev) => ({
        ...prev,
        galleryImages: prev.galleryImages.filter((_, i) => i !== index),
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validaciones adicionales
    const alertMethods = bakeryData.alertMethods || []

    if (alertMethods.length === 0) {
      alert("Debes seleccionar al menos un método para recibir alertas")
      return
    }

    if (alertMethods.includes("whatsapp")) {
      if (!bakeryData.whatsappAlerts || bakeryData.whatsappAlerts.length !== 9) {
        alert("El número de WhatsApp debe tener exactamente 9 dígitos")
        return
      }
    }

    if (alertMethods.includes("email")) {
      if (!bakeryData.emailAlerts || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bakeryData.emailAlerts)) {
        alert("Debes ingresar un correo electrónico válido")
        return
      }
    }

    // Store bakery data in localStorage (in real app, send to Supabase)
    const existingBakeries = JSON.parse(localStorage.getItem("registeredBakeries") || "[]")
    const newBakery = {
      ...bakeryData,
      id: Date.now().toString(),
      rating: 0,
      reviews: 0,
      verified: false,
    }
    existingBakeries.push(newBakery)
    localStorage.setItem("registeredBakeries", JSON.stringify(existingBakeries))

    alert("¡Registro exitoso! Tu pastelería será verificada en las próximas 24 horas.")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push("/")} className="text-pink-600 hover:text-pink-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Inicio
            </Button>
            <div className="flex items-center gap-3">
              <ChefHat className="w-8 h-8 text-pink-400" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Dulvana
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm border-pink-100 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Store className="w-12 h-12 text-pink-400" />
            </div>
            <CardTitle className="text-2xl text-gray-800">Registra Tu Pastelería</CardTitle>
            <p className="text-gray-600">Únete a nuestra red y llega a miles de clientes</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Store className="w-5 h-5" />
                  Información Básica
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      Nombre de la Pastelería *
                    </Label>
                    <Input
                      id="name"
                      value={bakeryData.name}
                      onChange={(e) => setBakeryData((prev) => ({ ...prev, name: e.target.value }))}
                      className="border-pink-200 focus:border-pink-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={bakeryData.email}
                      onChange={(e) => setBakeryData((prev) => ({ ...prev, email: e.target.value }))}
                      className="border-pink-200 focus:border-pink-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="responsibleFirstName" className="text-gray-700 font-medium">
                      Nombre del Responsable *
                    </Label>
                    <Input
                      id="responsibleFirstName"
                      value={bakeryData.responsibleFirstName}
                      onChange={(e) => setBakeryData((prev) => ({ ...prev, responsibleFirstName: e.target.value }))}
                      className="border-pink-200 focus:border-pink-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="responsibleLastName" className="text-gray-700 font-medium">
                      Apellido del Responsable *
                    </Label>
                    <Input
                      id="responsibleLastName"
                      value={bakeryData.responsibleLastName}
                      onChange={(e) => setBakeryData((prev) => ({ ...prev, responsibleLastName: e.target.value }))}
                      className="border-pink-200 focus:border-pink-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-gray-700 font-medium">
                      Años de Experiencia *
                    </Label>
                    <Input
                      id="experience"
                      type="number"
                      value={bakeryData.experience}
                      onChange={(e) => setBakeryData((prev) => ({ ...prev, experience: e.target.value }))}
                      className="border-pink-200 focus:border-pink-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 font-medium">
                      Teléfono *
                    </Label>
                    <Input
                      id="phone"
                      value={bakeryData.phone}
                      onChange={(e) => setBakeryData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="border-pink-200 focus:border-pink-400"
                      placeholder="987654321"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-gray-700 font-medium">
                      Dirección Completa *
                    </Label>
                    <Input
                      id="address"
                      value={bakeryData.address}
                      onChange={(e) => setBakeryData((prev) => ({ ...prev, address: e.target.value }))}
                      className="border-pink-200 focus:border-pink-400"
                      placeholder="Av. Principal 123, Distrito, Ciudad"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700 font-medium">
                    Descripción de tu Pastelería *
                  </Label>
                  <Textarea
                    id="description"
                    value={bakeryData.description}
                    onChange={(e) => setBakeryData((prev) => ({ ...prev, description: e.target.value }))}
                    className="border-pink-200 focus:border-pink-400"
                    placeholder="Cuéntanos sobre tu pastelería, tu historia, qué te hace especial..."
                    required
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Métodos de Pago
                </h3>

                <div className="grid md:grid-cols-3 gap-4">
                  {PAYMENT_METHODS.map((method) => (
                    <div key={method.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={method.value}
                        checked={bakeryData.paymentMethods.includes(method.value)}
                        onCheckedChange={(checked) => handlePaymentMethodChange(method.value, checked as boolean)}
                        className="border-pink-300"
                      />
                      <Label htmlFor={method.value} className="text-gray-600">
                        {method.label}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {bakeryData.paymentMethods.includes("yape") && (
                    <div className="space-y-2">
                      <Label htmlFor="yapePhone" className="text-gray-700 font-medium">
                        Número Yape (9 dígitos)
                      </Label>
                      <Input
                        id="yapePhone"
                        value={bakeryData.yapePhone}
                        onChange={(e) => setBakeryData((prev) => ({ ...prev, yapePhone: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400"
                        placeholder="987654321"
                        maxLength={9}
                      />
                    </div>
                  )}

                  {bakeryData.paymentMethods.includes("plin") && (
                    <div className="space-y-2">
                      <Label htmlFor="plinPhone" className="text-gray-700 font-medium">
                        Número Plin (9 dígitos)
                      </Label>
                      <Input
                        id="plinPhone"
                        value={bakeryData.plinPhone}
                        onChange={(e) => setBakeryData((prev) => ({ ...prev, plinPhone: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400"
                        placeholder="987654321"
                        maxLength={9}
                      />
                    </div>
                  )}

                  {bakeryData.paymentMethods.includes("transferencia") && (
                    <div className="space-y-2">
                      <Label htmlFor="bankAccount" className="text-gray-700 font-medium">
                        Cuenta Bancaria
                      </Label>
                      <Input
                        id="bankAccount"
                        value={bakeryData.bankAccount}
                        onChange={(e) => setBakeryData((prev) => ({ ...prev, bankAccount: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400"
                        placeholder="BCP - 123-456-789-012"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Imágenes
                </h3>

                {/* Portfolio Images */}
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">
                    Portafolio (máximo 3 imágenes para mostrar en cotizaciones)
                  </Label>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload("portfolio", e.target.files)}
                    className="border-pink-200 focus:border-pink-400"
                    disabled={bakeryData.portfolioImages.length >= 3}
                  />
                  {bakeryData.portfolioImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {bakeryData.portfolioImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Portafolio ${index + 1}`}
                            className="w-full h-20 object-cover rounded border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0"
                            onClick={() => removeImage("portfolio", index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Gallery Images */}
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">
                    Galería (imágenes adicionales para mostrar en detalles)
                  </Label>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload("gallery", e.target.files)}
                    className="border-pink-200 focus:border-pink-400"
                  />
                  {bakeryData.galleryImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {bakeryData.galleryImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Galería ${index + 1}`}
                            className="w-full h-16 object-cover rounded border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 h-5 w-5 p-0"
                            onClick={() => removeImage("gallery", index)}
                          >
                            <X className="w-2 h-2" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Recibir Alertas para */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Recibir Alertas para:
                </h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {DESSERT_TYPES.map((dessert) => (
                    <div key={dessert.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={dessert.value}
                        checked={bakeryData.specialties.includes(dessert.value)}
                        onCheckedChange={(checked) => handleSpecialtyChange(dessert.value, checked as boolean)}
                        className="border-pink-300"
                      />
                      <Label htmlFor={dessert.value} className="text-gray-600 text-sm">
                        {dessert.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recibir Alertas en */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Recibir Alertas en:
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="whatsappAlert"
                      checked={bakeryData.alertMethods?.includes("whatsapp") || false}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setBakeryData((prev) => ({
                            ...prev,
                            alertMethods: [...(prev.alertMethods || []), "whatsapp"],
                          }))
                        } else {
                          setBakeryData((prev) => ({
                            ...prev,
                            alertMethods: (prev.alertMethods || []).filter((m) => m !== "whatsapp"),
                            whatsappAlerts: "", // Limpiar el campo si se desmarca
                          }))
                        }
                      }}
                      className="border-pink-300"
                    />
                    <Label htmlFor="whatsappAlert" className="text-gray-600">
                      WhatsApp
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="emailAlert"
                      checked={bakeryData.alertMethods?.includes("email") || false}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setBakeryData((prev) => ({
                            ...prev,
                            alertMethods: [...(prev.alertMethods || []), "email"],
                          }))
                        } else {
                          setBakeryData((prev) => ({
                            ...prev,
                            alertMethods: (prev.alertMethods || []).filter((m) => m !== "email"),
                            emailAlerts: "", // Limpiar el campo si se desmarca
                          }))
                        }
                      }}
                      className="border-pink-300"
                    />
                    <Label htmlFor="emailAlert" className="text-gray-600">
                      Correo Electrónico
                    </Label>
                  </div>
                </div>

                <div className="space-y-4">
                  {(bakeryData.alertMethods || []).includes("whatsapp") && (
                    <div className="space-y-2">
                      <Label htmlFor="whatsappAlerts" className="text-gray-700 font-medium">
                        Número de WhatsApp (9 dígitos) *
                      </Label>
                      <Input
                        id="whatsappAlerts"
                        value={bakeryData.whatsappAlerts || ""}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "") // Solo números
                          if (value.length <= 9) {
                            setBakeryData((prev) => ({ ...prev, whatsappAlerts: value }))
                          }
                        }}
                        className="border-pink-200 focus:border-pink-400"
                        placeholder="987654321"
                        maxLength={9}
                        pattern="[0-9]{9}"
                        required={(bakeryData.alertMethods || []).includes("whatsapp")}
                      />
                      {bakeryData.whatsappAlerts && bakeryData.whatsappAlerts.length !== 9 && (
                        <p className="text-sm text-red-500">El número debe tener exactamente 9 dígitos</p>
                      )}
                    </div>
                  )}

                  {(bakeryData.alertMethods || []).includes("email") && (
                    <div className="space-y-2">
                      <Label htmlFor="emailAlerts" className="text-gray-700 font-medium">
                        Correo Electrónico *
                      </Label>
                      <Input
                        id="emailAlerts"
                        type="email"
                        value={bakeryData.emailAlerts || ""}
                        onChange={(e) => setBakeryData((prev) => ({ ...prev, emailAlerts: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400"
                        placeholder="tu-email@ejemplo.com"
                        required={(bakeryData.alertMethods || []).includes("email")}
                      />
                      {bakeryData.emailAlerts && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bakeryData.emailAlerts) && (
                        <p className="text-sm text-red-500">Ingresa un correo electrónico válido</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white py-3 text-lg font-medium"
              >
                Registrar Pastelería
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
