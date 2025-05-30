export const DESSERT_TYPES = [
  { value: "torta-clasica", label: "Torta Clásica" },
  { value: "torta-personalizada", label: "Torta Personalizada" },
  { value: "torta-tres-leches", label: "Torta Tres Leches" },
  { value: "torta-helada", label: "Torta Helada" },
  { value: "torta-selva-negra", label: "Torta Selva Negra" },
  { value: "torta-cafe", label: "Torta de Café" },
  { value: "torta-chocolate", label: "Torta de Chocolate" },
  { value: "torta-red-velvet", label: "Torta Red Velvet" },
  { value: "cheesecake", label: "Cheesecake" },
  { value: "torta-zanahoria", label: "Torta de Zanahoria" },
  { value: "torta-pina", label: "Torta de Piña" },
  { value: "torta-diabeticos", label: "Torta para Diabéticos" },
  { value: "pie", label: "Pie" },
  { value: "pionono", label: "Pionono" },
  { value: "alfajores", label: "Alfajores" },
  { value: "trufas", label: "Trufas" },
  { value: "donas", label: "Donas" },
  { value: "brownies", label: "Brownies" },
  { value: "empanadas", label: "Empanadas" },
] as const

export const QUANTITY_OPTIONS = Array.from({ length: 100 }, (_, i) => ({
  value: (i + 1).toString(),
  label: (i + 1).toString(),
}))

export const MASA_OPTIONS = [
  { value: "clasica", label: "Clásica" },
  { value: "bizcochuelo", label: "Bizcochuelo" },
] as const

export const SABOR_OPTIONS = [
  { value: "vainilla", label: "Vainilla" },
  { value: "naranja", label: "Naranja" },
  { value: "platano", label: "Plátano" },
  { value: "chocolate", label: "Chocolate" },
  { value: "otro", label: "Otro (especificar)" },
] as const

export const PESO_OPTIONS = [
  { value: "0.5", label: "1/2 Kg" },
  { value: "0.75", label: "3/4 Kg" },
  { value: "1", label: "1 Kg" },
  { value: "1.5", label: "1 1/2 Kg" },
  { value: "1.75", label: "1 3/4 Kg" },
  { value: "2", label: "2 Kg" },
  { value: "otro", label: "Otro (especificar)" },
] as const

export const PESO_OPTIONS_SMALL = [
  { value: "0.5", label: "1/2 Kg" },
  { value: "0.75", label: "3/4 Kg" },
  { value: "1", label: "1 Kg" },
  { value: "otro", label: "Otro (especificar)" },
] as const

export const RELLENO_OPTIONS = [
  { value: "sin-relleno", label: "Sin relleno" },
  { value: "manjar", label: "Manjar" },
  { value: "fudge", label: "Fudge" },
  { value: "almendras", label: "Almendras" },
  { value: "nueces", label: "Nueces" },
  { value: "pecanas", label: "Pecanas" },
  { value: "arandanos", label: "Arándanos" },
  { value: "coco-rallado", label: "Coco rallado" },
  { value: "chispas-chocolate", label: "Chispas de chocolate" },
  { value: "pasas", label: "Pasas" },
  { value: "otro", label: "Otro (especificar)" },
] as const

export const PISOS_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
] as const

export const FORMA_OPTIONS = [
  { value: "circular", label: "Circular" },
  { value: "circular-alta", label: "Circular Alta" },
  { value: "cuadrada", label: "Cuadrada" },
  { value: "cuadrada-alta", label: "Cuadrada Alta" },
  { value: "otro", label: "Otro (especificar)" },
] as const

export const COBERTURA_OPTIONS = [
  { value: "fondant", label: "Fondant" },
  { value: "chantilly", label: "Chantilly" },
  { value: "buttercream", label: "Buttercream" },
  { value: "otro", label: "Otro (especificar)" },
] as const

export const FIGURAS_DECORATIVAS_OPTIONS = [
  { value: "papel-comestible", label: "Papel comestible" },
  { value: "figuras-carton", label: "Figuras de cartón" },
  { value: "figuras-masa-comestible", label: "Figuras en masa comestible" },
  { value: "otro", label: "Otro (especificar)" },
] as const

export const MENSAJE_OPTIONS = [
  { value: "ninguno", label: "Ninguno" },
  { value: "feliz-cumpleanos", label: "Feliz Cumpleaños" },
  { value: "otro", label: "Otro (especificar)" },
] as const

export const SABOR_GELATINA_OPTIONS = [
  { value: "fresa", label: "Fresa" },
  { value: "naranja", label: "Naranja" },
  { value: "pina", label: "Piña" },
  { value: "otro", label: "Otro (especificar)" },
] as const

export const SABOR_PIE_OPTIONS = [
  { value: "limon", label: "Limón" },
  { value: "manzana", label: "Manzana" },
  { value: "otro", label: "Otro (especificar)" },
] as const

export const SABOR_CHEESECAKE_OPTIONS = [
  { value: "fresa", label: "Fresa" },
  { value: "maracuya", label: "Maracuyá" },
  { value: "chocolate", label: "Chocolate" },
  { value: "oreo", label: "Oreo" },
  { value: "otro", label: "Otro (especificar)" },
] as const

export const RELLENO_EMPANADAS_OPTIONS = [
  { value: "pollo", label: "Pollo" },
  { value: "carne", label: "Carne" },
  { value: "ninguno", label: "Ninguno" },
  { value: "otro", label: "Otro (especificar)" },
] as const

export const SABOR_EMPANADAS_OPTIONS = [
  { value: "saladas", label: "Saladas" },
  { value: "dulces", label: "Dulces" },
] as const

export const TAMAÑO_EMPANADAS_OPTIONS = [
  { value: "regular", label: "Regular" },
  { value: "mini", label: "Mini" },
] as const

export const DELIVERY_MODE_OPTIONS = [
  { value: "pickup", label: "Recoger en pastelería" },
  { value: "delivery", label: "Envío a domicilio" },
] as const

export const SPECIALTY_OPTIONS = [
  "Tortas Personalizadas",
  "Fondant",
  "Decoración Artística",
  "Ingredientes Orgánicos",
  "Sin Gluten",
  "Vegano",
  "Recetas Familiares",
  "Sabores Clásicos",
  "Ingredientes Importados",
  "Diseños Únicos",
] as const

export const PAYMENT_METHODS = [
  { value: "yape", label: "Yape" },
  { value: "plin", label: "Plin" },
  { value: "transferencia", label: "Transferencia Bancaria" },
] as const

export const FEATURES = [
  {
    icon: "ChefHat",
    title: "Pastelerías Verificadas",
    description:
      "Solo trabajamos con las mejores pastelerías de tu ciudad, todas verificadas y con excelente reputación.",
  },
  {
    icon: "Star",
    title: "Personalización Total",
    description: "Diseña tu postre exactamente como lo imaginas, desde el sabor hasta la decoración más pequeña.",
  },
  {
    icon: "Clock",
    title: "Entrega Puntual",
    description: "Garantizamos que tu postre llegue exactamente cuando lo necesitas, fresco y perfecto.",
  },
  {
    icon: "Shield",
    title: "Calidad Garantizada",
    description: "Sistema de calificaciones y reseñas que asegura la mejor experiencia en cada pedido.",
  },
] as const

export const TESTIMONIALS = [
  {
    name: "María González",
    text: "¡Increíble! Mi torta de cumpleaños quedó exactamente como la imaginé. El proceso fue súper fácil.",
    rating: 5,
    occasion: "Cumpleaños",
  },
  {
    name: "Carlos Rodríguez",
    text: "Perfecto para mi boda. Recibí cotizaciones de 5 pastelerías y elegí la mejor. Todo salió perfecto.",
    rating: 5,
    occasion: "Boda",
  },
  {
    name: "Ana Martínez",
    text: "Como diabética, encontrar postres deliciosos era difícil. Dulvana me conectó con la pastelería perfecta.",
    rating: 5,
    occasion: "Evento Especial",
  },
] as const

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Personaliza",
    description: "Describe tu postre ideal con todos los detalles que desees",
  },
  {
    number: "02",
    title: "Compara",
    description: "Recibe cotizaciones de múltiples pastelerías verificadas",
  },
  {
    number: "03",
    title: "Disfruta",
    description: "Recibe tu postre perfecto en la fecha y hora acordada",
  },
] as const
