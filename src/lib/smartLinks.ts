import definitions from '../../shared/smart-link-platforms.json';
export const smartLinkPlatforms = definitions;
export type SmartLinkPlatform = typeof definitions[number];
export type SmartLinkAccount = { platform: string; value: string; url: string };
export type SmartLinkProfile = { name: string; bio: string; accounts: SmartLinkAccount[]; primary: string; path: string };
export const smartAccountUrl = (platform: SmartLinkPlatform, input: string) => {
  let value = input.trim().replace(/^@/, '');
  if (platform.kind === 'phone') {
    value = value.replace(/[٠-٩]/g, digit => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit))).replace(/[\s()+-]/g, '').replace(/^00/, '');
  }
  if (platform.kind === 'appId') value = value.replace(/^id/i, '');
  return platform.prefix + (['phone', 'appId'].includes(platform.kind) ? value : encodeURIComponent(value));
};
