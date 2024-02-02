// Tag.tsx
import React from 'react';
import './styles.scss';

interface TagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
  return <div className="tag">{text}</div>;
};

export default Tag;