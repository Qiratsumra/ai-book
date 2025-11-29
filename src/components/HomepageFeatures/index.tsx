import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Physical AI Systems',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        AI systems that function in reality and comprehend physical laws. 
        Bridging the gap between digital brain and physical body.
      </>
    ),
  },
  {
    title: 'Embodied Intelligence',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Design, simulate, and deploy humanoid robots capable of natural 
        human interactions using ROS 2, Gazebo, and NVIDIA Isaac.
      </>
    ),
  },
  {
    title: 'Vision-Language-Action',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        The convergence of LLMs and Robotics. Voice commands to action 
        using OpenAI Whisper and cognitive planning with GPT models.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIconContainer}>
          <div className={styles.iconWrapper}>
            <Svg className={styles.featureSvg} role="img" />
          </div>
          <div className={styles.glowEffect}></div>
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>
            <span className={styles.titleText}>{title}</span>
          </Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
        <div className={styles.hoverEffect}></div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <>
      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h1" className={styles.mainTitle}>
              <span className={styles.titleGradient}>Physical AI & Humanoid Robotics</span>
            </Heading>
            <p className={styles.tagline}>Bridging the gap between digital intelligence and physical embodiment</p>
            <div className={styles.overview}>
              <p>
                The future of AI extends beyond digital spaces into the physical world. This capstone quarter 
                introduces Physical AI—AI systems that function in reality and comprehend physical laws. 
                Students learn to design, simulate, and deploy humanoid robots capable of natural human 
                interactions using ROS 2, Gazebo, and NVIDIA Isaac.
              </p>
            </div>
          </div>
          <div className={`row ${styles.featuresRow}`}>
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
        
        {/* Add SVG gradient definitions */}
        <svg width="0" height="0" className={styles.svgGradient}>
          <defs>
            <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="50%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="title-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="50%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </section>
    </>
  );
}