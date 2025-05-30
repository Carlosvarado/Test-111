import { memo } from "react"
import { ChefHat, Star, Clock, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

const iconMap = {
  ChefHat: ChefHat,
  Star: Star,
  Clock: Clock,
  Shield: Shield,
}

const colorMap = {
  ChefHat: "text-pink-400",
  Star: "text-purple-400",
  Clock: "text-blue-400",
  Shield: "text-green-400",
}

export const FeatureCard = memo(function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap]
  const iconColor = colorMap[icon as keyof typeof colorMap]

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-pink-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6 text-center">
        <div className="mb-4 flex justify-center">
          <IconComponent className={`w-8 h-8 ${iconColor}`} />
        </div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
})
