export interface Story {
  id: string;
  imageUrl: string;
  username: string;
}

export interface StoryListProps {
  stories: Story[];
  onStoryClick: (index: number) => void;
}

export interface StoryViewerProps {
  stories: Story[];
  selectedIndex: number;
  onClose: () => void;
}

export interface PostProps {
  username: string;
  userAvatar: string;
  imageUrl: string;
  likes: number;
  caption: string;
}

export interface Post {
  id: number;
  username: string;
  userAvatar: string;
  imageUrl: string;
  likes: number;
  caption: string;
}
