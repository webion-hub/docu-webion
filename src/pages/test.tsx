"use client";

import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";

const code = `
import React from 'react';

function ButtonExample() {
  const [state, setState] = React.useState(0);

  return (
    <button
      onClick={() => setState(state + 1)}
    >
      {state}
    </button>
  );
}

export default ButtonExample
`;

export default function Test() {
  return <CodeRenderer code={code} />;
}

const EXPORT_DEFAULT_REGEXP = new RegExp("export default *([^;]*)");
const IMPORTS_UNNAMED = /import\s*['"]([^'"]+)['"];?/gi;
const IMPORTS_NAMED =
  /import\s*(\*\s*as)?\s*(\w*?)\s*,?\s*(?:\{([\s\S]*?)\})?\s*from\s*['"]([^'"]+)['"];?/gi;

type CodeRendererProps = {
  readonly code: string;
};

function CodeRenderer({ code }: CodeRendererProps) {
  const transformCode = (code: string) => {
    const possibleMatch = EXPORT_DEFAULT_REGEXP.exec(code);
    return code
      .replace(
        EXPORT_DEFAULT_REGEXP,
        `render(<${possibleMatch?.[1].trim()} />);`
      )
      .replace(IMPORTS_UNNAMED, "")
      .replace(IMPORTS_NAMED, "");
  };

  return (
    <div
      style={{
        border: "1px solid #eaeaea",
        borderRadius: "16px",
      }}
    >
      <LiveProvider
        noInline
        transformCode={transformCode}
        code={code}
        language="tsx"
      >
        <div
          style={{
            padding: "16px",
          }}
        >
          <LivePreview />
        </div>
        <div
          style={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <LiveEditor />
        </div>
        <LiveError />
      </LiveProvider>
    </div>
  );
}
