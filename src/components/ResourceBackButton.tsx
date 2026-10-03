import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function ResourceBackButton({ tools = false }: { tools?: boolean }) {
  const { isArabic } = useLanguage();
  const Icon = isArabic ? ArrowRight : ArrowLeft;
  return <Link to={tools ? '/#tools-section' : '/#resources-section'} className="sba-back-button mb-6">
    <Icon className="h-4 w-4" aria-hidden="true"/>{isArabic ? 'الرجوع' : 'Back'}
  </Link>;
}
