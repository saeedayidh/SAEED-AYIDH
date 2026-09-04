import React, { useEffect } from 'react';
import { useCMS } from '../context/CMSContext';

export const CustomDesignRuntime: React.FC = () => {
  const { data } = useCMS();
  const design: any = (data.global as any).customDesign || {};

  useEffect(() => {
    let style = document.getElementById('sba-custom-css') as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement('style');
      style.id = 'sba-custom-css';
      document.head.appendChild(style);
    }
    style.textContent = design.css || '';
    return () => { if (style) style.textContent = ''; };
  }, [design.css]);

  useEffect(() => {
    const old = document.getElementById('sba-custom-js');
    old?.remove();
    if (!design.js) return;
    const script = document.createElement('script');
    script.id = 'sba-custom-js';
    script.textContent = design.js;
    document.body.appendChild(script);
    return () => script.remove();
  }, [design.js]);

  if (!design.enabled || !design.html) return null;
  return <div id="sba-custom-html" dangerouslySetInnerHTML={{ __html: design.html }} />;
};
