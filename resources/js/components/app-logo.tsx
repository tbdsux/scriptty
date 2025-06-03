import { cn } from '@/lib/utils';
import AppLogoIcon from './app-logo-icon';
import { useSidebar } from './ui/sidebar';

export default function AppLogo() {
  const { open, openMobile } = useSidebar();

  return (
    <div
      className={cn(
        'flex items-center space-x-2 transition-all duration-300',
        !open && !openMobile ? 'space-x-0' : '',
      )}
    >
      <div className="flex items-center justify-center">
        <AppLogoIcon
          className={cn(
            'size-10 rounded-full transition-all duration-300',
            !open && !openMobile ? 'h-auto w-full' : '',
          )}
        />
      </div>
      <div className="ml-1 grid flex-1 text-left text-base">
        <span className="mb-0.5 truncate leading-none font-semibold">
          Scriptty
        </span>
      </div>
    </div>
  );
}
