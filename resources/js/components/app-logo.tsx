import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="size">
        <AppLogoIcon className="size-10 rounded-full" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-base">
        <span className="mb-0.5 truncate leading-none font-semibold">
          Scriptty
        </span>
      </div>
    </div>
  );
}
