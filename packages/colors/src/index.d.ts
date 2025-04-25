export type HSL = [number, number, number]

export type ColorHSLMap = {
    [name: string]: HSL
}

export interface GenerateColorTokenOptions {
    /**
     * 출력 포맷을 지정합니다.
     * 'css' (기본값), 'scss', 'json' 중 하나를 선택할 수 있습니다.
     *
     * Specifies the output format.
     * You can choose between 'css' (default), 'scss', or 'json'.
     */
    format?: 'css' | 'scss' | 'json'

    /**
     * 파일 경로를 지정합니다.
     * 경로를 지정하지 않으면 기본 경로 './theme'에 저장됩니다.
     *
     * Specifies the file path.
     * If not provided, the default path './theme' will be used.
     */
    path?: string

    /**
     * CSS 변수 앞에 붙일 접두사입니다.
     * 기본값은 '--color-'이며, 'scss' 포맷일 경우 '$'로 설정됩니다.
     *
     * The prefix to add before CSS variables.
     * The default is '--color-', but it will be '$' for 'scss' format.
     */
    prefix?: string

    /**
     * 생성 파일명을 지정합니다.
     * 지정하지 않으면 기본값 'uinamic-color'로 설정됩니다.
     *
     * Specifies the file name for the generated file.
     * If not provided, the default name 'uinamic-color' will be used.
     */
    name?: string

    /**
     * 명도 스펙트럼 생성 시 사용할 최소 밝기 제한값입니다.
     * 기본값은 10이며, 0~50 사이의 값을 추천합니다.
     *
     * The minimum lightness range limit for spectrum generation.
     * Default is 10. Values between 0 and 50 are recommended.
     */
    limit?: number
}

export function generateColorTokens(map: ColorHSLMap, options?: GenerateColorTokenOptions): string

export function getFullSpectrumFromCenter(
    centerL: number,
    limit?: number
): number[]

export function writeCss(map: ColorHSLMap, spectrumFn: (lightness: number, limit?: number) => number[], options: GenerateColorTokenOptions): string
