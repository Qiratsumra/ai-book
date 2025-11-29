import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'Bridging the Digital and Physical Worlds',
  favicon: 'img/robot_128_44173.ico',

  url: 'https://qiratsumra.github.com',
  baseUrl: '/',

  organizationName: 'qiratsumra',
  projectName: 'book-ai',

  onBrokenLinks: 'throw',

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        alt: 'My Site Logo',
        src: 'img/robot_128_44173.ico',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {
          href: 'https://github.com/qiratsumra/',
          label: 'GitHub',
          position: 'right',
        },
        
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'LinkedIn',
          items: [
            {
              label: 'LinkedIn', 
              href: 'https://www.linkedin.com/in/qirat-saeed-8048662b7/',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/qiratsumra/',
            },
            {
              label: 'X',
              href: 'https://x.com/Qirat_Saeed1',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/qiratsumra/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Qirat Saeed`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  
  // Modern way to handle broken markdown links (Docusaurus v4 ready)
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
};

export default config;