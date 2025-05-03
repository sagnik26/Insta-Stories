import React, { useState } from "react";
import { stories } from "./constants/stories";
import StoryList from "./components/StoryList";
import StoryViewer from "./components/StoryViewer";
import "./App.css";

const App: React.FC = () => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(
    null
  );

  const handleStoryClick = (index: number) => {
    setSelectedStoryIndex(index);
  };

  const handleClose = () => {
    setSelectedStoryIndex(null);
  };

  return (
    <div className="app">
      <StoryList stories={stories} onStoryClick={handleStoryClick} />
      {selectedStoryIndex !== null && (
        <StoryViewer stories={stories} initialIndex={0} onClose={handleClose} />
      )}
    </div>
  );
};

export default App;
