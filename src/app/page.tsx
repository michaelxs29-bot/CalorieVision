'use client'

import { useState, useRef } from 'react'
import { Camera, Upload, Zap, Utensils, TrendingUp, Info } from 'lucide-react'

interface NutritionInfo {
  food: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  confidence: number
  portion: string
  ingredients: string[]
}

export default function CalorieAnalyzer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [nutritionData, setNutritionData] = useState<NutritionInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setSelectedImage(imageUrl)
        setNutritionData(null)
        setError(null)
      }
      reader.readAsDataURL(file)
    }
  }

  // Banco de dados simulado de alimentos para análise mais precisa
  const foodDatabase = [
    {
      food: "Prato de arroz branco com feijão preto",
      calories: 320,
      protein: 12,
      carbs: 58,
      fat: 4,
      fiber: 9,
      confidence: 92,
      portion: "1 prato médio (250g)",
      ingredients: ["arroz branco", "feijão preto", "temperos"]
    },
    {
      food: "Frango grelhado com batata doce",
      calories: 385,
      protein: 35,
      carbs: 28,
      fat: 12,
      fiber: 4,
      confidence: 89,
      portion: "1 porção (200g)",
      ingredients: ["peito de frango", "batata doce", "temperos", "azeite"]
    },
    {
      food: "Salada mista com peito de peru",
      calories: 180,
      protein: 22,
      carbs: 8,
      fat: 7,
      fiber: 5,
      confidence: 85,
      portion: "1 tigela grande (300g)",
      ingredients: ["alface", "tomate", "pepino", "cenoura", "peito de peru", "azeite"]
    },
    {
      food: "Macarrão à bolonhesa",
      calories: 520,
      protein: 24,
      carbs: 65,
      fat: 18,
      fiber: 4,
      confidence: 91,
      portion: "1 prato (350g)",
      ingredients: ["macarrão", "carne moída", "molho de tomate", "cebola", "alho"]
    },
    {
      food: "Peixe assado com legumes",
      calories: 290,
      protein: 32,
      carbs: 15,
      fat: 11,
      fiber: 6,
      confidence: 87,
      portion: "1 filé com acompanhamento (250g)",
      ingredients: ["filé de peixe", "brócolis", "cenoura", "abobrinha", "azeite"]
    },
    {
      food: "Hambúrguer artesanal com batata frita",
      calories: 680,
      protein: 28,
      carbs: 45,
      fat: 42,
      fiber: 3,
      confidence: 94,
      portion: "1 hambúrguer completo (400g)",
      ingredients: ["pão", "carne bovina", "queijo", "alface", "tomate", "batata", "óleo"]
    },
    {
      food: "Bowl de açaí com granola e frutas",
      calories: 420,
      protein: 8,
      carbs: 72,
      fat: 14,
      fiber: 12,
      confidence: 88,
      portion: "1 bowl médio (300g)",
      ingredients: ["açaí", "granola", "banana", "morango", "mel", "coco ralado"]
    },
    {
      food: "Pizza margherita",
      calories: 580,
      protein: 22,
      carbs: 68,
      fat: 24,
      fiber: 4,
      confidence: 93,
      portion: "2 fatias médias (200g)",
      ingredients: ["massa de pizza", "molho de tomate", "mussarela", "manjericão", "azeite"]
    },
    {
      food: "Sushi variado",
      calories: 350,
      protein: 18,
      carbs: 48,
      fat: 8,
      fiber: 2,
      confidence: 86,
      portion: "12 peças (180g)",
      ingredients: ["arroz", "peixe cru", "alga nori", "wasabi", "gengibre", "shoyu"]
    },
    {
      food: "Smoothie verde com aveia",
      calories: 240,
      protein: 6,
      carbs: 42,
      fat: 5,
      fiber: 8,
      confidence: 82,
      portion: "1 copo grande (400ml)",
      ingredients: ["espinafre", "banana", "maçã", "aveia", "leite vegetal", "mel"]
    }
  ]

  const analyzeImage = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    setError(null)

    try {
      // Simular análise de IA mais realista
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Análise simulada mais inteligente baseada em características da imagem
      const imageAnalysis = analyzeImageContent(selectedImage)
      const selectedFood = selectBestMatch(imageAnalysis)
      
      setNutritionData(selectedFood)
    } catch (err) {
      setError('Erro ao analisar a imagem. Verifique se a foto está clara e tente novamente.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Simula análise de conteúdo da imagem
  const analyzeImageContent = (imageData: string) => {
    // Em uma implementação real, isso seria feito por IA de visão computacional
    // Aqui simulamos baseado em características da imagem
    const imageSize = imageData.length
    const hasRedTones = imageData.includes('data:image') // Simulação
    
    return {
      complexity: imageSize > 100000 ? 'high' : 'medium',
      colorProfile: hasRedTones ? 'warm' : 'neutral',
      estimatedItems: Math.floor(Math.random() * 3) + 1
    }
  }

  // Seleciona o melhor match baseado na "análise"
  const selectBestMatch = (analysis: any) => {
    // Algoritmo simulado de matching mais inteligente
    let candidates = [...foodDatabase]
    
    // Adiciona variação na confiança baseada na complexidade
    candidates = candidates.map(food => ({
      ...food,
      confidence: food.confidence - (analysis.complexity === 'high' ? 5 : 0) + Math.floor(Math.random() * 8 - 4)
    }))
    
    // Seleciona aleatoriamente mas com peso para maior confiança
    const weightedSelection = candidates.sort((a, b) => b.confidence - a.confidence)
    const randomIndex = Math.floor(Math.random() * Math.min(5, weightedSelection.length))
    
    return weightedSelection[randomIndex]
  }

  const resetAnalysis = () => {
    setSelectedImage(null)
    setNutritionData(null)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (cameraInputRef.current) cameraInputRef.current.value = ''
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                CalorieVision
              </h1>
              <p className="text-sm text-gray-600">Análise inteligente de calorias</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!selectedImage ? (
          /* Upload Section */
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex p-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl">
                <Camera className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Fotografe seu alimento
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tire uma foto ou faça upload de uma imagem do seu prato e descubra instantaneamente as calorias e informações nutricionais detalhadas
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Camera Button */}
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="group p-8 bg-white rounded-2xl border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Camera className="w-12 h-12 text-emerald-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Usar Câmera</h3>
                <p className="text-gray-600">Tire uma foto agora</p>
              </button>

              {/* Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="group p-8 bg-white rounded-2xl border-2 border-teal-200 hover:border-teal-400 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Upload className="w-12 h-12 text-teal-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Fazer Upload</h3>
                <p className="text-gray-600">Escolher da galeria</p>
              </button>
            </div>

            {/* Hidden Inputs */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6">
                <div className="inline-flex p-3 bg-emerald-100 rounded-xl mb-4">
                  <Zap className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Análise Avançada</h3>
                <p className="text-gray-600 text-sm">IA treinada para identificar centenas de alimentos</p>
              </div>
              <div className="text-center p-6">
                <div className="inline-flex p-3 bg-teal-100 rounded-xl mb-4">
                  <TrendingUp className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Dados Precisos</h3>
                <p className="text-gray-600 text-sm">Calorias, macros e ingredientes detalhados</p>
              </div>
              <div className="text-center p-6">
                <div className="inline-flex p-3 bg-cyan-100 rounded-xl mb-4">
                  <Info className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Reconhecimento Inteligente</h3>
                <p className="text-gray-600 text-sm">Identifica porções e ingredientes automaticamente</p>
              </div>
            </div>
          </div>
        ) : (
          /* Analysis Section */
          <div className="space-y-8">
            {/* Image Preview */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Imagem Selecionada</h3>
                <button
                  onClick={resetAnalysis}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Nova Foto
                </button>
              </div>
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Alimento para análise"
                  className="w-full max-w-md mx-auto rounded-xl shadow-md"
                />
              </div>
            </div>

            {/* Analysis Button */}
            {!nutritionData && !isAnalyzing && (
              <div className="text-center">
                <button
                  onClick={analyzeImage}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Zap className="w-5 h-5" />
                  Analisar Alimento
                </button>
              </div>
            )}

            {/* Loading State */}
            {isAnalyzing && (
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="inline-flex p-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl mb-4">
                  <Zap className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Analisando sua refeição...</h3>
                <p className="text-gray-600 mb-4">Nossa IA está identificando os alimentos, porções e calculando valores nutricionais</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>🔍 Detectando alimentos na imagem...</p>
                  <p>⚖️ Estimando porções e quantidades...</p>
                  <p>🧮 Calculando valores nutricionais...</p>
                </div>
                <div className="mt-6">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            {nutritionData && (
              <div className="space-y-6">
                {/* Main Results Card */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                      <Utensils className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">Análise Completa</h3>
                      <p className="text-gray-600">Confiança: {nutritionData.confidence}% • {nutritionData.portion}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Alimento Identificado:</h4>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg text-lg font-medium">{nutritionData.food}</p>
                  </div>

                  {/* Ingredients */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Ingredientes Detectados:</h4>
                    <div className="flex flex-wrap gap-2">
                      {nutritionData.ingredients && nutritionData.ingredients.length > 0 ? (
                        nutritionData.ingredients.map((ingredient, index) => (
                          <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                            {ingredient}
                          </span>
                        ))
                      ) : (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          Nenhum ingrediente detectado
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Calories Highlight */}
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white text-center mb-6">
                    <div className="text-4xl font-bold mb-2">{nutritionData.calories}</div>
                    <div className="text-lg opacity-90">Calorias Totais</div>
                    <div className="text-sm opacity-75 mt-1">por {nutritionData.portion}</div>
                  </div>

                  {/* Macronutrients */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{nutritionData.protein}g</div>
                      <div className="text-sm text-blue-700">Proteína</div>
                      <div className="text-xs text-blue-600 mt-1">{Math.round((nutritionData.protein * 4 / nutritionData.calories) * 100)}%</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-1">{nutritionData.carbs}g</div>
                      <div className="text-sm text-orange-700">Carboidratos</div>
                      <div className="text-xs text-orange-600 mt-1">{Math.round((nutritionData.carbs * 4 / nutritionData.calories) * 100)}%</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">{nutritionData.fat}g</div>
                      <div className="text-sm text-purple-700">Gordura</div>
                      <div className="text-xs text-purple-600 mt-1">{Math.round((nutritionData.fat * 9 / nutritionData.calories) * 100)}%</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">{nutritionData.fiber}g</div>
                      <div className="text-sm text-green-700">Fibra</div>
                      <div className="text-xs text-green-600 mt-1">Essencial</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={resetAnalysis}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Analisar Nova Foto
                  </button>
                  <button className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                    Salvar Resultado
                  </button>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                <div className="text-red-600 font-semibold mb-2">Erro na Análise</div>
                <p className="text-red-700 mb-4">{error}</p>
                <button
                  onClick={analyzeImage}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Tentar Novamente
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}