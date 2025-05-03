export interface Story {
  id: string;
  imageUrl: string;
  username: string;
}

export interface StoryListProps {
  stories: Story[];
  onStoryClick: (index: number) => void;
}
