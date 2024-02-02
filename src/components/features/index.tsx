import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import './styles.scss';

// Add all icons to the library so we can use it in this component
library.add(fas, far, fab);

interface FeatureProps {
  icon: any;
  text: string;
}

interface FeaturesProps {
  icon?: any;
  featureObj?: FeatureProps[];
  showAll?: boolean;
  features?: any
}

const Feature: React.FC<FeatureProps> = ({ icon, text }) => (
  <div className="feature">
    <FontAwesomeIcon icon={icon} style={{ color: `hsl(${Math.random() * 360}, 70%, 50%)` }} />
    <p>{text}</p>
  </div>
);

const Features: React.FC<FeaturesProps> = ({ features }) => {
  return (
    <div className="features">
      <div className="feature-list">
        {features?.map((feature: { icon: any; text: string; }, index: React.Key | null | undefined) => (
          <Feature key={index} icon={feature.icon} text={feature.text} />
        ))}
      </div>
    </div>
  );
};

export default Features;