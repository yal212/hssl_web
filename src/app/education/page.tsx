'use client'

import { motion } from 'framer-motion'
import { 
  Beaker, 
  Leaf, 
  Heart, 
  Recycle, 
  Droplets, 
  Shield, 
  Factory, 
  TreePine,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Sparkles
} from 'lucide-react'

export default function EducationPage() {
  const soapScienceSteps = [
    {
      icon: Beaker,
      title: '皂化反應',
      description: '油脂與鹼性物質（如氫氧化鈉）結合，產生肥皂和甘油的化學反應。',
      detail: '這是製皂的核心化學過程，需要精確的比例和溫度控制。'
    },
    {
      icon: Droplets,
      title: '乳化作用',
      description: '肥皂分子具有親水和親油的特性，能夠清除油污和污垢。',
      detail: '肥皂分子的雙親性結構使其能夠包圍油脂分子，形成微膠粒。'
    },
    {
      icon: Shield,
      title: '溫和清潔',
      description: '天然手工皂的pH值接近肌膚，提供溫和而有效的清潔。',
      detail: '相較於商業肥皂，手工皂保留天然甘油，對肌膚更加友善。'
    }
  ]

  const naturalIngredients = [
    {
      name: '橄欖油',
      benefits: ['滋潤保濕', '溫和清潔', '適合敏感肌膚'],
      color: 'from-green-400 to-green-600'
    },
    {
      name: '椰子油',
      benefits: ['豐富泡沫', '深層清潔', '抗菌特性'],
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: '乳木果油',
      benefits: ['深度滋養', '修復肌膚', '抗氧化'],
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      name: '薰衣草精油',
      benefits: ['舒緩放鬆', '天然香氛', '抗炎特性'],
      color: 'from-purple-400 to-purple-600'
    }
  ]

  const handmadeVsCommercial = [
    {
      aspect: '成分安全性',
      handmade: '天然植物油、精油、草本萃取，無刺激性化學添加劑',
      commercial: 'MIT/MI防腐劑、人工香料、SLES等可能引起過敏和刺激的化學成分',
      handmadeIcon: Shield,
      commercialIcon: AlertTriangle
    },
    {
      aspect: '環境分解性',
      handmade: '100%可生物分解，對水生生態無害',
      commercial: 'Polyquaternium-7、EDTA等難分解成分，造成環境累積',
      handmadeIcon: TreePine,
      commercialIcon: Factory
    },
    {
      aspect: '製程與品質',
      handmade: '冷製法保留天然甘油，溫和滋潤肌膚',
      commercial: '工業化生產移除甘油，添加合成界面活性劑強化清潔力',
      handmadeIcon: Heart,
      commercialIcon: Factory
    },
    {
      aspect: '長期健康影響',
      handmade: '溫和配方適合敏感肌膚，無累積性傷害',
      commercial: '長期使用可能導致皮膚屏障受損、過敏反應增加',
      handmadeIcon: Leaf,
      commercialIcon: AlertTriangle
    }
  ]

  const makingProcess = [
    {
      step: 1,
      title: '原料準備',
      description: '精選天然植物油脂和鹼性物質，確保品質和比例正確。'
    },
    {
      step: 2,
      title: '溫度控制',
      description: '將油脂和鹼液加熱至適當溫度，通常在40-50°C之間。'
    },
    {
      step: 3,
      title: '攪拌混合',
      description: '持續攪拌直到達到「trace」狀態，混合物開始變稠。'
    },
    {
      step: 4,
      title: '添加精油',
      description: '加入天然精油和其他添加物，如草本萃取或天然色素。'
    },
    {
      step: 5,
      title: '入模熟成',
      description: '倒入模具並靜置4-6週，讓皂化反應完全進行。'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              手工皂教育中心
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              深入了解手工皂製作的科學原理、天然成分的益處，以及我們如何透過永續實踐保護環境。
              讓我們一起學習創造更清潔、更綠色的未來。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Soap Science Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              手工皂的科學原理
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              了解手工皂如何工作，以及為什麼它比商業肥皂更有效且更溫和。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {soapScienceSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <p className="text-sm text-gray-500">{step.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Natural Ingredients Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              天然成分的力量
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我們精心挑選的天然成分，每一種都有其獨特的護膚益處和環保特性。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {naturalIngredients.map((ingredient, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-full h-32 bg-gradient-to-br ${ingredient.color} rounded-xl mb-6 flex items-center justify-center`}>
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{ingredient.name}</h3>
                <ul className="space-y-2">
                  {ingredient.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Soap Analysis Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              High School Soap Lab 沐浴乳分析
            </h2>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              市售清潔劑成分解說（避免揭露廠牌）
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              大容量、便宜實惠、香氣撲鼻、包裝漂亮
            </p>
          </motion.div>

          {/* Full Ingredient List - Moved to Top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <Lightbulb className="w-8 h-8 text-blue-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">原始成分清單</h3>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <p className="text-sm text-gray-600 mb-4">以下為典型市售沐浴乳的完整成分清單：</p>
              <div className="bg-white rounded-xl p-6 border border-blue-200">
                <div className="text-sm text-gray-800 leading-relaxed font-mono select-all">
                  Water, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Sodium Chloride,
                  Cocamide Methyl MEA, Fragrance, Polyquaternium-7, Citric Acid,
                  Methylchloroisothiazolinone, Methylisothiazolinone, Phenoxyethanol,
                  Benzyl Alcohol, Disodium EDTA, Sodium Benzoate, CI 19140, CI 42090
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                * 此成分清單僅供教育用途，不針對特定品牌。點擊上方文字可選取複製。
              </p>
            </div>
          </motion.div>

          {/* Potential Allergens Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <AlertTriangle className="w-8 h-8 text-orange-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">潛在過敏或刺激性成分</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Fragrance（香料）',
                  function: '香味',
                  reactions: '皮膚刺激、接觸性皮膚炎、氣喘誘發',
                  notes: '即使是天然香料也可能過敏'
                },
                {
                  name: 'Methylchloroisothiazolinone / Methylisothiazolinone (MIT/MI)',
                  function: '防腐劑',
                  reactions: '強烈過敏、紅疹、搔癢、濕疹',
                  notes: '歐盟已禁用於免沖洗產品'
                },
                {
                  name: 'Cocamidopropyl Betaine',
                  function: '起泡',
                  reactions: '接觸性皮膚炎',
                  notes: '源自椰子油但可能含有副產物造成過敏'
                },
                {
                  name: 'Phenoxyethanol',
                  function: '防腐劑',
                  reactions: '眼睛與皮膚刺激',
                  notes: '相對溫和，但仍具風險'
                },
                {
                  name: 'Benzyl Alcohol',
                  function: '防腐劑 / 香料成分',
                  reactions: '紅腫、癢感、微弱致敏性',
                  notes: '常見於香水和化妝品中'
                }
              ].map((ingredient, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200"
                >
                  <h4 className="font-bold text-gray-900 mb-3 text-sm leading-tight">{ingredient.name}</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-semibold text-orange-700">功能：</span>
                      <span className="text-xs text-gray-700">{ingredient.function}</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-red-700">反應：</span>
                      <span className="text-xs text-gray-700">{ingredient.reactions}</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-700">備註：</span>
                      <span className="text-xs text-gray-600">{ingredient.notes}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Environmentally Persistent Ingredients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <Factory className="w-8 h-8 text-red-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">可能不易分解的成分</h3>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8">
              <div className="space-y-6">
                {[
                  {
                    name: 'Sodium Laureth Sulfate (SLES)',
                    category: '合成界面活性劑',
                    notes: '易造成水體泡沫堆積，有水生毒性'
                  },
                  {
                    name: 'Cocamide Methyl MEA',
                    category: '非離子界面活性劑',
                    notes: '合成胺類，清潔效果好，但生物可分解性低'
                  },
                  {
                    name: 'Polyquaternium-7',
                    category: '聚合物',
                    notes: '抗靜電增稠，但在自然中幾乎不可生物分解'
                  },
                  {
                    name: 'Methylchloroisothiazolinone / Methylisothiazolinone',
                    category: '防腐劑',
                    notes: '難分解且具水生毒性'
                  },
                  {
                    name: 'Disodium EDTA',
                    category: '螯合劑',
                    notes: '難被微生物分解，會造成環境中金屬離子累積'
                  }
                ].map((ingredient, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 border border-red-200"
                  >
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">{ingredient.name}</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-red-700">類別：</span>
                          <span className="text-sm text-gray-700">{ingredient.category}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                          <span className="text-sm font-semibold text-gray-700">備註：</span>
                          <span className="text-sm text-gray-600">{ingredient.notes}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Handmade vs Commercial Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              手工皂 vs 商業清潔劑
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              了解手工皂與商業清潔劑的差異，為什麼選擇天然手工皂對您和環境都更好。
            </p>
          </motion.div>

          <div className="space-y-8">
            {handmadeVsCommercial.map((comparison, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{comparison.aspect}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Handmade */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                        <comparison.handmadeIcon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-green-800">天然手工皂</h4>
                    </div>
                    <p className="text-gray-700">{comparison.handmade}</p>
                  </div>

                  {/* Commercial */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center mr-4">
                        <comparison.commercialIcon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-800">商業清潔劑</h4>
                    </div>
                    <p className="text-gray-700">{comparison.commercial}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Soap Making Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              手工皂製作過程
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              跟隨我們的製皂步驟，了解如何將天然成分轉化為溫和有效的清潔產品。
            </p>
          </motion.div>

          <div className="relative">
            {/* Process Steps */}
            <div className="space-y-8">
              {makingProcess.map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="flex-1">
                    <div className={`bg-white rounded-2xl p-8 shadow-lg ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                          {process.step}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{process.title}</h3>
                      </div>
                      <p className="text-gray-600">{process.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              環境保護與永續實踐
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              了解我們如何透過手工皂製作實踐環保理念，以及您的選擇如何為地球帶來正面影響。
            </p>
          </motion.div>

          {/* Environmental Problems */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 mb-12"
          >
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">商業肥皂的環境問題</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-2">化學污染</h4>
                <p className="text-gray-600 text-sm">合成界面活性劑和磷酸鹽污染水道，破壞水生生態系統。</p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-2">過度包裝</h4>
                <p className="text-gray-600 text-sm">塑膠包裝和一次性容器增加垃圾填埋場負擔。</p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-2">碳足跡</h4>
                <p className="text-gray-600 text-sm">大規模工業生產和長距離運輸產生大量溫室氣體。</p>
              </div>
            </div>
          </motion.div>

          {/* Our Eco-Friendly Practices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-12"
          >
            <div className="flex items-center mb-6">
              <TreePine className="w-8 h-8 text-green-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">我們的環保實踐</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">100% 天然成分</h4>
                    <p className="text-gray-600 text-sm">使用有機植物油和天然精油，完全可生物分解。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">最小包裝設計</h4>
                    <p className="text-gray-600 text-sm">使用可回收紙材包裝，避免不必要的塑膠使用。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">本地採購</h4>
                    <p className="text-gray-600 text-sm">優先選擇本地供應商，減少運輸碳足跡。</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">零廢料生產</h4>
                    <p className="text-gray-600 text-sm">回收利用所有生產過程中的副產品和材料。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">教育推廣</h4>
                    <p className="text-gray-600 text-sm">透過工作坊和教育活動推廣環保意識。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">慈善回饋</h4>
                    <p className="text-gray-600 text-sm">將利潤捐贈給環保組織，擴大正面影響。</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Impact Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">您的選擇帶來的影響</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8">
                <Recycle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-3xl font-bold text-green-800 mb-2">100%</h4>
                <p className="text-green-700">可生物分解配方</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8">
                <Droplets className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-3xl font-bold text-blue-800 mb-2">0</h4>
                <p className="text-blue-700">有害化學物質</p>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-8">
                <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h4 className="text-3xl font-bold text-purple-800 mb-2">∞</h4>
                <p className="text-purple-700">對地球的愛護</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              一起創造更清潔的未來
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              每一次選擇天然手工皂，您都在為環境保護和永續發展做出貢獻。
              讓我們攜手創造一個更清潔、更綠色的世界。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://famistore.famiport.com.tw/users/3278142"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                購買環保手工皂
              </motion.a>
              <motion.a
                href="/support"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                了解更多支持方式
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
