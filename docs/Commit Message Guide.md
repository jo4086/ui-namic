# Commit Message Guide

나는 항상 내가 실수해도 일정한 응답으로 나중에 봤을때 파악하기 쉽게 하는걸 좋아해서 나름대로 커밋 스크립트를 만들어서 사용중이였으나 조금 과한 정보를 제공하는 것 같다는 느낌이 들었다

분명 개발자들은 나같은 성향이 많을거라고 생각한 나는 보편적으로 커밋의 규칙도 있을꺼라 생각하여 검색을 한 결과 아래와 같은 규칙을 보통 따른다고 한다.

그러므로 나도 내 커밋 구조를 좀더 단순화하고 커밋의 유형을 추가해서 실험적으로 써보고자 한다.

| 태그 이름        | 설명                                                                      |
| ---------------- | ------------------------------------------------------------------------- |
| Feat             | 새로운 기능을 추가할 경우                                                 |
| Fix              | 버그를 고친 경우                                                          |
| Design           | CSS 등 사용자 UI 디자인 변경                                              |
| !BREAKING CHANGE | 커다란 API 변경의 경우                                                    |
| !HOTFIX          | 급하게 치명적인 버그를 고쳐야하는 경우                                    |
| Style            | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우                     |
| Refactor         | 프로덕션 코드 리팩토링                                                    |
| Comment          | 필요한 주석 추가 및 변경                                                  |
| Docs             | 문서를 수정한 경우                                                        |
| Test             | 테스트 추가, 테스트 리팩토링(프로덕션 코드 변경 X)                        |
| Chore            | 빌드 태스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X) |
| Rename           | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우                        |
| Remove           | 파일을 삭제하는 작업만 수행한 경우                                        |
