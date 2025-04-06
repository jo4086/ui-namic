import { describe, it, expect, test } from 'vitest'
import Box from './Box'

console.dir(Box, { depth: null })

test('Box 생성 확인', () => {
    expect(Box).toBeDefined()
})
