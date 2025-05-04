# Insta Stories

This is a simple webapp which demonstrates the instagram story feature.

## Deployed URL

[https://myinstastories.netlify.app/](https://myinstastories.netlify.app/)

## Features

- Users can view one of the available stories from list.

- Users can manually navigate between stories using UI controls. Tapping on the left side of an open story takes to the previous story & tapping on the right side of an open story takes to the next story.

- Stories automatically advance to the next one after 5 seconds.

- Proper loading states are handled using Skeleton loaders.

## Quickstart

After cloning the repo in local, move to the branch _**feature/stories**_ & then run the following -

```bash
npm install
```

## How to run testcases in local

- **Playwright** is used to write the end-to-end(e2e) testcases for this project. It is an open-source automation library for browser testing and web scraping, developed by Microsoft.

- To run the testcases, the application has to be locally run first. After that run the following command -

  ```bash
  npm run test
  ```

  If any of the testcases fail, it will
  automatically open a report on localhost 9323
  where you can see which tescases failed or
  succeeded.

  If you want to manually open the reports, you can
  run the command -

  ```bash
  npm run test:report
  ```

- You can also run the testcases on playwright UI, for
  that, run the following command -
  ```bash
  npm run test:ui
  ```
  It will open a separate playwright UI for you
  where u can run all the testcases together as well
  as separately with a play button. And on the right
  you can see the testcases running on your UI which
  is very intuitive.

## Architecture Overview

- This is a React & TypeScript based application
  which follows component based architecture. There
  are basically four main components -

  `Header`: Top header component.

  `StoryList`: Displays story thumbnails in a
  horizontal scrollable list.

  `StoryViewer`: Handles the full-screen story
  viewing experience.

  `Post`: Renders individual posts with images,
  likes, and comments.

- **Performance Optimizations:**

  1. Images are loaded with a loading state and
     `skeleton UI` which prevents layout shifts and
     improves perceived performance.

     ```javascript
     const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});
     ```

  2. Progress tracking feature is handled efficiently through proper
     cleanup in useEffect using `setInterval`.
     ```javascript
     useEffect(() => {
       let interval: NodeJS.Timeout;
       if (!isLoading) {
         interval = setInterval(() => {
           // progress logic
         }, 100);
       }
       return () => {
         if (interval) {
           clearInterval(interval);
         }
       };
     }, [dependencies]);
     ```
  3. State management is handled properly using `useState` and
     `useEffect` hooks. Memoized callbacks with `useCallback` are used
     to prevent unnecessary re-renders.

     ```javascript
     const goToNextStory = useCallback(() => {
       if (currentUserStoryIndex < currentUserStories.length - 1) {
          // some logic...
      } else {
          // some logic...
      }
     },
     [
       currentIndex,
       stories,
       currentUserStories,
       currentUserStoryIndex,
       ...
     ]);
     ```

- **Scalability Considerations:**

  1. Clean type definitions for all components with typescript
     interfaces that can accommodate future features.
  2. CSS modules prevent style conflicts.
  3. Memory-efficient image loading strategy.

  Although some potential improvements can be done when it will go large
  scale -

  Currently we are using static data but in real all these will be
  fetched from APIs. In that scenario, techniques like pagination,
  virtual scrolling for large lists, image preloading for next stories,
  error boundaries, offline support, caching strategies should be
  implemented for better performance. Global state management has to be
  implemented using Redux like tools.
