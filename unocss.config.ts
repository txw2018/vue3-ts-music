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
  theme: {
    colors: {
      background: '#222',
      darkBackgroundD: 'rgba(0, 0, 0, 0.3)',
      darkHighlightBackground: '#333',
      lightHighlightBackground: '#f0f0f5',
      dialogBackground: '#666',
      theme: '#ffcd32',
      themeD: 'rgba(255, 205, 49, 0.5)',
      subTheme: '#d93f30',
      lightBase: '#fff',
      lightD: 'rgba(255, 255, 255, 0.3)',
      lightL: 'rgba(255, 255, 255, 0.5)',
      lightLl: 'rgba(255, 255, 255, 0.8)',
      darkBase: '#000',
      darkD: 'rgba(0, 0, 0, 0.3)',
      darkL: 'rgba(0, 0, 0, 0.5)',
      darkLl: 'rgba(0, 0, 0, 0.8)',
    },
  },
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
})
