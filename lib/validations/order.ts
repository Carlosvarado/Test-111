import * as z from "zod"

export const orderSchema = z.object({
  dessertType: z.string().min(1, "Selecciona un tipo de postre"),
  quantity: z.string().min(1, "Selecciona una cantidad"),
  peso: z.string().optional(),
  pesoCustom: z.string().optional(),
  mensaje: z.string().optional(),
  mensajeCustom: z.string().optional(),
  deliveryDate: z.string().min(1, "Selecciona una fecha de entrega"),
  deliveryTime: z.string().min(1, "Selecciona una hora de entrega"),
  deliveryMode: z.string().min(1, "Selecciona un modo de entrega"),
  // Add more validations as needed
})

export type OrderFormData = z.infer<typeof orderSchema>