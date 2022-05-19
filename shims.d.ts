declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'good-storage' {
  interface Storage {
    set(key: string, key: any): void
    get<T = any>(key: string, def?: T): T
    has(key: string): boolean
    remove (key: string): void
    clear (): void
    session: Storage
  }
  const storage: Storage
  export default storage
}
