import { atom, useAtom } from 'jotai'
import type { OrderFormData } from '@/lib/validations/order'

const orderAtom = atom<OrderFormData | null>(null)

export function useOrderStore() {
  const [order, setOrder] = useAtom(orderAtom)

  const updateOrder = (data: Partial<OrderFormData>) => {
    setOrder((prev) => ({
      ...prev,
      ...data,
    }))
  }

  return {
    order,
    setOrder,
    updateOrder,
  }
}