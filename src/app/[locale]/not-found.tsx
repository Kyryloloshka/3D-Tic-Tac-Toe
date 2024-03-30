import {useTranslations} from 'next-intl';
 
export default function NotFoundPage() {
  const t = useTranslations('page.not-found');
  return <h1 className=''>{t('text')}</h1>;
}