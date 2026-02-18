'use client';

import React from 'react';
import HomePage from './HomePage';

// --- Types & Interfaces (PageContent / RevenueArchitect-style) ---

export interface StatItem {
  label: string;
  value: string;
}

export interface MethodologyStep {
  number: string;
  title: string;
  description: string;
  icon: string;
  progress: string;
}

export interface ExpertiseItemContent {
  title: string;
  icon: string;
  tags: string[];
  description: string;
}

export interface CaseStudyItem {
  title: string;
  description: string;
  outcomeLabel?: string;
  outcomeValue?: string;
  quote?: string;
}

export interface FounderTimelineItem {
  icon: string;
  title: string;
  description: string;
}

export interface PageContent {
  hero: {
    badge: string;
    titleStart: string;
    titleGradient: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  stats: StatItem[];
  methodology: {
    title: string;
    description: string;
    steps: MethodologyStep[];
  };
  expertise: {
    title: string;
    items: ExpertiseItemContent[];
  };
  quote: {
    text: string;
    highlight: string;
  };
  caseStudies: {
    title: string;
    subtitle: string;
    items: CaseStudyItem[];
    industries?: CaseStudyItem[];
  };
  founder?: {
    name: string;
    role: string;
    image: string;
    bio: string;
    yearsExperience: string;
    timeline: FounderTimelineItem[];
  };
  ctaBottom: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
}

/** Content type for the Home template (RevenueArchitect-style layout). */
export type HomeTemplateContent = PageContent;

export type HomeTemplateProps = {
  theme?: 'dark' | 'light';
  content: HomeTemplateContent;
  pageTitle?: string;
  heroVisualId?: string;
};

// --- Template Component (body only; layout provides header/footer) ---

export default function HomeTemplate({ content }: HomeTemplateProps) {
  return <HomePage content={content as React.ComponentProps<typeof HomePage>['content']} />
}
