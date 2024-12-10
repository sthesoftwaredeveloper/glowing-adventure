import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface QuestionTooltipProps {
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

export function QuestionTooltip({
  content,
  side = 'right',
  className
}: QuestionTooltipProps) {
  const formatContent = (content: string) => {
    if (!content) return null;

    return content.split('\n').map((line, index) => {
      const trimmedLine = line.trim();

      // Handle bullet points with proper spacing and styling
      if (trimmedLine.startsWith('•')) {
        return (
          <React.Fragment key={index}>
            <li className="ml-4 mb-2 last:mb-0">{trimmedLine}</li>
          </React.Fragment>
        );
      }

      // Handle numbered lists with proper styling
      if (/^\d+\./.test(trimmedLine)) {
        return (
          <React.Fragment key={index}>
            <li className="ml-4 mb-2 last:mb-0 list-decimal">{trimmedLine}</li>
          </React.Fragment>
        );
      }

      // Handle section headers (lines ending with colon)
      if (trimmedLine.endsWith(':')) {
        return (
          <React.Fragment key={index}>
            <h4 className="font-medium text-gray-100 mb-2">{trimmedLine}</h4>
          </React.Fragment>
        );
      }

      // Handle links
      if (trimmedLine.includes('[') && trimmedLine.includes(']')) {
        const linkMatch = trimmedLine.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
          const [, text, url] = linkMatch;
          return (
            <React.Fragment key={index}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 underline transition-colors"
              >
                {text}
              </a>
              <br />
            </React.Fragment>
          );
        }
      }

      // Default line handling
      return (
        <React.Fragment key={index}>
          {trimmedLine}
          {index < content.split('\n').length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            className={cn(
              "inline-flex text-gray-400 hover:text-gray-600 transition-colors duration-200",
              className
            )}
            aria-label="View more information"
          >
            <HelpCircle size={18} />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="
              bg-gray-900/95
              px-4
              py-3
              rounded-lg
              shadow-lg
              max-w-md
              text-sm
              text-gray-100
              leading-relaxed
              backdrop-blur-sm
              border
              border-gray-800/50
              animate-in
              fade-in
              duration-200
              z-50
              [&>ul]:list-disc
              [&>ul]:ml-4
              [&>ul]:mt-2
              [&>ul]:space-y-1
            "
            side={side}
            sideOffset={5}
            collisionPadding={8}
          >
            <div className="space-y-1">
              {formatContent(content)}
            </div>
            <Tooltip.Arrow className="fill-gray-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}