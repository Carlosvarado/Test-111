"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Clock, ChefHat, ArrowLeft, MapPin, Home, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import type { OrderData } from "@/lib/types"
import {
  DESSERT_TYPES,
  QUANTITY_OPTIONS,
  MASA_OPTIONS,
  SABOR_OPTIONS,
  PESO_OPTIONS,
  PESO_OPTIONS_SMALL,
  RELLENO_OPTIONS,
  PISOS_OPTIONS,
  FORMA_OPTIONS,
  COBERTURA_OPTIONS,
  FIGURAS_DECORATIVAS_OPTIONS,
  MENSAJE_OPTIONS,
  SABOR_GELATINA_OPTIONS,
  SABOR_PIE_OPTIONS,
  SABOR_CHEESECAKE_OPTIONS,
  RELLENO_EMPANADAS_OPTIONS,
  SABOR_EMPANADAS_OPTIONS,
  TAMAÑO_EMPANADAS_OPTIONS,
  DELIVERY_MODE_OPTIONS,
} from "@/lib/constants"

// Función para formatear la fecha como "lunes, 2 de junio 2025" - CORREGIDA
const formatDateToSpanish = (dateString: string): string => {
  if (!dateString) return ""

  // Crear la fecha usando los componentes individuales para evitar problemas de zona horaria
  const [year, month, day] = dateString.split("-").map(Number)
  const date = new Date(year, month - 1, day) // month - 1 porque los meses en JS van de 0-11

  const weekdays = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ]

  const weekday = weekdays[date.getDay()]
  const dayNum = date.getDate()
  const monthName = months[date.getMonth()]
  const yearNum = date.getFullYear()

  return `${weekday}, ${dayNum} de ${monthName} ${yearNum}`
}

// Función para convertir fecha formateada de vuelta a ISO para almacenamiento
const parseSpanishDate = (formattedDate: string): string => {
  if (!formattedDate) return ""

  const regex = /(\w+), (\d+) de (\w+) (\d+)/
  const match = formattedDate.match(regex)

  if (!match) return ""

  const [, , day, monthName, year] = match
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ]
  const month = months.indexOf(monthName)

  if (month === -1) return ""

  const date = new Date(Number.parseInt(year), month, Number.parseInt(day))
  return date.toISOString().split("T")[0]
}

export default function OrderPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderData, setOrderData] = useLocalStorage<OrderData>("orderData", {
    dessertType: "",
    quantity: "1",
    peso: "",
    pesoCustom: "",
    mensaje: "",
    mensajeCustom: "",
    deliveryDate: "",
    deliveryTime: "",
    deliveryMode: "",
  })

  const handleFigurasDecorativasChange = useCallback(
    (figura: string, checked: boolean) => {
      setOrderData((prev) => ({
        ...prev,
        figurasDecorativas: checked
          ? [...(prev.figurasDecorativas || []), figura]
          : (prev.figurasDecorativas || []).filter((f) => f !== figura),
      }))
    },
    [setOrderData],
  )

  const handleImageUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return

    // Simulate image upload - in real app, upload to Supabase Storage
    const file = files[0]
    const imageUrl = `/placeholder.svg?height=300&width=400&text=${file.name}`
    setOrderData((prev) => ({ ...prev, imagenReferencia: imageUrl }))
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)

      try {
        // Validate required fields
        if (!orderData.dessertType || !orderData.quantity || !orderData.deliveryDate || !orderData.deliveryMode) {
          throw new Error("Por favor completa todos los campos requeridos")
        }

        // Check if client is already registered
        const clientData = localStorage.getItem("clientData")
        if (clientData) {
          router.push("/quotes")
        } else {
          router.push("/client-register")
        }
      } catch (error) {
        console.error("Error submitting order:", error)
        alert(error instanceof Error ? error.message : "Error al procesar el pedido")
      } finally {
        setIsSubmitting(false)
      }
    },
    [orderData, router],
  )

  const renderDessertSpecificFields = () => {
    switch (orderData.dessertType) {
      case "torta-clasica":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Opciones para Torta Clásica</h3>

            {/* Masa */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Masa</Label>
              <Select
                value={orderData.masa || ""}
                onValueChange={(value) => setOrderData((prev) => ({ ...prev, masa: value }))}
              >
                <SelectTrigger className="border-pink-200 focus:border-pink-400">
                  <SelectValue placeholder="Selecciona tipo de masa" />
                </SelectTrigger>
                <SelectContent>
                  {MASA_OPTIONS.map((masa) => (
                    <SelectItem key={masa.value} value={masa.value}>
                      {masa.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sabor */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Sabor</Label>
              <Select
                value={orderData.sabor || ""}
                onValueChange={(value) => setOrderData((prev) => ({ ...prev, sabor: value }))}
              >
                <SelectTrigger className="border-pink-200 focus:border-pink-400">
                  <SelectValue placeholder="Selecciona sabor" />
                </SelectTrigger>
                <SelectContent>
                  {SABOR_OPTIONS.map((sabor) => (
                    <SelectItem key={sabor.value} value={sabor.value}>
                      {sabor.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {orderData.sabor === "otro" && (
                <Input
                  placeholder="Especifica el sabor"
                  value={orderData.saborCustom || ""}
                  onChange={(e) => setOrderData((prev) => ({ ...prev, saborCustom: e.target.value }))}
                  className="border-pink-200 focus:border-pink-400"
                />
              )}
            </div>

            {/* Relleno */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Relleno</Label>
              <Select
                value={orderData.relleno || ""}
                onValueChange={(value) => setOrderData((prev) => ({ ...prev, relleno: value }))}
              >
                <SelectTrigger className="border-pink-200 focus:border-pink-400">
                  <SelectValue placeholder="Selecciona relleno" />
                </SelectTrigger>
                <SelectContent>
                  {RELLENO_OPTIONS.map((relleno) => (
                    <SelectItem key={relleno.value} value={relleno.value}>
                      {relleno.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {orderData.relleno === "otro" && (
                <Input
                  placeholder="Especifica el relleno"
                  value={orderData.rellenoCustom || ""}
                  onChange={(e) => setOrderData((prev) => ({ ...prev, rellenoCustom: e.target.value }))}
                  className="border-pink-200 focus:border-pink-400"
                />
              )}
            </div>
          </div>
        )

      case "torta-personalizada":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Opciones para Torta Personalizada</h3>

            {/* Masa */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Masa</Label>
              <Select
                value={orderData.masa || ""}
                onValueChange={(value) => setOrderData((prev) => ({ ...prev, masa: value }))}
              >
                <SelectTrigger className="border-pink-200 focus:border-pink-400">
                  <SelectValue placeholder="Selecciona tipo de masa" />
                </SelectTrigger>
                <SelectContent>
                  {MASA_OPTIONS.map((masa) => (
                    <SelectItem key={masa.value} value={masa.value}>
                      {masa.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Pisos */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Pisos</Label>
              <Select
                value={orderData.pisos || ""}
                onValueChange={(value) => setOrderData((prev) => ({ ...prev, pisos: value }))}
              >
                <SelectTrigger className="border-pink-200 focus:border-pink-400">
                  <SelectValue placeholder="Selecciona número de pisos" />
                </SelectTrigger>
                <SelectContent>
                  {PISOS_OPTIONS.map((piso) => (
                    <SelectItem key={piso.value} value={piso.value}>
                      {piso.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Forma */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Forma</Label>
              <Select
                value={orderData.forma || ""}
                onValueChange={(value) => setOrderData((prev) => ({ ...prev, forma: value }))}
              >
                <SelectTrigger className="border-pink-200 focus:border-pink-400">
                  <SelectValue placeholder="Selecciona forma" />
                </SelectTrigger>
                <SelectContent>
                  {FORMA_OPTIONS.map((forma) => (
                    <SelectItem key={forma.value} value={forma.value}>
                      {forma.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {orderData.forma === "otro" && (
                <Input
                  placeholder="Especifica la forma"
                  value={orderData.formaCustom || ""}
                  onChange={(e) => setOrderData((prev) => ({ ...prev, formaCustom: e.target.value }))}
                  className="border-pink-200 focus:border-pink-400"
                />
              )}
            </div>

            {/* Sabor */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Sabor</Label>
              <Select
                value={orderData.sabor || ""}
                onValueChange={(value) => setOrderData((prev) => ({ ...prev, sabor: value }))}
              >
                <SelectTrigger className="border-pink-200 focus:border-pink-400">
                  <SelectValue placeholder="Selecciona sabor" />
                </SelectTrigger>
                <SelectContent>
                  {SABOR_OPTIONS.map((sabor) => (
                    <SelectItem key={sabor.value} value={sabor.value}>
                      {sabor.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {orderData.sabor === "otro" && (
                <Input
                  placeholder="Especifica el sabor"
                  value={orderData.saborCustom || ""}
                  onChange={(e) => setOrderData((prev) => ({ ...prev, saborCustom: e.target.value }))}
                  className="border-pink-200 focus:border-pink-400"
                />
              )}
            </div>

            {/* Relleno */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Relleno</Label>
              <Select
                value={orderData.relleno || ""}
                onValueChange={(value) => setOrderData((prev) => ({ ...prev, relleno: value }))}
              >
                <SelectTrigger className="border-pink-200 focus:border-pink-400">
                  <SelectValue placeholder="Selecciona relleno" />
                </SelectTrigger>
                <SelectContent>
                  {RELLENO_OPTIONS.map((relleno) => (
                    <SelectItem key={relleno.value} value={relleno.value}>
                      {relleno.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {orderData.relleno === "otro" && (
                <Input
                  placeholder="Especifica el relleno"
                  value={orderData.rellenoCustom || ""}
                  onChange={(e) => setOrderData((prev) => ({ ...prev, rellenoCustom: e.target.value }))}
                  className="border-pink-200 focus:border-pink-400"
                />
              )}
            </div>

            {/* Cobertura */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Cobertura</Label>
              <Select
                value={orderData.cobertura || ""}
                onValueChange={(value) => setOrderData((prev) => ({ ...prev, cobertura: value }))}
              >
                <SelectTrigger className="border-pink-200 focus:border-pink-400">
                  <SelectValue placeholder="Selecciona cobertura" />
                </SelectTrigger>
                <SelectContent>
                  {COBERTURA_OPTIONS.map((cobertura) => (
                    <SelectItem key={cobertura.value} value={cobertura.value}>
                      {cobertura.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {orderData.cobertura === "otro" && (
                <Input
                  placeholder="Especifica la cobertura"
                  value={orderData.coberturaCustom || ""}
                  onChange={(e) => setOrderData((prev) => ({ ...prev, coberturaCustom: e.target.value }))}
                  className="border-pink-200 focus:border-pink-400"
                />
              )}
            </div>

            {/* Figuras Decorativas */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Figuras Decorativas</Label>
              <div className="grid md:grid-cols-2 gap-3">
                {FIGURAS_DECORATIVAS_OPTIONS.map((figura) => (
                  <div key={figura.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={figura.value}
                      checked={(orderData.figurasDecorativas || []).includes(figura.value)}
                      onCheckedChange={(checked) => handleFigurasDecorativasChange(figura.value, checked as boolean)}
                      className="border-pink-300"
                    />
                    <Label htmlFor={figura.value} className="text-gray-600 text-sm">
                      {figura.label}
                    </Label>
                  </div>
                ))}
              </div>
              {(orderData.figurasDecorativas || []).includes("otro") && (
                <Input
                  placeholder="Especifica las figuras decorativas"
                  value={orderData.figurasCustom || ""}
                  onChange={(e) => setOrderData((prev) => ({ ...prev, figurasCustom: e.target.value }))}
                  className="border-pink-200 focus:border-pink-400"
                />
              )}
            </div>

            {/* Descripción Adicional */}
            <div className="space-y-2">
              <Label htmlFor="descripcionAdicional" className="text-gray-700 font-medium">
                Descripción Adicional
              </Label>
              <Textarea
                id="descripcionAdicional"
                placeholder="Describe detalles adicionales para tu torta personalizada..."
                value={orderData.descripcionAdicional || ""}
                onChange={(e) => setOrderData((prev) => ({ ...prev, descripcionAdicional: e.target.value }))}
                className="border-pink-200 focus:border-pink-400"
              />
            </div>

            {/* Imagen de Referencia */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Imagen de Referencia</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
                className="border-pink-200 focus:border-pink-400"
              />
              {orderData.imagenReferencia && (
                <div className="mt-2">
                  <img
                    src={orderData.imagenReferencia || "/placeholder.svg"}
                    alt="Imagen de referencia"
                    className="w-32 h-32 object-cover rounded border border-pink-200"
                  />
                </div>
              )}
            </div>
          </div>
        )

      case "torta-helada":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Opciones para Torta Helada</h3>

            {/* Sabor Torta */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Sabor Torta</Label>
              <Select
                value={orderData.saborTorta || ""}
                onValueChange={(value) => setOrderData((prev) => ({ ...prev, saborTorta: value }))}
              >
                <SelectTrigger className="border-pink-200 focus:border-pink-400">
                  <SelectValue placeholder="Selecciona sabor de torta" />
                </SelectTrigger>
                <SelectContent>
                  {SABOR_OPTIONS.map((sabor) => (
                    <SelectItem key={sabor.value} value={sabor.value}>
                      {sabor.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {orderData.saborTorta === "otro" && (
                <Input
                  placeholder="Especifica el sabor de torta"
                  value={orderData.saborTortaCustom || ""}
                  onChange={(e) => setOrderData((prev) => ({ ...prev, saborTortaCustom: e.target.value }))}
                  className="border-pink-200 focus:border-pink-400"
                />
              )}
            </div>

            {/* Sabor Gelatina */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Sabor Gelatina</Label>
              <Select
                value={orderData.saborGelatina || ""}
                onValueChange={(value) => setOrderData((prev) => ({ ...prev, saborGelatina: value }))}
              >
                <SelectTrigger className="border-pink-200 focus:border-pink-400">
                  <SelectValue placeholder="Selecciona sabor de gelatina" />
                </SelectTrigger>
                <SelectContent>
                  {SABOR_GELATINA_OPTIONS.map((sabor) => (
                    <SelectItem key={sabor.value} value={sabor.value}>
                      {sabor.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {orderData.saborGelatina === "otro" && (
                <Input
                  placeholder="Especifica el sabor de gelatina"
                  value={orderData.saborGelatinaCustom || ""}
                  onChange={(e) => setOrderData((prev) => ({ ...prev, saborGelatinaCustom: e.target.value }))}
                  className="border-pink-200 focus:border-pink-400"
                />
              )}
            </div>
          </div>
        )

      case "pie":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Opciones para Pie</h3>

            {/* Sabor */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Sabor</Label>
              <Select
                value={orderData.saborPie || ""}
                onValueChange={(value) => setOrderData((prev) => ({ ...prev, saborPie: value }))}
              >
                <SelectTrigger className="border-pink-200 focus:border-pink-400">
                  <SelectValue placeholder="Selecciona sabor" />
                </SelectTrigger>
                <SelectContent>
                  {SABOR_PIE_OPTIONS.map((sabor) => (
                    <SelectItem key={sabor.value} value={sabor.value}>
                      {sabor.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {orderData.saborPie === "otro" && (
                <Input
                  placeholder="Especifica el sabor"
                  value={orderData.saborPieCustom || ""}
                  onChange={(e) => setOrderData((prev) => ({ ...prev, saborPieCustom: e.target.value }))}
                  className="border-pink-200 focus:border-pink-400"
                />
              )}
            </div>
          </div>
        )

      case "torta-tres-leches":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Opciones para Torta Tres Leches</h3>

            {/* Sabor Torta */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Sabor Torta</Label>
              <Select
                value={orderData.saborTorta || ""}
                onValueChange={(value) => setOrderData((prev) => ({ ...prev, saborTorta: value }))}
              >
                <SelectTrigger className="border-pink-200 focus:border-pink-400">
                  <SelectValue placeholder="Selecciona sabor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vainilla">Vainilla</SelectItem>
                  <SelectItem value="chocolate">Chocolate</SelectItem>
                  <SelectItem value="otro">Otro (especificar)</SelectItem>
                </SelectContent>
              </Select>
              {orderData.saborTorta === "otro" && (
                <Input
                  placeholder="Especifica el sabor"
                  value={orderData.saborTortaCustom || ""}
                  onChange={(e) => setOrderData((prev) => ({ ...prev, saborTortaCustom: e.target.value }))}
                  className="border-pink-200 focus:border-pink-400"
                />
              )}
            </div>
          </div>
        )

      case "cheesecake":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Opciones para Cheesecake</h3>

            {/* Sabor */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Sabor</Label>
              <Select
                value={orderData.saborCheesecake || ""}
                onValueChange={(value) => setOrderData((prev) => ({ ...prev, saborCheesecake: value }))}
              >
                <SelectTrigger className="border-pink-200 focus:border-pink-400">
                  <SelectValue placeholder="Selecciona sabor" />
                </SelectTrigger>
                <SelectContent>
                  {SABOR_CHEESECAKE_OPTIONS.map((sabor) => (
                    <SelectItem key={sabor.value} value={sabor.value}>
                      {sabor.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {orderData.saborCheesecake === "otro" && (
                <Input
                  placeholder="Especifica el sabor"
                  value={orderData.saborCheesecakeCustom || ""}
                  onChange={(e) => setOrderData((prev) => ({ ...prev, saborCheesecakeCustom: e.target.value }))}
                  className="border-pink-200 focus:border-pink-400"
                />
              )}
            </div>
          </div>
        )

      case "empanadas":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Opciones para Empanadas</h3>

            {/* Sabor */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Sabor</Label>
              <Select
                value={orderData.saborEmpanadas || ""}
                onValueChange={(value) => setOrderData((prev) => ({ ...prev, saborEmpanadas: value }))}
              >
                <SelectTrigger className="border-pink-200 focus:border-pink-400">
                  <SelectValue placeholder="Selecciona sabor" />
                </SelectTrigger>
                <SelectContent>
                  {SABOR_EMPANADAS_OPTIONS.map((sabor) => (
                    <SelectItem key={sabor.value} value={sabor.value}>
                      {sabor.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tamaño */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Tamaño</Label>
              <Select
                value={orderData.tamañoEmpanadas || ""}
                onValueChange={(value) => setOrderData((prev) => ({ ...prev, tamañoEmpanadas: value }))}
              >
                <SelectTrigger className="border-pink-200 focus:border-pink-400">
                  <SelectValue placeholder="Selecciona tamaño" />
                </SelectTrigger>
                <SelectContent>
                  {TAMAÑO_EMPANADAS_OPTIONS.map((tamaño) => (
                    <SelectItem key={tamaño.value} value={tamaño.value}>
                      {tamaño.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Relleno */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Relleno</Label>
              <Select
                value={orderData.rellenoEmpanadas || ""}
                onValueChange={(value) => setOrderData((prev) => ({ ...prev, rellenoEmpanadas: value }))}
              >
                <SelectTrigger className="border-pink-200 focus:border-pink-400">
                  <SelectValue placeholder="Selecciona relleno" />
                </SelectTrigger>
                <SelectContent>
                  {RELLENO_EMPANADAS_OPTIONS.map((relleno) => (
                    <SelectItem key={relleno.value} value={relleno.value}>
                      {relleno.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {orderData.rellenoEmpanadas === "otro" && (
                <Input
                  placeholder="Especifica el relleno"
                  value={orderData.rellenoEmpanadaCustom || ""}
                  onChange={(e) => setOrderData((prev) => ({ ...prev, rellenoEmpanadaCustom: e.target.value }))}
                  className="border-pink-200 focus:border-pink-400"
                />
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const shouldShowPeso = () => {
    return !["alfajores", "trufas", "donas", "brownies", "empanadas"].includes(orderData.dessertType)
  }

  const shouldShowMensaje = () => {
    return !["alfajores", "trufas", "donas", "brownies", "empanadas"].includes(orderData.dessertType)
  }

  const getPesoOptions = () => {
    if (["pie", "cheesecake"].includes(orderData.dessertType)) {
      return PESO_OPTIONS_SMALL
    }
    return PESO_OPTIONS
  }

  return (
    <ErrorBoundary>
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
              <CardTitle className="text-2xl text-gray-800">Personaliza tu Postre Perfecto</CardTitle>
              <p className="text-gray-600">Completa los detalles y recibe cotizaciones de las mejores pastelerías</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dessert Type */}
                <div className="space-y-2">
                  <Label htmlFor="dessertType" className="text-gray-700 font-medium">
                    Tipo de Postre *
                  </Label>
                  <Select
                    value={orderData.dessertType}
                    onValueChange={(value) => setOrderData((prev) => ({ ...prev, dessertType: value }))}
                  >
                    <SelectTrigger className="border-pink-200 focus:border-pink-400">
                      <SelectValue placeholder="Selecciona el tipo de postre" />
                    </SelectTrigger>
                    <SelectContent>
                      {DESSERT_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-gray-700 font-medium">
                    Cantidad *
                  </Label>
                  <Select
                    value={orderData.quantity}
                    onValueChange={(value) => setOrderData((prev) => ({ ...prev, quantity: value }))}
                  >
                    <SelectTrigger className="border-pink-200 focus:border-pink-400">
                      <SelectValue placeholder="Selecciona la cantidad" />
                    </SelectTrigger>
                    <SelectContent>
                      {QUANTITY_OPTIONS.map((qty) => (
                        <SelectItem key={qty.value} value={qty.value}>
                          {qty.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Dessert Specific Fields */}
                {orderData.dessertType && renderDessertSpecificFields()}

                {/* Peso (conditional) */}
                {shouldShowPeso() && (
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Peso</Label>
                    <Select
                      value={orderData.peso}
                      onValueChange={(value) => setOrderData((prev) => ({ ...prev, peso: value }))}
                    >
                      <SelectTrigger className="border-pink-200 focus:border-pink-400">
                        <SelectValue placeholder="Selecciona el peso" />
                      </SelectTrigger>
                      <SelectContent>
                        {getPesoOptions().map((peso) => (
                          <SelectItem key={peso.value} value={peso.value}>
                            {peso.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {orderData.peso === "otro" && (
                      <Input
                        placeholder="Especifica el peso"
                        value={orderData.pesoCustom}
                        onChange={(e) => setOrderData((prev) => ({ ...prev, pesoCustom: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400"
                      />
                    )}
                  </div>
                )}

                {/* Mensaje (conditional) */}
                {shouldShowMensaje() && (
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">Mensaje</Label>
                    <Select
                      value={orderData.mensaje}
                      onValueChange={(value) => setOrderData((prev) => ({ ...prev, mensaje: value }))}
                    >
                      <SelectTrigger className="border-pink-200 focus:border-pink-400">
                        <SelectValue placeholder="Selecciona mensaje" />
                      </SelectTrigger>
                      <SelectContent>
                        {MENSAJE_OPTIONS.map((mensaje) => (
                          <SelectItem key={mensaje.value} value={mensaje.value}>
                            {mensaje.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {orderData.mensaje === "otro" && (
                      <Input
                        placeholder="Especifica el mensaje"
                        value={orderData.mensajeCustom}
                        onChange={(e) => setOrderData((prev) => ({ ...prev, mensajeCustom: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400"
                      />
                    )}
                  </div>
                )}

                {/* Delivery Date and Time */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryDate" className="text-gray-700 font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Fecha de Entrega *
                    </Label>
                    <div className="flex flex-col gap-2">
                      <Input
                        id="deliveryDate"
                        type="date"
                        value={orderData.deliveryDate}
                        onChange={(e) => {
                          const newDate = e.target.value
                          setOrderData((prev) => ({ ...prev, deliveryDate: newDate }))
                        }}
                        className="border-pink-200 focus:border-pink-400"
                        min={new Date().toISOString().split("T")[0]}
                      />
                      {orderData.deliveryDate && (
                        <div className="text-sm text-gray-600 italic">
                          {formatDateToSpanish(orderData.deliveryDate)}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* En la sección del selector de hora, reemplazar todo el bloque con: */}
                  <div className="space-y-2">
                    <Label htmlFor="deliveryTime" className="text-gray-700 font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Hora de Entrega
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Select
                        value={orderData.deliveryTime ? orderData.deliveryTime.split(":")[0] : ""}
                        onValueChange={(hour) => {
                          // No usar padStart aquí, mantener el valor tal cual
                          const currentMinutes = orderData.deliveryTime
                            ? orderData.deliveryTime.split(":")[1]?.split(" ")[0] || "00"
                            : "00"
                          const currentAmPm = orderData.deliveryTime
                            ? orderData.deliveryTime.includes("PM")
                              ? "PM"
                              : "AM"
                            : "AM"
                          setOrderData((prev) => ({
                            ...prev,
                            deliveryTime: `${hour}:${currentMinutes} ${currentAmPm}`,
                          }))
                        }}
                      >
                        <SelectTrigger className="border-pink-200 focus:border-pink-400">
                          <SelectValue placeholder="Hora" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => {
                            const hourValue = (i + 1).toString()
                            return (
                              <SelectItem key={hourValue} value={hourValue}>
                                {hourValue.padStart(2, "0")}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>

                      <Select
                        value={orderData.deliveryTime ? orderData.deliveryTime.split(":")[1]?.split(" ")[0] || "" : ""}
                        onValueChange={(minutes) => {
                          const currentHour = orderData.deliveryTime
                            ? orderData.deliveryTime.split(":")[0] || "12"
                            : "12"
                          const currentAmPm = orderData.deliveryTime
                            ? orderData.deliveryTime.includes("PM")
                              ? "PM"
                              : orderData.deliveryTime.includes("AM")
                                ? "AM"
                                : ""
                            : "AM"
                          setOrderData((prev) => ({
                            ...prev,
                            deliveryTime: `${currentHour}:${minutes} ${currentAmPm}`,
                          }))
                        }}
                      >
                        <SelectTrigger className="border-pink-200 focus:border-pink-400">
                          <SelectValue placeholder="Min" />
                        </SelectTrigger>
                        <SelectContent>
                          {["00", "15", "30", "45"].map((minute) => (
                            <SelectItem key={minute} value={minute}>
                              {minute}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={
                          orderData.deliveryTime
                            ? orderData.deliveryTime.includes("PM")
                              ? "PM"
                              : orderData.deliveryTime.includes("AM")
                                ? "AM"
                                : ""
                            : ""
                        }
                        onValueChange={(ampm) => {
                          const currentHour = orderData.deliveryTime
                            ? orderData.deliveryTime.split(":")[0] || "12"
                            : "12"
                          const currentMinutes = orderData.deliveryTime
                            ? orderData.deliveryTime.split(":")[1]?.split(" ")[0] || "00"
                            : "00"
                          setOrderData((prev) => ({
                            ...prev,
                            deliveryTime: `${currentHour}:${currentMinutes} ${ampm}`,
                          }))
                        }}
                      >
                        <SelectTrigger className="border-pink-200 focus:border-pink-400">
                          <SelectValue placeholder="AM/PM" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AM">AM</SelectItem>
                          <SelectItem value="PM">PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {orderData.deliveryTime && (
                      <div className="text-sm text-gray-600 italic">Hora seleccionada: {orderData.deliveryTime}</div>
                    )}
                  </div>
                </div>

                {/* Delivery Mode */}
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Modo de Entrega *
                  </Label>
                  <RadioGroup
                    value={orderData.deliveryMode}
                    onValueChange={(value) => setOrderData((prev) => ({ ...prev, deliveryMode: value }))}
                    className="flex flex-col space-y-2"
                  >
                    {DELIVERY_MODE_OPTIONS.map((mode) => (
                      <div key={mode.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={mode.value} id={mode.value} />
                        <Label htmlFor={mode.value} className="flex items-center gap-2">
                          {mode.value === "pickup" ? (
                            <Store className="w-4 h-4 text-pink-400" />
                          ) : (
                            <Home className="w-4 h-4 text-pink-400" />
                          )}
                          {mode.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white py-3 text-lg font-medium disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Procesando...
                    </>
                  ) : (
                    "Solicitar Cotizaciones"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </ErrorBoundary>
  )
}
