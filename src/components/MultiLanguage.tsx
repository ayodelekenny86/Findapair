import { useState, useEffect } from 'react'

type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja'

interface Translations {
  [key: string]: {
    [lang in Language]: string
  }
}

const translations: Translations = {
  'nav.findPair': {
    en: 'Find a Pair',
    es: 'Encontrar Par',
    fr: 'Trouver une Paire',
    de: 'Paar Finden',
    zh: '找配对',
    ja: 'ペアを見つける',
  },
  'nav.freeItem': {
    en: 'FreeItem',
    es: 'Artículo Gratis',
    fr: 'Article Gratuit',
    de: 'Kostenloser Artikel',
    zh: '免费物品',
    ja: '無料アイテム',
  },
  'hero.title': {
    en: 'Find the mate of what you lost',
    es: 'Encuentra la pareja de lo que perdiste',
    fr: 'Trouvez le partenaire de ce que vous avez perdu',
    de: 'Finden Sie das Gegenstück zu dem, was Sie verloren haben',
    zh: '找到你丢失物品的另一半',
    ja: '失くしたものの相手を見つけよう',
  },
  'hero.subtitle': {
    en: 'Ever lost a shoe or earring? They\'re expensive, so you don\'t want to throw them out — but they\'re useless without the mate.',
    es: '¿Alguna vez perdiste un zapato o arete? Son caros, así que no quieres tirarlos, pero son inútiles sin la pareja.',
    fr: 'Vous avez déjà perdu une chaussure ou une boucle d\'oreille? Elles sont chères, donc vous ne voulez pas les jeter — mais elles sont inutiles sans le partenaire.',
    de: 'Haben Sie schon einmal einen Schuh oder Ohrring verloren? Sie sind teuer, also wollen Sie sie nicht wegwerfen — aber sie sind nutzlos ohne das Gegenstück.',
    zh: '你有没有丢过一只鞋或耳环？它们很贵，所以你不想扔掉——但没有另一半就没用了。',
    ja: '靴やイヤリングを失くしたことはありませんか？高価なので捨てたくないけど、片方だけでは使えません。',
  },
  'button.post': {
    en: 'Post Item',
    es: 'Publicar Artículo',
    fr: 'Publier un Article',
    de: 'Artikel Posten',
    zh: '发布物品',
    ja: 'アイテムを投稿',
  },
  'button.browse': {
    en: 'Browse Listings',
    es: 'Explorar Anuncios',
    fr: 'Parcourir les Annonces',
    de: 'Anzeigen Durchsuchen',
    zh: '浏览列表',
    ja: 'リストを見る',
  },
  'filter.all': {
    en: 'All',
    es: 'Todos',
    fr: 'Tous',
    de: 'Alle',
    zh: '全部',
    ja: 'すべて',
  },
  'status.free': {
    en: 'FREE',
    es: 'GRATIS',
    fr: 'GRATUIT',
    de: 'KOSTENLOS',
    zh: '免费',
    ja: '無料',
  },
}

interface MultiLanguageProps {
  isOpen: boolean
  onClose: () => void
}

export default function MultiLanguage({ isOpen, onClose }: MultiLanguageProps) {
  const [currentLang, setCurrentLang] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved) setCurrentLang(saved)
  }, [])

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('language') as Language
      if (saved) setCurrentLang(saved)
    }
  }, [isOpen])

  const changeLanguage = (lang: Language) => {
    setCurrentLang(lang)
    localStorage.setItem('language', lang)
  }

  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
    { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
    { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">🌐 Language</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5">✕</button>
        </div>

        <div className="space-y-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                currentLang === lang.code
                  ? 'bg-cyan-500/10 border border-cyan-500/30'
                  : 'bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600'
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="text-sm font-medium text-white flex-1 text-left">{lang.name}</span>
              {currentLang === lang.code && (
                <span className="text-cyan-400">✓</span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
          <p className="text-xs text-cyan-400">
            💡 Language changes apply immediately and persist across sessions.
          </p>
        </div>
      </div>
    </div>
  )
}

// Translation helper function
export function t(key: string): string {
  const lang = (localStorage.getItem('language') || 'en') as Language
  return translations[key]?.[lang] || translations[key]?.en || key
}
