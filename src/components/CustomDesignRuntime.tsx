import React, { useMemo } from 'react';
import { useCMS } from '../context/CMSContext';

const escapeClosingScript = (value: string) => value.replace(/<\/script/gi, '<\\/script');

export const CustomDesignRuntime: React.FC = () => {
  const { data } = useCMS();
  const design: any = (data.global as any).customDesign || {};

  const srcDoc = useMemo(() => {
    const html = String(design.html || '');
    const css = String(design.css || '');
    const js = escapeClosingScript(String(design.js || ''));
    return `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;padding:0;background:transparent}${css}</style></head><body>${html}<script>${js}<\/script></body></html>`;
  }, [design.html, design.css, design.js]);

  if (!design.enabled || (!design.html && !design.css && !design.js)) return null;

  return (
    <iframe
      title="التصميم المخصص"
      sandbox="allow-scripts"
      srcDoc={srcDoc}
      referrerPolicy="no-referrer"
      className="block w-full border-0 bg-transparent"
      style={{ minHeight: 320 }}
    />
  );
};
