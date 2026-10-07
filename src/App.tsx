import { useState, useCallback } from 'react';

// 生物数据
const organisms = [
  {
    id: 'sun',
    name: '太阳',
    role: '能量来源',
    description: '太阳是生态系统中所有能量的最终来源！植物靠阳光进行光合作用。',
    color: '#FFD700',
  },
  {
    id: 'grass',
    name: '草',
    role: '生产者',
    description: '草是生产者，它利用阳光、水和二氧化碳制造自己的食物（有机物）。',
    color: '#228B22',
  },
  {
    id: 'grasshopper',
    name: '蚱蜢',
    role: '初级消费者',
    description: '蚱蜢是初级消费者（植食动物），它吃草来获取能量。',
    color: '#7CFC00',
  },
  {
    id: 'frog',
    name: '青蛙',
    role: '次级消费者',
    description: '青蛙是次级消费者（肉食动物），它吃蚱蜢来获取能量。',
    color: '#2E8B57',
  },
  {
    id: 'snake',
    name: '蛇',
    role: '三级消费者',
    description: '蛇是三级消费者，它吃青蛙来获取能量。',
    color: '#556B2F',
  },
  {
    id: 'eagle',
    name: '鹰',
    role: '顶级消费者',
    description: '鹰是顶级消费者（食物链顶端），它吃蛇来获取能量。',
    color: '#8B4513',
  },
  {
    id: 'mushroom',
    name: '蘑菇（分解者）',
    role: '分解者',
    description: '蘑菇和细菌是分解者，它们把死去的生物分解成无机物，让营养物质回到土壤。',
    color: '#8B008B',
  },
];

// 能量流动顺序
const energyFlow = ['sun', 'grass', 'grasshopper', 'frog', 'snake', 'eagle'];

// 选择题
const questions = [
  {
    id: 1,
    question: '在生态系统中，谁是"生产者"？',
    options: ['A. 蚱蜢', 'B. 草', 'C. 青蛙', 'D. 鹰'],
    correct: 1,
    explanation: '草是生产者！生产者能利用阳光制造自己的食物，是食物链的起点。',
  },
  {
    id: 2,
    question: '能量在食物链中从哪里开始传递？',
    options: ['A. 从鹰开始', 'B. 从草开始', 'C. 从太阳开始', 'D. 从蘑菇开始'],
    correct: 2,
    explanation: '能量从太阳开始！太阳提供光能，草（生产者）把光能变成化学能，然后沿食物链传递。',
  },
  {
    id: 3,
    question: '分解者的作用是什么？',
    options: [
      'A. 吃掉其他动物',
      'B. 利用阳光制造食物',
      'C. 把死去的生物分解，让物质回到环境',
      'D. 给植物提供阳光',
    ],
    correct: 2,
    explanation: '分解者（如蘑菇和细菌）把死去的生物分解成简单的物质，让这些物质回到土壤和空气中，供生产者再次利用。注意：能量不会循环回太阳！',
  },
];

// SVG 生物图形组件
function SunSVG({ highlighted }: { highlighted: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="25" fill="#FFD700" stroke="#FF8C00" strokeWidth="3" />
      {/* 光芒 */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 + 30 * Math.cos(rad);
        const y1 = 50 + 30 * Math.sin(rad);
        const x2 = 50 + 42 * Math.cos(rad);
        const y2 = 50 + 42 * Math.sin(rad);
        return (
          <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FF8C00" strokeWidth="3" strokeLinecap="round" />
        );
      })}
      {highlighted && <circle cx="50" cy="50" r="48" fill="none" stroke="#FF4500" strokeWidth="4" strokeDasharray="8 4">
        <animate attributeName="stroke-dashoffset" from="0" to="24" dur="0.8s" repeatCount="indefinite" />
      </circle>}
    </svg>
  );
}

function GrassSVG({ highlighted }: { highlighted: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="0" y="70" width="100" height="30" fill="#8B4513" rx="5" />
      {/* 草叶 */}
      <path d="M20 70 Q25 30 30 70" fill="#228B22" stroke="#006400" strokeWidth="1" />
      <path d="M35 70 Q40 25 45 70" fill="#32CD32" stroke="#006400" strokeWidth="1" />
      <path d="M50 70 Q55 20 60 70" fill="#228B22" stroke="#006400" strokeWidth="1" />
      <path d="M65 70 Q70 30 75 70" fill="#32CD32" stroke="#006400" strokeWidth="1" />
      <path d="M10 70 Q15 40 20 70" fill="#32CD32" stroke="#006400" strokeWidth="1" />
      <path d="M78 70 Q83 35 88 70" fill="#228B22" stroke="#006400" strokeWidth="1" />
      {highlighted && <circle cx="50" cy="50" r="48" fill="none" stroke="#00FF00" strokeWidth="4" strokeDasharray="8 4">
        <animate attributeName="stroke-dashoffset" from="0" to="24" dur="0.8s" repeatCount="indefinite" />
      </circle>}
    </svg>
  );
}

function GrasshopperSVG({ highlighted }: { highlighted: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* 身体 */}
      <ellipse cx="50" cy="55" rx="20" ry="12" fill="#7CFC00" stroke="#228B22" strokeWidth="2" />
      {/* 头 */}
      <circle cx="30" cy="50" r="10" fill="#7CFC00" stroke="#228B22" strokeWidth="2" />
      {/* 眼睛 */}
      <circle cx="27" cy="47" r="3" fill="white" />
      <circle cx="27" cy="47" r="1.5" fill="black" />
      {/* 触角 */}
      <line x1="25" y1="42" x2="18" y2="30" stroke="#228B22" strokeWidth="1.5" />
      <line x1="30" y1="41" x2="25" y2="28" stroke="#228B22" strokeWidth="1.5" />
      {/* 后腿 */}
      <path d="M60 60 Q75 40 80 65" fill="none" stroke="#228B22" strokeWidth="3" />
      <path d="M55 62 Q70 45 72 68" fill="none" stroke="#228B22" strokeWidth="3" />
      {/* 前腿 */}
      <line x1="38" y1="62" x2="35" y2="75" stroke="#228B22" strokeWidth="2" />
      <line x1="45" y1="63" x2="43" y2="75" stroke="#228B22" strokeWidth="2" />
      {highlighted && <circle cx="50" cy="50" r="48" fill="none" stroke="#ADFF2F" strokeWidth="4" strokeDasharray="8 4">
        <animate attributeName="stroke-dashoffset" from="0" to="24" dur="0.8s" repeatCount="indefinite" />
      </circle>}
    </svg>
  );
}

function FrogSVG({ highlighted }: { highlighted: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* 身体 */}
      <ellipse cx="50" cy="60" rx="25" ry="20" fill="#2E8B57" stroke="#006400" strokeWidth="2" />
      {/* 头 */}
      <ellipse cx="50" cy="42" rx="20" ry="15" fill="#3CB371" stroke="#006400" strokeWidth="2" />
      {/* 眼睛 */}
      <circle cx="38" cy="33" r="8" fill="#90EE90" stroke="#006400" strokeWidth="1.5" />
      <circle cx="62" cy="33" r="8" fill="#90EE90" stroke="#006400" strokeWidth="1.5" />
      <circle cx="38" cy="33" r="4" fill="black" />
      <circle cx="62" cy="33" r="4" fill="black" />
      {/* 嘴巴 */}
      <path d="M38 50 Q50 56 62 50" fill="none" stroke="#006400" strokeWidth="2" />
      {/* 前腿 */}
      <path d="M30 65 L20 78 L25 78 L28 72" fill="#2E8B57" stroke="#006400" strokeWidth="1.5" />
      <path d="M70 65 L80 78 L75 78 L72 72" fill="#2E8B57" stroke="#006400" strokeWidth="1.5" />
      {highlighted && <circle cx="50" cy="50" r="48" fill="none" stroke="#00FA9A" strokeWidth="4" strokeDasharray="8 4">
        <animate attributeName="stroke-dashoffset" from="0" to="24" dur="0.8s" repeatCount="indefinite" />
      </circle>}
    </svg>
  );
}

function SnakeSVG({ highlighted }: { highlighted: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* 蛇身 */}
      <path d="M15 70 Q25 40 40 55 Q55 70 65 45 Q75 20 85 35" fill="none" stroke="#556B2F" strokeWidth="8" strokeLinecap="round" />
      <path d="M15 70 Q25 40 40 55 Q55 70 65 45 Q75 20 85 35" fill="none" stroke="#6B8E23" strokeWidth="4" strokeLinecap="round" />
      {/* 蛇头 */}
      <ellipse cx="87" cy="33" rx="8" ry="6" fill="#556B2F" stroke="#2F4F2F" strokeWidth="1.5" />
      {/* 眼睛 */}
      <circle cx="90" cy="31" r="2" fill="#FFD700" />
      <circle cx="90" cy="31" r="1" fill="black" />
      {/* 舌头 */}
      <path d="M95 33 L100 30 M95 33 L100 36" fill="none" stroke="red" strokeWidth="1" />
      {/* 花纹 */}
      <circle cx="30" cy="50" r="3" fill="#8B8B23" opacity="0.5" />
      <circle cx="50" cy="60" r="3" fill="#8B8B23" opacity="0.5" />
      <circle cx="70" cy="38" r="3" fill="#8B8B23" opacity="0.5" />
      {highlighted && <circle cx="50" cy="50" r="48" fill="none" stroke="#9ACD32" strokeWidth="4" strokeDasharray="8 4">
        <animate attributeName="stroke-dashoffset" from="0" to="24" dur="0.8s" repeatCount="indefinite" />
      </circle>}
    </svg>
  );
}

function EagleSVG({ highlighted }: { highlighted: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* 翅膀 */}
      <path d="M50 45 Q20 30 5 50" fill="#8B4513" stroke="#4A2800" strokeWidth="1.5" />
      <path d="M50 45 Q80 30 95 50" fill="#8B4513" stroke="#4A2800" strokeWidth="1.5" />
      {/* 身体 */}
      <ellipse cx="50" cy="55" rx="15" ry="20" fill="#654321" stroke="#4A2800" strokeWidth="1.5" />
      {/* 头 */}
      <circle cx="50" cy="35" r="10" fill="white" stroke="#4A2800" strokeWidth="1.5" />
      {/* 眼睛 */}
      <circle cx="46" cy="33" r="2.5" fill="#FFD700" />
      <circle cx="54" cy="33" r="2.5" fill="#FFD700" />
      <circle cx="46" cy="33" r="1.2" fill="black" />
      <circle cx="54" cy="33" r="1.2" fill="black" />
      {/* 喙 */}
      <path d="M47 38 L50 44 L53 38" fill="#FF8C00" stroke="#CC7000" strokeWidth="1" />
      {/* 尾巴 */}
      <path d="M45 73 L50 85 L55 73" fill="#654321" stroke="#4A2800" strokeWidth="1" />
      {highlighted && <circle cx="50" cy="50" r="48" fill="none" stroke="#DEB887" strokeWidth="4" strokeDasharray="8 4">
        <animate attributeName="stroke-dashoffset" from="0" to="24" dur="0.8s" repeatCount="indefinite" />
      </circle>}
    </svg>
  );
}

function MushroomSVG({ highlighted }: { highlighted: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* 蘑菇伞 */}
      <ellipse cx="50" cy="45" rx="30" ry="20" fill="#8B008B" stroke="#4B0082" strokeWidth="2" />
      {/* 蘑菇柄 */}
      <rect x="42" y="45" width="16" height="35" fill="#DEB887" stroke="#8B7355" strokeWidth="1.5" rx="3" />
      {/* 伞上斑点 */}
      <circle cx="40" cy="38" r="4" fill="#FF69B4" opacity="0.7" />
      <circle cx="55" cy="35" r="3" fill="#FF69B4" opacity="0.7" />
      <circle cx="60" cy="45" r="3.5" fill="#FF69B4" opacity="0.7" />
      {/* 细菌小点 */}
      <circle cx="25" cy="80" r="3" fill="#9370DB" opacity="0.6" />
      <circle cx="75" cy="78" r="2.5" fill="#9370DB" opacity="0.6" />
      <circle cx="30" cy="88" r="2" fill="#9370DB" opacity="0.6" />
      <circle cx="70" cy="86" r="2" fill="#9370DB" opacity="0.6" />
      {highlighted && <circle cx="50" cy="50" r="48" fill="none" stroke="#FF00FF" strokeWidth="4" strokeDasharray="8 4">
        <animate attributeName="stroke-dashoffset" from="0" to="24" dur="0.8s" repeatCount="indefinite" />
      </circle>}
    </svg>
  );
}

// 获取对应生物的SVG组件
function getOrganismSVG(id: string, highlighted: boolean) {
  switch (id) {
    case 'sun': return <SunSVG highlighted={highlighted} />;
    case 'grass': return <GrassSVG highlighted={highlighted} />;
    case 'grasshopper': return <GrasshopperSVG highlighted={highlighted} />;
    case 'frog': return <FrogSVG highlighted={highlighted} />;
    case 'snake': return <SnakeSVG highlighted={highlighted} />;
    case 'eagle': return <EagleSVG highlighted={highlighted} />;
    case 'mushroom': return <MushroomSVG highlighted={highlighted} />;
    default: return null;
  }
}

export default function App() {
  const [selectedOrganism, setSelectedOrganism] = useState<string | null>(null);
  const [flowStep, setFlowStep] = useState<number>(-1);
  const [isFlowing, setIsFlowing] = useState(false);
  const [showDecomposer, setShowDecomposer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  // 点击生物
  const handleOrganismClick = useCallback((id: string) => {
    if (!isFlowing) {
      setSelectedOrganism(id);
    }
  }, [isFlowing]);

  // 开始能量流动
  const startEnergyFlow = useCallback(() => {
    setIsFlowing(true);
    setSelectedOrganism(null);
    setShowDecomposer(false);
    setFlowStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= energyFlow.length) {
        clearInterval(interval);
        setIsFlowing(false);
        setFlowStep(-1);
      } else {
        setFlowStep(step);
      }
    }, 1200);
  }, []);

  // 显示分解者
  const handleShowDecomposer = useCallback(() => {
    setShowDecomposer(true);
    setSelectedOrganism('mushroom');
  }, []);

  // 答题
  const handleAnswer = useCallback((questionIdx: number, optionIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIdx] = optionIdx;
    setAnswers(newAnswers);

    if (questionIdx < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(questionIdx + 1), 1500);
    } else {
      setTimeout(() => setShowResults(true), 1500);
    }
  }, [answers]);

  // 重新开始
  const handleRestart = useCallback(() => {
    setSelectedOrganism(null);
    setFlowStep(-1);
    setIsFlowing(false);
    setShowDecomposer(false);
    setCurrentQuestion(0);
    setAnswers([null, null, null]);
    setShowResults(false);
    setQuizStarted(false);
  }, []);

  // 计算得分
  const score = answers.reduce((acc: number, ans, idx) => {
    if (ans === questions[idx].correct) return acc + 1;
    return acc;
  }, 0);

  // 获取当前高亮的生物
  const getHighlightedId = () => {
    if (flowStep >= 0 && flowStep < energyFlow.length) {
      return energyFlow[flowStep];
    }
    return null;
  };

  const highlightedId = getHighlightedId();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-green-100 p-4 md:p-6">
      {/* 标题 */}
      <header className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 drop-shadow-md">
          🌿 动物生态系统探险 🦅
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mt-2">
          点击生物了解它们的角色，观察能量如何流动！
        </p>
      </header>

      {/* 主场景 */}
      <div className="max-w-5xl mx-auto">
        {/* 生态系统场景 */}
        <div className="bg-gradient-to-b from-sky-200 via-sky-50 to-green-200 rounded-2xl border-4 border-green-600 p-4 md:p-6 shadow-xl mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {/* 太阳 - 占据顶部 */}
            <div className="col-span-2 md:col-span-1 flex flex-col items-center">
              <button
                onClick={() => handleOrganismClick('sun')}
                className={`w-20 h-20 md:w-24 md:h-24 cursor-pointer transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-400 rounded-full ${highlightedId === 'sun' ? 'scale-110 ring-4 ring-yellow-400' : ''}`}
                aria-label="太阳"
                title="点击了解太阳"
              >
                {getOrganismSVG('sun', highlightedId === 'sun')}
              </button>
              <span className="text-base md:text-lg font-bold text-yellow-700 mt-1">☀️ 太阳</span>
            </div>

            {/* 草 */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleOrganismClick('grass')}
                className={`w-20 h-20 md:w-24 md:h-24 cursor-pointer transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-400 rounded-full ${highlightedId === 'grass' ? 'scale-110 ring-4 ring-green-400' : ''}`}
                aria-label="草"
                title="点击了解草"
              >
                {getOrganismSVG('grass', highlightedId === 'grass')}
              </button>
              <span className="text-base md:text-lg font-bold text-green-700 mt-1">🌱 草</span>
            </div>

            {/* 蚱蜢 */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleOrganismClick('grasshopper')}
                className={`w-20 h-20 md:w-24 md:h-24 cursor-pointer transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-lime-400 rounded-full ${highlightedId === 'grasshopper' ? 'scale-110 ring-4 ring-lime-400' : ''}`}
                aria-label="蚱蜢"
                title="点击了解蚱蜢"
              >
                {getOrganismSVG('grasshopper', highlightedId === 'grasshopper')}
              </button>
              <span className="text-base md:text-lg font-bold text-lime-700 mt-1">🦗 蚱蜢</span>
            </div>

            {/* 青蛙 */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleOrganismClick('frog')}
                className={`w-20 h-20 md:w-24 md:h-24 cursor-pointer transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-emerald-400 rounded-full ${highlightedId === 'frog' ? 'scale-110 ring-4 ring-emerald-400' : ''}`}
                aria-label="青蛙"
                title="点击了解青蛙"
              >
                {getOrganismSVG('frog', highlightedId === 'frog')}
              </button>
              <span className="text-base md:text-lg font-bold text-emerald-700 mt-1">🐸 青蛙</span>
            </div>

            {/* 蛇 */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleOrganismClick('snake')}
                className={`w-20 h-20 md:w-24 md:h-24 cursor-pointer transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-olive-400 rounded-full ${highlightedId === 'snake' ? 'scale-110 ring-4 ring-yellow-600' : ''}`}
                aria-label="蛇"
                title="点击了解蛇"
              >
                {getOrganismSVG('snake', highlightedId === 'snake')}
              </button>
              <span className="text-base md:text-lg font-bold text-yellow-800 mt-1">🐍 蛇</span>
            </div>

            {/* 鹰 */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleOrganismClick('eagle')}
                className={`w-20 h-20 md:w-24 md:h-24 cursor-pointer transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-400 rounded-full ${highlightedId === 'eagle' ? 'scale-110 ring-4 ring-amber-400' : ''}`}
                aria-label="鹰"
                title="点击了解鹰"
              >
                {getOrganismSVG('eagle', highlightedId === 'eagle')}
              </button>
              <span className="text-base md:text-lg font-bold text-amber-800 mt-1">🦅 鹰</span>
            </div>

            {/* 蘑菇/分解者 */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleOrganismClick('mushroom')}
                className={`w-20 h-20 md:w-24 md:h-24 cursor-pointer transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-purple-400 rounded-full ${highlightedId === 'mushroom' || showDecomposer ? 'scale-110 ring-4 ring-purple-400' : ''}`}
                aria-label="蘑菇（分解者）"
                title="点击了解分解者"
              >
                {getOrganismSVG('mushroom', highlightedId === 'mushroom' || showDecomposer)}
              </button>
              <span className="text-base md:text-lg font-bold text-purple-700 mt-1">🍄 蘑菇</span>
            </div>
          </div>

          {/* 能量流动箭头指示 */}
          {isFlowing && flowStep >= 0 && (
            <div className="text-center mt-4 p-3 bg-white bg-opacity-80 rounded-xl">
              <p className="text-xl font-bold text-orange-600">
                ⚡ 能量正在传递到：{organisms.find(o => o.id === energyFlow[flowStep])?.name}！
              </p>
              <div className="flex justify-center items-center gap-1 mt-2 flex-wrap">
                {energyFlow.map((id, idx) => (
                  <span key={id} className={`text-lg md:text-xl ${idx <= flowStep ? 'opacity-100' : 'opacity-30'}`}>
                    {idx === 0 ? '☀️' : idx === 1 ? '🌱' : idx === 2 ? '🦗' : idx === 3 ? '🐸' : idx === 4 ? '🐍' : '🦅'}
                    {idx < energyFlow.length - 1 && <span className="text-gray-400"> → </span>}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 信息面板 */}
        {selectedOrganism && (
          <div className="bg-white rounded-xl border-2 border-gray-300 p-4 md:p-6 mb-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{organisms.find(o => o.id === selectedOrganism)?.id === 'sun' ? '☀️' : organisms.find(o => o.id === selectedOrganism)?.id === 'grass' ? '🌱' : organisms.find(o => o.id === selectedOrganism)?.id === 'grasshopper' ? '🦗' : organisms.find(o => o.id === selectedOrganism)?.id === 'frog' ? '🐸' : organisms.find(o => o.id === selectedOrganism)?.id === 'snake' ? '🐍' : organisms.find(o => o.id === selectedOrganism)?.id === 'eagle' ? '🦅' : '🍄'}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {organisms.find(o => o.id === selectedOrganism)?.name}
              </h2>
            </div>
            <p className="text-lg md:text-xl font-semibold text-blue-700 mb-2">
              角色：{organisms.find(o => o.id === selectedOrganism)?.role}
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {organisms.find(o => o.id === selectedOrganism)?.description}
            </p>
          </div>
        )}

        {/* 分解者说明 */}
        {showDecomposer && (
          <div className="bg-purple-50 border-2 border-purple-400 rounded-xl p-4 md:p-6 mb-6 shadow-lg">
            <h3 className="text-2xl font-bold text-purple-800 mb-3">🍄 分解者在哪里？</h3>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-3">
              分解者（如<strong>蘑菇</strong>和<strong>细菌</strong>）就在我们身边！它们把死去的动植物分解成简单的物质，让这些营养物质回到土壤和空气中。
            </p>
            <div className="bg-purple-100 rounded-lg p-3 border border-purple-300">
              <p className="text-lg font-bold text-purple-900">
                ⚠️ 重要知识：分解者让<strong>物质</strong>循环回到环境中，但<strong>能量</strong>不会循环回太阳！能量在每一级传递时都会减少（变成热量散失）。
              </p>
            </div>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6">
          <button
            onClick={startEnergyFlow}
            disabled={isFlowing}
            className="px-5 py-3 md:px-6 md:py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white text-lg md:text-xl font-bold rounded-xl shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-orange-300 cursor-pointer disabled:cursor-not-allowed"
          >
            ⚡ 开始能量流动
          </button>
          <button
            onClick={handleShowDecomposer}
            className="px-5 py-3 md:px-6 md:py-4 bg-purple-500 hover:bg-purple-600 text-white text-lg md:text-xl font-bold rounded-xl shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-purple-300 cursor-pointer"
          >
            🍄 分解者在哪里？
          </button>
          <button
            onClick={() => setQuizStarted(true)}
            disabled={quizStarted}
            className="px-5 py-3 md:px-6 md:py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white text-lg md:text-xl font-bold rounded-xl shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer disabled:cursor-not-allowed"
          >
            📝 开始答题
          </button>
          <button
            onClick={handleRestart}
            className="px-5 py-3 md:px-6 md:py-4 bg-gray-500 hover:bg-gray-600 text-white text-lg md:text-xl font-bold rounded-xl shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-gray-300 cursor-pointer"
          >
            🔄 重新开始
          </button>
        </div>

        {/* 答题区域 */}
        {quizStarted && !showResults && (
          <div className="bg-white rounded-xl border-2 border-blue-300 p-4 md:p-6 mb-6 shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold text-blue-800 mb-4">
              📝 第 {currentQuestion + 1} / {questions.length} 题
            </h3>
            <p className="text-lg md:text-xl text-gray-800 font-semibold mb-4">
              {questions[currentQuestion].question}
            </p>
            <div className="grid gap-3">
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => answers[currentQuestion] === null && handleAnswer(currentQuestion, idx)}
                  disabled={answers[currentQuestion] !== null}
                  className={`text-left px-4 py-3 text-lg md:text-xl rounded-lg border-2 transition-all focus:outline-none focus:ring-4 focus:ring-blue-200 cursor-pointer disabled:cursor-not-allowed ${
                    answers[currentQuestion] === null
                      ? 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                      : answers[currentQuestion] === idx
                        ? idx === questions[currentQuestion].correct
                          ? 'border-green-500 bg-green-100 text-green-800'
                          : 'border-red-500 bg-red-100 text-red-800'
                        : idx === questions[currentQuestion].correct
                          ? 'border-green-500 bg-green-100 text-green-800'
                          : 'border-gray-200 bg-gray-50 text-gray-500'
                  }`}
                >
                  {option}
                  {answers[currentQuestion] !== null && idx === questions[currentQuestion].correct && ' ✅'}
                  {answers[currentQuestion] === idx && idx !== questions[currentQuestion].correct && ' ❌'}
                </button>
              ))}
            </div>
            {/* 答题后显示解释 */}
            {answers[currentQuestion] !== null && (
              <div className={`mt-4 p-3 rounded-lg ${answers[currentQuestion] === questions[currentQuestion].correct ? 'bg-green-50 border border-green-300' : 'bg-red-50 border border-red-300'}`}>
                <p className="text-lg font-semibold text-gray-800">
                  💡 解释：{questions[currentQuestion].explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 答题结果 */}
        {showResults && (
          <div className="bg-white rounded-xl border-2 border-yellow-400 p-4 md:p-6 mb-6 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-yellow-700 mb-4">
              🏆 答题结果
            </h3>
            <div className="text-center mb-4">
              <p className="text-3xl md:text-4xl font-bold text-blue-700">
                你的得分：{score} / {questions.length}
              </p>
              <p className="text-xl text-gray-600 mt-2">
                {score === 3 ? '🎉 太棒了！全部答对！你是生态小专家！' : score === 2 ? '👍 很不错！再接再厉！' : score === 1 ? '💪 继续加油，多观察生态系统！' : '📚 别灰心，再学习一次吧！'}
              </p>
            </div>
            {/* 每题回顾 */}
            <div className="space-y-3 mt-4">
              {questions.map((q, idx) => (
                <div key={q.id} className={`p-3 rounded-lg border ${answers[idx] === q.correct ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                  <p className="text-base md:text-lg font-semibold text-gray-800">
                    {idx + 1}. {q.question}
                  </p>
                  <p className="text-base text-gray-600">
                    你的答案：{q.options[answers[idx] ?? 0]} {answers[idx] === q.correct ? '✅' : '❌'}
                  </p>
                  <p className="text-base text-gray-700">
                    💡 {q.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 知识卡片 */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 md:p-6 mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-yellow-800 mb-3">📖 知识小结</h3>
          <ul className="text-lg md:text-xl text-gray-700 space-y-2 list-disc list-inside">
            <li><strong>生产者</strong>（如草）：利用阳光制造食物</li>
            <li><strong>消费者</strong>（如蚱蜢、青蛙、蛇、鹰）：吃其他生物获取能量</li>
            <li><strong>分解者</strong>（如蘑菇、细菌）：分解死去的生物，让物质回到环境</li>
            <li><strong>能量流动</strong>：太阳 → 生产者 → 消费者，能量逐级减少，不可循环</li>
            <li><strong>物质循环</strong>：分解者让物质可以循环利用</li>
          </ul>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="text-center text-gray-500 text-sm mt-6 pb-4">
        <p>🌍 保护生态系统，从了解开始！</p>
      </footer>
    </div>
  );
}
