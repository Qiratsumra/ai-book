import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroBackground}>
        <div className={styles.animatedOrbs}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
          <div className={styles.orb3}></div>
        </div>
      </div>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={styles.ctaButton}
              to="/docs/preface">
              Get Started 🤖
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="Learn about Physical AI and Humanoid Robotics">
      <HomepageHeader />
      <main>
        <div className={styles.featuresSection}>
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>🤖</div>
                  <h3>Physical AI</h3>
                  <p>
                    Explore how AI is breaking free from the digital realm and 
                    entering the physical world through robotics and embodied intelligence.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>🦾</div>
                  <h3>Humanoid Robotics</h3>
                  <p>
                    Discover the latest developments in humanoid robots and how 
                    they're designed to interact naturally with human environments.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>🔬</div>
                  <h3>Practical Learning</h3>
                  <p>
                    Follow comprehensive tutorials and hands-on guides to understand 
                    the technology behind modern robotics systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}