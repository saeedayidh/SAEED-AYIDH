import definitions from '../../shared/smart-link-platforms.json';
export const smartLinkPlatforms = definitions;
export type SmartLinkPlatform = typeof definitions[number];
export type SmartLinkAccount = { platform: string; value: string; url: string };
export const defaultSmartTheme = { background: '#090909', card: '#171717', text: '#ffffff', secondary: '#9ca3af', accent: '#D51F2B', intensity: 35 };
export type SmartLinkTheme = typeof defaultSmartTheme;
export type SmartLinkProfile = { name: string; username?: string; bio: string; avatar?: string; banner?: string; theme?: SmartLinkTheme; accounts: SmartLinkAccount[]; path: string };
export const smartAccountUrl = (platform: SmartLinkPlatform, input: string) => {
  let value = input.trim().replace(/^@/, '');
  if (platform.kind === 'phone') {
    value = value.replace(/[٠-٩]/g, digit => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit))).replace(/[\s()+-]/g, '').replace(/^00/, '');
  }
  if (platform.kind === 'appId') value = value.replace(/^id/i, '');
  return platform.prefix + (['phone', 'appId'].includes(platform.kind) ? value : encodeURIComponent(value));
};
