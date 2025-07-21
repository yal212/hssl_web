'use client'

import { motion } from 'framer-motion'
import {
  Beaker,
  Droplets,
  Shield,
  Factory,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Leaf,
  Heart,
  Recycle
} from 'lucide-react'
import {
  fadeInUp,
  fadeInDown,
  floating,
  colorTheme
} from '@/lib/animations'


export default function EducationPage() {

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={`bg-gradient-to-br ${colorTheme.primary.light} via-white to-emerald-100 py-24 lg:py-32 relative overflow-hidden`}>
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-green-200/20 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInDown}
            initial="initial"
            animate="animate"
            className="text-center mb-20"
          >
            <motion.div
              className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${colorTheme.primary.gradient} rounded-full mb-8 shadow-lg`}
              variants={floating}
              initial="initial"
              animate="animate"
            >
              <Beaker className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              High School
              <motion.span
                className={`bg-gradient-to-r ${colorTheme.primary.gradient} bg-clip-text text-transparent block`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Soap Lab
              </motion.span>
            </motion.h1>
            <div className="max-w-5xl mx-auto">
              <motion.p
                className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                High School Soap Lab (簡稱 HSSL) 是成立自2021年的跨校團隊，因對市售清潔劑的隱憂，結合化學學科知識與技能，推廣手工皂替代市售清潔劑，也推廣過期油與實用廢油的循環再生。
              </motion.p>
              <motion.p
                className="text-lg md:text-xl text-gray-500 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              >
                推廣與教學從個人在家分享給家人，到學校分享給老師與同學，再走出校園在社區中舉辦製皂教學，除了鼓勵民眾參加製皂活動，同步回收過期油作為推廣課的原料，與多個環保與公益團體合作開課及參與環境永續攤位與民眾互動。
              </motion.p>
            </div>
          </motion.div>
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





      {/* Detailed Soap Making Guide */}
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
              詳細製皂指南
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              深入了解手工皂製作的科學原理、油脂特性、皂化計算與完整製作流程。
            </p>
          </motion.div>

          {/* Oil Characteristics Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <Droplets className="w-8 h-8 text-blue-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">基本油脂特性</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: '椰子油',
                  characteristics: '洗淨力強，能作出較硬且泡沫多的肥皂，若太多會對皮膚乾澀。',
                  color: 'from-yellow-100 to-yellow-200',
                  borderColor: 'border-yellow-300'
                },
                {
                  name: '棕櫚油',
                  characteristics: '對皮膚溫和，並使香皂較堅硬，但沒什麼泡沫，是做肥皂的基本油。',
                  color: 'from-orange-100 to-orange-200',
                  borderColor: 'border-orange-300'
                },
                {
                  name: '橄欖油',
                  characteristics: '含保濕、保護功能，能製造細緻泡沫。橄欖油皂溫和適合乾性肌膚。',
                  color: 'from-green-100 to-green-200',
                  borderColor: 'border-green-300'
                },
                {
                  name: '芥花油',
                  characteristics: '保濕強，可軟化肌膚，並產生細緻又持久的泡沫。',
                  color: 'from-blue-100 to-blue-200',
                  borderColor: 'border-blue-300'
                },
                {
                  name: '乳油木果脂',
                  characteristics: '增加滋潤度與硬度',
                  color: 'from-purple-100 to-purple-200',
                  borderColor: 'border-purple-300'
                }
              ].map((oil, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-gradient-to-br ${oil.color} rounded-xl p-6 border-2 ${oil.borderColor}`}
                >
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{oil.name}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{oil.characteristics}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Saponification Calculation Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <Beaker className="w-8 h-8 text-purple-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">皂化值計算</h3>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8">
              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4">網路自動計算工具</h4>
                <div className="bg-white rounded-xl p-6 border border-purple-200">
                  <p className="text-gray-700 mb-2">推薦使用：</p>
                  <div className="text-gray-600">
                    <a
                      href="https://www.soap-diy.com/Soap_Calculators.php"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors"
                    >
                      手工皂配方計算 Helen&apos;s Lye calculator
                    </a>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4">皂化反應的化學計量</h4>
                <div className="bg-white rounded-xl p-6 border border-purple-200">
                  <p className="text-gray-700 mb-4">
                    <strong>皂化價</strong> = 將 1 公克的油脂完全皂化，所需要鹼質的克數
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-4 font-semibold text-gray-900">油脂名稱</th>
                          <th className="text-left py-2 px-4 font-semibold text-gray-900">氫氧化鈉 (NaOH) 皂化價</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-4 text-gray-700">Coconut 椰子油</td>
                          <td className="py-2 px-4 text-gray-700">0.190</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-4 text-gray-700">Palm 棕櫚油</td>
                          <td className="py-2 px-4 text-gray-700">0.141</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-4 text-gray-700">Olive 橄欖油</td>
                          <td className="py-2 px-4 text-gray-700">0.134</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">計算方法範例</h4>
                <div className="bg-white rounded-xl p-6 border border-purple-200">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">① 計算氫氧化鈉用量：</h5>
                      <p className="text-gray-700 text-sm mb-2">
                        (100 公克椰子油 + 200 公克棕櫚油 + 300 公克橄欖油) 完全皂化所需氫氧化鈉的質量？
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                        W<sub>NaOH</sub> = 100 × 0.190 + 200 × 0.141 + 300 × 0.134 = 77.7 克
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">② 溶解水量的計算：</h5>
                      <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                        W<sub>H2O</sub> = W<sub>NaOH</sub> × (2 倍) = 155.4 公克
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cold Process Soap Making Flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <Factory className="w-8 h-8 text-green-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">手工皂製作流程 - Cold Process</h3>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: '準備充分安全保護裝備',
                    description: '桌面防護／眼鏡／手套／實驗衣或工作圍裙',
                    icon: Shield
                  },
                  {
                    step: 2,
                    title: '鹼水配製',
                    description: '依皂化價計算結果進行鹼水配製，降溫至攝氏 45 度上下',
                    icon: Beaker
                  },
                  {
                    step: 3,
                    title: '油脂準備',
                    description: '根據配方量測混合油脂、加熱至攝氏 45 度上下',
                    icon: Droplets
                  },
                  {
                    step: 4,
                    title: '混合攪拌',
                    description: '將鹼水倒入油脂中，均勻攪拌至半 trace 狀態（攪拌方式：手打或電打）',
                    icon: Recycle
                  },
                  {
                    step: 5,
                    title: '添加物與入模',
                    description: '加入添加物攪拌至 trace 狀態，倒入皂模保存在保麗龍箱保溫 24-48 小時（暖暖包）',
                    icon: Heart
                  },
                  {
                    step: 6,
                    title: '清潔整理',
                    description: '桌面與工具清潔',
                    icon: Sparkles
                  },
                  {
                    step: 7,
                    title: '脫模處理',
                    description: '脫模、切皂、蓋章',
                    icon: CheckCircle
                  },
                  {
                    step: 8,
                    title: '晾皂熟成',
                    description: '晾皂 4 周以上，完成包裝與貼上使用說明標籤',
                    icon: Leaf
                  }
                ].map((process, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 border border-green-200 flex items-start"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-6 flex-shrink-0">
                      {process.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <process.icon className="w-5 h-5 text-green-600 mr-2" />
                        <h4 className="text-lg font-bold text-gray-900">{process.title}</h4>
                      </div>
                      <p className="text-gray-600">{process.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Safety Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <AlertTriangle className="w-8 h-8 text-red-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">安全須知</h3>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: '防護裝備',
                    description: '全程務必穿戴手套操作',
                    icon: Shield,
                    color: 'text-red-600'
                  },
                  {
                    title: '化學安全',
                    description: '氫氧化鈉具腐蝕性',
                    icon: AlertTriangle,
                    color: 'text-orange-600'
                  },
                  {
                    title: '精確測量',
                    description: '天平量測單位選用與歸零操作',
                    icon: Beaker,
                    color: 'text-yellow-600'
                  }
                ].map((safety, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 border-2 border-red-200 text-center"
                  >
                    <safety.icon className={`w-12 h-12 ${safety.color} mx-auto mb-4`} />
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{safety.title}</h4>
                    <p className="text-gray-700 text-sm">{safety.description}</p>
                  </motion.div>
                ))}
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
              加入 HSSL 的環保行動
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              與多個環保與公益團體合作，參與環境永續攤位與民眾互動。
              一起推廣手工皂替代市售清潔劑，實現廢油循環再生的永續目標。
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
                參與 HSSL 活動
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
