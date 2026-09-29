import{SaeedMapNode}from'./saeedMapData';

const names:Record<string,string>={
saeed:'Saeed Bin Ayidh',intro:'About',content:'Content & Media',projects:'Business & Projects',digital:'Digital Ecosystem',accounts:'Main Accounts',services:'Saeed Services',
'about-me':'Who I Am',bio:'About Saeed','saeed-fields':'Saeed Fields','saeed-works':'Saeed Works','contact-info':'Contact Information','official-accounts':'Official Accounts',
stories:'Saeed Stories',vlogs:'Saeed Vlogs',music:'Saeed Bin Ayidh',extra:'Saeed Extra',
'story-hotel':'Hotel in the Middle of the Forest','story-village':'The Mysterious Village','story-jinn':'A Jinn Messing With Me','story-well':'Barhout Well',
'stories-accounts':'Saeed Stories Accounts','stories-channels':'Saeed Stories Channels','vlogs-accounts':'Saeed Vlogs Accounts','vlogs-channels':'Saeed Vlogs Channels',
'music-waiting':'Waiting for Your Eid','music-why':'Why, My Love?','music-accounts':'Saeed Music Accounts','music-channels':'Saeed Music Channels',
creative:'Saeed Creative',frame:'Saeed Frame',empire:'Saeed Empire',events:'Saeed Events',recruitment:'Saeed Recruitment',
'official-site':'Official Website',academy:'Saeed Academy',library:'Saeed Library',centerhelp:'Saeed CenterHelp',support:'Saeed Support',bots:'Saeed Bots',notes:'Saeed Notes',requests:'Requests',emails:'Saeed Emails',products:'Saeed Products',
home:'Home',blog:'Saeed Blog',news:'Saeed News','site-services':'Saeed Services',works:'Saeed Works',suggestions:'Suggestions',complaints:'Complaints',wallpapers:'Mobile Wallpapers',watchfaces:'Watch Faces',prompts:'Prompts',shortcuts:'Shortcuts','accounts-page':'Accounts Page','filters-page':'Filters',resources:'Saeed Tools & Resources','main-accounts-saeed':'Saeed Bin Ayidh',
design:'Saeed Design',manager:'Saeed Manager','content-services':'Saeed Content',cloud:'Saeed Cloud',
'service-design-logo':'Logo Design','service-design-banner':'Banner Design','service-design-post':'Post Design','service-design-story':'Story Background Design','service-design-ui':'User Interface Design',
'service-manager-social':'Social Media Management','service-manager-store':'Online Store Management','service-manager-content':'One-Month Content Management',
'service-content-ad-idea':'Advertising Idea Writing','service-content-idea':'Content Idea Writing','service-content-script':'Script Writing','service-content-ad-video':'Advertising Video Production','service-content-event':'Conference or Event Coverage',
'service-cloud-website':'Website Development','service-cloud-landing':'Landing Page Development','service-cloud-links':'Social Links Website Development'
};

const descriptions:Record<string,string>={
saeed:'The central person and personal brand.',
intro:'Information about Saeed Bin Ayidh, his fields, work, and contact channels.',
content:'Content and media fields under Saeed Bin Ayidh.',
projects:'Personal projects and entities under Saeed Bin Ayidh.',
digital:'Websites, platforms, tools, and digital products under Saeed.',
accounts:'Main accounts in the Saeed ecosystem. Open Saeed Bin Ayidh to view his official accounts and channels.',
services:'The main service groups offered by Saeed.',
'about-me':'The profile page for Saeed Bin Ayidh.',bio:'A brief introduction to Saeed Bin Ayidh.','saeed-fields':'The fields in which Saeed works and creates.','saeed-works':'Completed work and projects.','contact-info':'Ways to contact Saeed Bin Ayidh.','official-accounts':'Saeed’s main official accounts.',
stories:'Story content.',vlogs:'Vlogs, life, experiences, and travel content.',music:'Sheylat, poetry, and audio content.',extra:'Gaming and gaming-related content.',
'story-hotel':'A story from Saeed Stories.','story-village':'A story from Saeed Stories.','story-jinn':'A story from Saeed Stories.','story-well':'A story from Saeed Stories.',
'stories-accounts':'Accounts connected to Saeed Stories.','stories-channels':'Channels connected to Saeed Stories.','vlogs-accounts':'Accounts connected to Saeed Vlogs.','vlogs-channels':'Channels connected to Saeed Vlogs.',
'music-waiting':'A sheyla from Saeed Bin Ayidh’s audio content.','music-why':'A sheyla from Saeed Bin Ayidh’s audio content.','music-accounts':'Accounts connected to Saeed Music.','music-channels':'Channels connected to Saeed Music.',
creative:'A project focused on creative work and content.',frame:'A project dedicated to photography.',empire:'Saeed’s community and server.',events:'Saeed’s events and entertainment community.',recruitment:'Saeed Bin Ayidh’s recruitment platform.',
'official-site':'The official Saeed Bin Ayidh website.',academy:'Educational content section.',library:'Library and resources.',centerhelp:'Help center.',support:'Help and support through Saeed Support.',bots:'Saeed bots.',notes:'Notes and related content.',requests:'Requests, forms, and related services.',emails:'Email contact methods by purpose.',products:'Saeed’s website templates and digital products.',
'product-nova':'Nova landing page product.','product-vanta':'Vanta landing page product.','product-account':'Account page product.',
home:'The official website homepage.',blog:'Saeed Bin Ayidh’s blog.',news:'Saeed news and updates.','site-services':'Saeed Services page.',works:'Saeed Works page.',suggestions:'Submit suggestions.',complaints:'Submit complaints.',wallpapers:'Mobile wallpapers section.',watchfaces:'Watch faces section.',prompts:'Prompts section.',shortcuts:'Shortcuts section.','accounts-page':'A page that brings together accounts and platforms.','filters-page':'Filters section.',resources:'Digital tools and resources.','main-accounts-saeed':'The official main accounts and channels of Saeed Bin Ayidh.',
design:'Design services group.',manager:'Management services group.','content-services':'Content services group.',cloud:'Website and digital solutions services group.'
};

const platformDescription=(n:SaeedMapNode)=>{
 const p=n.platform||n.name;
 if(n.id.startsWith('main-'))return `Saeed Bin Ayidh’s main official ${p} account or channel.`;
 if(n.id.startsWith('stories-'))return `Saeed Stories on ${p}.`;
 if(n.id.startsWith('vlogs-'))return `Saeed Vlogs on ${p}.`;
 if(n.id.startsWith('music-'))return `Saeed Music on ${p}.`;
 if(n.id.startsWith('empire-'))return `Saeed Empire on ${p}.`;
 if(n.id.startsWith('events-'))return `Saeed Events on ${p}.`;
 return n.description;
};

export const getSaeedMapEnglish=(n:SaeedMapNode)=>{
 const name=names[n.id]||n.name;
 let description=descriptions[n.id];
 if(!description&&n.type==='platform')description=platformDescription(n);
 if(!description&&n.type==='service')description=`${name} service.`;
 return{name,description:description||n.description};
};
