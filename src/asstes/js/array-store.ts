import storage from 'good-storage'

type CompareType<T> = (value: T, index: number, obj: T[]) => unknown

function insertArray<T = any>(arr: T[], val: T, compare: CompareType<T>, maxLen: number) {
  const index = arr.findIndex(compare)
  if (index === 0)
    return

  if (index > 0)
    arr.splice(index, 1)

  arr.unshift(val)
  if (maxLen && arr.length > maxLen)
    arr.pop()
}

function deleteFromArray<T = any>(arr: T[], compare: CompareType<T>) {
  const index = arr.findIndex(compare)
  if (index > -1)
    arr.splice(index, 1)
}

export function save<T = any>(item: T, key: string, compare: CompareType<T>, maxLen: number) {
  const items = storage.get(key, [])
  insertArray(items, item, compare, maxLen)
  storage.set(key, items)
  return items
}

export function remove<T = any>(key: string, compare: CompareType<T>) {
  const items = storage.get(key, [])
  deleteFromArray(items, compare)
  storage.set(key, items)
  return items
}

export function load<T = any>(key: string): T[] {
  return storage.get(key, [])
}

export function clear(key: string) {
  storage.remove(key)
  return []
}

export function saveAll<T = any>(items: T[], key: string) {
  storage.set(key, items)
}
