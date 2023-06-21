"use client";

import {
  Provider,
  Root,
  Trigger,
  Portal,
  Content,
  Arrow,
} from "@radix-ui/react-tooltip";

export function Tooltip({
  children,
  content,
  name,
  side,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  name?: string;
  side?: "top" | "right" | "bottom" | "left";
}) {
  return (
    <Provider>
      <Root delayDuration={0}>
        <Trigger aria-label={name} className="focus:ring-1">
          {children}
        </Trigger>
        <Portal>
          <Content side={side}>
            <div className="p-4 bg-digitalent-blue shadow-lg focus:ring-1 z-50">
              {content}
            </div>
            <Arrow className="text-digitalent-blue stroke-digitalent-blue fill-digitalent-blue"></Arrow>
          </Content>
        </Portal>
      </Root>
    </Provider>
  );
}
