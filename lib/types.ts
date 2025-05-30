export interface OrderData {
  dessertType: string
  quantity: string

  // Campos comunes
  peso: string
  pesoCustom: string
  mensaje: string
  mensajeCustom: string

  // Torta Clásica
  masa?: string
  sabor?: string
  saborCustom?: string
  relleno?: string
  rellenoCustom?: string

  // Torta Personalizada
  pisos?: string
  forma?: string
  formaCustom?: string
  cobertura?: string
  coberturaCustom?: string
  figurasDecorativas?: string[]
  figurasCustom?: string
  descripcionAdicional?: string
  imagenReferencia?: string

  // Torta Helada
  saborTorta?: string
  saborTortaCustom?: string
  saborGelatina?: string
  saborGelatinaCustom?: string

  // Pie
  saborPie?: string
  saborPieCustom?: string

  // Cheesecake
  saborCheesecake?: string
  saborCheesecakeCustom?: string

  // Empanadas
  rellenoEmpanadas?: string
  rellenoEmpanadaCustom?: string
  saborEmpanadas?: string
  tamañoEmpanadas?: string

  // Fecha y hora
  deliveryDate: string
  deliveryTime: string

  // Modo de entrega
  deliveryMode: string
}

export interface ClientData {
  name: string
  email: string
  phone: string
  address: string
}

export interface BakeryData {
  name: string
  email: string
  phone: string
  address: string
  description: string
  specialties: string[]
  alertMethods: string[]
  experience: string
  responsibleFirstName: string
  responsibleLastName: string
  paymentMethods: string[]
  yapePhone: string
  plinPhone: string
  bankAccount: string
  portfolioImages: string[]
  galleryImages: string[]
  whatsappAlerts: string
  emailAlerts: string
}

export interface Bakery {
  id: string
  name: string
  location: string
  rating: number
  reviews: number
  specialties: string[]
  price: number
  deliveryTime: string
  portfolioImages: string[]
  responsibleFirstName: string
  responsibleLastName: string
  description: string
  phone: string
  address: string
  paymentMethods: string[]
  yapePhone: string
  plinPhone: string
  bankAccount: string
  galleryImages: string[]
}

export interface RatingData {
  taste: number
  presentation: number
  punctuality: number
  comments: string
}

export interface PricingStructure {
  basePricePerKg: number
  floorMultiplier: number
  coveragePrices: {
    [key: string]: number
  }
  diabeticSurcharge: number
}
