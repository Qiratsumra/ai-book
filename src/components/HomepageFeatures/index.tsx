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
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
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
            <Heading as="h1" className={styles.mainTitle}>Physical AI & Humanoid Robotics</Heading>
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
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>

    </>
  );
}