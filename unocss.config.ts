import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  rules: [
    ['no-wrap', {
      'text-overflow': 'ellipsis',
      'overflow': 'hidden',
      'white-space': 'nowrap',
    }],
  ],
  safelist: [
    'i-carbon:repeat',
    'i-carbon:movement',
    'i-carbon:repeat-one',
    'i-carbon:favorite-filled',
    'i-carbon:favorite',
    'animate-cd',

  ],
  theme: {
    colors: {
      darkHighlight: '#333',
      lightHighlight: '#f0f0f5',
      dialog: '#666',
      theme: '#ffcd32',
      themeD: 'rgba(255, 205, 49, 0.5)',
      subTheme: '#d93f30',
      darkBase: '#fff',
      darkD: 'rgba(255, 255, 255, 0.3)',
      darkL: 'rgba(255, 255, 255, 0.5)',
      darkLl: 'rgba(255, 255, 255, 0.8)',
      lightBase: '#000',
      lightD: 'rgba(0, 0, 0, 0.3)',
      lightL: 'rgba(0, 0, 0, 0.5)',
      lightLl: 'rgba(0, 0, 0, 0.8)',
    },

    animation: {
      keyframes: {
        // cd: {
        //   '0%': { transform: 'rotate(0)' },
        //   '100%': { transform: 'rotate(360deg)' },
        // },
        cd: '{0% {transform:rotate(0)} 100% { transform: rotate(360deg)}}',
      },
      durations: {
        cd: '20s',
      },
      timingFns: {
        cd: 'linear',
      },
    },
  },
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
})
