import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export default function CopyCode(props: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard
      .writeText(props.code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy code: ', err);
      });
  };

  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={copyCode}
            className="h-auto cursor-pointer py-1 text-xs"
            variant={'outline'}
          >
            {copied ? (
              <>
                <CheckIcon className="size-3" />
                Copied
              </>
            ) : (
              <>
                <CopyIcon className="size-3" />
                Copy
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">
            {copied ? 'Copied!' : 'Copy code to clipboard'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
