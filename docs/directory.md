### 패키지별 디렉토리구조

<details>
<summary> 루트 디렉토리 트리구조 </summary>

#### 루트/

```
📁./ui-namic
📁playground/
📁packages/
📁node_modules/
📁md/
📁docs/
📁**archive**/
🧾turbo.json
🧾README.md
🧾pnpm-workspace.yaml
🧾pnpm-lock.yaml
🧾package.json
🧾LICENSE
🧾improvements(Ko).md
🧾improvements(En).md
🧾directory.md
🧾Commit Message Guide.md

```

#### 루트/\*

```
📁./ui-namic
  📁__archive__/
    📜analyzeDeepDSLTree.js
    📜extractStringOverrides.js
    📜generateStyleId.js
    📜typeChecker.js
  📖Commit Message Guide.md
  📖directory.md
  📁docs/
    📖01_Objectives.md
    📖02_Architeture.md
    📖03_Dev-log.md
    📖04_Background.md
    📖05_BranchStrategy.md
    📖06_Refleaction.md
    📖07_Archive.md
    📖drectory.md
  📖improvements(En).md
  📖improvements(Ko).md
  🧾LICENSE
  📁md/
    📖drectory.md
    📖비교.md
  📁node_modules/
  🧾package.json
  📁packages/
    📁core/
      📁dist/
      🧾jsconfig.json
      📁node_modules/
      🧾package.json
      📁src/
        📁empty/
          📜styleHash.js
        📁hooks/
          📜useDynamicTrigger.js
          📜useDynamicTrigger_v2.js
          📜useDynamicTrigger_v3.js
          📜useDynamicTrigger_v3_useEffect.js
        📜index.js
        📁utils/
          📁builds/
            📜buildBaseModule.js
            📜buildKeyframesModule.js
            📜buildMediaModule.js
            📜buildPseudoModule.js
            📜buildStyleBlocks.js
            📜validatePseudoSelector.js
          📖children.md
          📁constants/
            📜index.js
            📜LIST_SET.js
            📜list-set.js
            📜maps.js
          📜generateMetadata.js
          📜generateMetadata_v2.js
          📜generateRenderData.js
          📜generateRenderData_v2.js
          📜generateRenderData_v3.js
          📜index.js
          📜insertDOMStyleOnce.js
          📜insertStyleOnce.js
          📜loadDevToolsIfAvailable.js
          📜normalizeBaseStyle.js
          📜normalizeDisplay.js
          📜normalizeDOM.js
          📜normalizeStyle.js
          📜normalizeStyle_v2.js
          📖object.md
          📖parse.md
          📜santizeStyle.js
          📜santizeStyle_v2.js
          📁shared/
            📜callback.js
            📜camelToKebab.js
            📜handleError.js
            📜index.js
            📜insertKeyframesOnce.js
            📜insertStyleOnce.js
          📖test.css.md
          📖test_data.md
          📜validatePseudoSelector.js
          📁validators/
            📜suggestSmartTag.js
            📜suggestSmartTag_v2.js
            📜validateHtmlTag.js
      📘tsup.config.ts
    📁debug/
      📁dist/
      🧾jsconfig.json
      📁node_modules/
      🧾package.json
      📁src/
        📜env.js
        📜index.js
        📜isRenderableChildren.js
        📜logStyle.js
      📘tsup.config.ts
    📁dev-tools/
      📁src/
        📜_cache.js
        📜constants.js
        📜handleError.js
        📜index.js
        📜showOverlayError.js
        📜suggestSmartTag.js
        📜suggestSmartTag_v2.js
        📜test.js
        📜validateHtmlTag.js
    📁react-ui/
      📁dist/
      🧾jsconfig.json
      📁node_modules/
      🧾package.json
      📁src/
        📁Box/
          📜Box.js
          📜index.js
        📁Button/
          📜Button.js
          📜index.js
        📜index.js
        📁Input/
          📜index.js
          📜Input.js
        📁theme/
          📜globalStyle.js
          📜index.js
        📁utils/
          📜createItem.jsx
          📜index.js
          📜styled.jsx
      📘tsup.config.ts
  📁playground/
    📁vite/
      📁dist/
      📜eslint.config.js
      🧾index.html
      🧾jsconfig.json
      📁node_modules/
      🧾package.json
      📁public/
        🧾vite.svg
      📁src/
        🧾App.css
        📜App.jsx
        📁assets/
          🧾react.svg
        📁components/
          📜Container.jsx
        🧾index.css
        📜main.jsx
        📁pages/
          📜Home.jsx
          📜Main.jsx
          📜Node.jsx
          📜Root.jsx
          📜Tree.jsx
      📜vite.config.js
  🧾pnpm-lock.yaml
  🧾pnpm-workspace.yaml
  📖README.md
  🧾turbo.json
```

</details>

<details> 
<summary> core </summary>

#### core/

```
📁./core
  📁src/
  📁node_modules/
  📁dist/
  🧾tsup.config.ts
  🧾package.json
  🧾jsconfig.json
```

#### core/\*

```
📁./core
  📁dist/
  🧾jsconfig.json
  📁node_modules/
  🧾package.json
  📁src/
    📁empty/
      📜styleHash.js
    📁hooks/
      📜useDynamicTrigger.js
      📜useDynamicTrigger_v2.js
      📜useDynamicTrigger_v3.js
      📜useDynamicTrigger_v3_useEffect.js
    📜index.js
    📁utils/
      📁builds/
        📜buildBaseModule.js
        📜buildKeyframesModule.js
        📜buildMediaModule.js
        📜buildPseudoModule.js
        📜buildStyleBlocks.js
        📜validatePseudoSelector.js
      📖children.md
      📁constants/
        📜index.js
        📜LIST_SET.js
        📜list-set.js
        📜maps.js
      📜generateMetadata.js
      📜generateMetadata_v2.js
      📜generateRenderData.js
      📜generateRenderData_v2.js
      📜generateRenderData_v3.js
      📜index.js
      📜insertDOMStyleOnce.js
      📜insertStyleOnce.js
      📜loadDevToolsIfAvailable.js
      📜normalizeBaseStyle.js
      📜normalizeDisplay.js
      📜normalizeDOM.js
      📜normalizeStyle.js
      📜normalizeStyle_v2.js
      📖object.md
      📖parse.md
      📜santizeStyle.js
      📜santizeStyle_v2.js
      📁shared/
        📜callback.js
        📜camelToKebab.js
        📜handleError.js
        📜index.js
        📜insertKeyframesOnce.js
        📜insertStyleOnce.js
      📖test.css.md
      📖test_data.md
      📜validatePseudoSelector.js
      📁validators/
        📜suggestSmartTag.js
        📜suggestSmartTag_v2.js
        📜validateHtmlTag.js
  📘tsup.config.ts
```

</details>

<details> 
<summary> react-ui </summary>

#### react-ui/

```
📁./react-ui
  📁src/
  📁node_modules/
  📁dist/
  🧾tsup.config.ts
  🧾package.json
  🧾jsconfig.json
```

#### react-ui/\*

```
📁./react-ui
  📁dist/
  🧾jsconfig.json
  📁node_modules/
  🧾package.json
  📁src/
    📁Box/
      📜Box.js
      📜index.js
    📁Button/
      📜Button.js
      📜index.js
    📜index.js
    📁Input/
      📜index.js
      📜Input.js
    📁theme/
      📜globalStyle.js
      📜index.js
    📁utils/
      📜createItem.jsx
      📜index.js
      📜styled.jsx
  📘tsup.config.ts
```

</details>

<details> 
<summary> debug </summary>

#### debug/

```
📁./debug
  📁src/
  📁node_modules/
  📁dist/
  🧾tsup.config.ts
  🧾package.json
  🧾jsconfig.json
```

#### debug/\*

```
📁./debug
  📁dist/
  🧾jsconfig.json
  📁node_modules/
  🧾package.json
  📁src/
    📜env.js
    📜index.js
    📜isRenderableChildren.js
    📜logStyle.js
  📘tsup.config.ts
```

</details>

<details>
<summary> dev-tools </summary>

#### dev-tools/

```
📁./dev-tools
  📁src/
```

#### dev-tools/\*

```
📁./dev-tools
  📁src/
    📜_cache.js
    📜constants.js
    📜handleError.js
    📜index.js
    📜showOverlayError.js
    📜suggestSmartTag.js
    📜suggestSmartTag_v2.js
    📜test.js
    📜validateHtmlTag.js
```

</details>
