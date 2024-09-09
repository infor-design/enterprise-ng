# Phoenix NG Development Notes

## Goals

- This project is not dead. Will be continued to develop into the future
- Remove enterprise dependency and include it directly in this project
- Deprecate Classic and Implement Tokens for theming and future themes
- Remove jQuery dependency
- Consumers are free to decide between this project and Web Components
- Better feature parity
- Cleaner Examples
- Clean up code base and remove legacy code that caused issues
- Increase test coverage and stability

## Converting/Working on a Component

### Add Enterprise Css



- Add Enterprise js
- Convert to TS
- Import that component and update the component initialization
- Add unit/e2e tests
- Convert Examples to use directives / add missing directives
- Fix Lint Issues
- Cleanup css
- Remove (some) jquery
- Sync Examples for enterprise (only useful ones)
    - Go to the component page https://main-enterprise.demo.design.infor.com/components/tag
    - Look for pages that are not tests only or useful to show and add them
    - Preferred to combine them onto as few pages as possible
- Cleanup and add to docs
- Add Tokens
    - Search for $
    - Replace it with tokens checking the wc component tokens and ids-foundation
    - And check the design

