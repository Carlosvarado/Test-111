"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChefHat, ArrowLeft, User, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ClientData {
  name: string
  email: string
  phone: string
  address: string
}

export default function ClientRegisterPage() {
  const router = useRouter()
  const [clientData, setClientData] = useState<ClientData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store client data in localStorage
    localStorage.setItem("clientData", JSON.stringify(clientData))

    // Check if there's order data to continue the flow
    const orderData = localStorage.getItem("orderData")
    if (orderData) {
      router.push("/quotes")
    } else {
      router.push("/order")
    }
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
        <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm border-pink-100 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <User className="w-12 h-12 text-pink-400" />
            </div>
            <CardTitle className="text-2xl text-gray-800">Completa tu Registro</CardTitle>
            <p className="text-gray-600">Necesitamos algunos datos para procesar tu pedido</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Nombre Completo *
                  </Label>
                  <Input
                    id="name"
                    value={clientData.name}
                    onChange={(e) => setClientData((prev) => ({ ...prev, name: e.target.value }))}
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
                    value={clientData.email}
                    onChange={(e) => setClientData((prev) => ({ ...prev, email: e.target.value }))}
                    className="border-pink-200 focus:border-pink-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    Teléfono *
                  </Label>
                  <Input
                    id="phone"
                    value={clientData.phone}
                    onChange={(e) => setClientData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="border-pink-200 focus:border-pink-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-700 font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Dirección de Entrega *
                  </Label>
                  <Input
                    id="address"
                    value={clientData.address}
                    onChange={(e) => setClientData((prev) => ({ ...prev, address: e.target.value }))}
                    className="border-pink-200 focus:border-pink-400"
                    placeholder="Buscar dirección en Google Maps..."
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Ingresa tu dirección completa para que las pastelerías puedan calcular el costo de entrega
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white py-3 text-lg font-medium"
              >
                Continuar con mi Pedido
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
