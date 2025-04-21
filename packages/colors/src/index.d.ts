export type HSL = [number, number, number]

export type ColorHSLMap = {
    [name: string]: HSL
}

export interface GenerateColorTokenOptions {
    format?: 'css' | 'scss' | 'json'
    output?: string
}

export function generateColorTokens(map: ColorHSLMap, options?: GenerateColorTokenOptions): string

export function getFullSpectrumFromCenter(lightness: number): number[]

export function writeCss(map: ColorHSLMap, spectrumFn: (lightness: number) => number[]): string
