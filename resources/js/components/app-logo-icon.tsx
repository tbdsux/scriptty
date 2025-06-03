import darkLogo from '@/assets/logo-dark.png';
import lightLogo from '@/assets/logo.png';
import { cn } from '@/lib/utils';
import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(
  props: ImgHTMLAttributes<HTMLImageElement>,
) {
  return (
    <>
      <img
        src={lightLogo}
        alt="Light Logo"
        {...props}
        className={cn('dark:hidden', props.className)}
      />
      <img
        src={darkLogo}
        alt="Dark Logo"
        {...props}
        className={cn('hidden dark:block', props.className)}
      />
    </>
  );
}
