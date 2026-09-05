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
import { FloatingSiteTools } from '../components/FloatingSiteTools';
import { SaeedClubBanner } from '../components/SaeedClubBanner';
export const HomePage:React.FC=()=> <div className="animate-fade-in">
<FloatingSiteTools/>
<HeroSection/>
<SaeedPlatformSection ids={['numbers','card','press']}/>
<WorkFieldsSection/>
<ServicesSection/>
<PortfolioSection/>
<SaeedPlatformSection ids={['projects']}/>
<ContentFieldsSection/>
<SaeedPlatformSection ids={['play','stories','music','frame','schedule','countdown','ideas']}/>
<SaeedClubBanner/>
<ResourcesSection/>
<SaeedPlatformSection ids={['wallpapers']}/>
<NewsSection/>
<SaeedPlatformSection ids={['archive','polls','analytics']}/>
<FinalContactCta/><HelpAndBlogSection/><ActionCardsSection/>
</div>;
