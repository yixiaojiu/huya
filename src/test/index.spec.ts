import { expect, test } from 'vitest'
import { getNextStateFileName } from '../file'

test('file', async () => {
  expect(await getNextStateFileName()).toBe('./state/storageState.json')
})
