import type { Ref } from 'vue'

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

export function save<T = any>(item: T, storage: Ref<T[]>, compare: CompareType<T>, maxLen: number) {
  const items = storage.value || []
  insertArray(items, item, compare, maxLen)
  storage.value = items
  return items
}

export function remove<T = any>(storage: Ref<T[]>, compare: CompareType<T>) {
  const items = storage.value || []
  deleteFromArray(items, compare)
  storage.value = items
  return items
}
