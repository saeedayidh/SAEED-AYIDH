import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { ContentFieldsSection } from '../components/ContentFieldsSection';
import { WorkFieldsSection } from '../components/WorkFieldsSection';
import { ServicesSection } from '../components/ServicesSection';
import { NewsSection } from '../components/NewsSection';
import { ResourcesSection } from '../components/ResourcesSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { HelpAndBlogSection } from '../components/HelpAndBlogSection';
import { ActionCardsSection } from '../components/ActionCardsSection';
import { FinalContactCta } from '../components/FinalContactCta';
import { SaeedPlatformSection } from '../components/SaeedPlatformSection';
export const HomePage:React.FC=()=> <div className="animate-fade-in">
<HeroSection/>
<SaeedPlatformSection ids={['numbers','id','digital-card','press']}/>
<WorkFieldsSection/>
<ServicesSection/>
<PortfolioSection/>
<SaeedPlatformSection ids={['projects','labs']}/>
<ContentFieldsSection/>
<SaeedPlatformSection ids={['play','stories','music','frame','schedule','countdown','ideas','cinema','background-audio','interactive-stories','live-radar','content-filter','interactive-preview','fan-club']}/>
<ResourcesSection/>
<SaeedPlatformSection ids={['wallpapers']}/>
<NewsSection/>
<SaeedPlatformSection ids={['archive','questions','notify','polls','analytics','performance']}/>
<FinalContactCta/><HelpAndBlogSection/><ActionCardsSection/>
</div>;
