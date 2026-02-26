"use client";

import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Copy, Check, Code, Eye } from "lucide-react";

interface CodePlaygroundProps {
  initialCode: string;
  language?: "javascript" | "typescript" | "jsx" | "tsx";
  title?: string;
  height?: number;
  readOnly?: boolean;
}

export function CodePlayground({
  initialCode,
  language = "javascript",
  title = "Interactive Example",
  height = 300,
  readOnly = false,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const outputRef = useRef<HTMLIFrameElement>(null);

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");

    try {
      // Capture console output
      const logs: string[] = [];
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;

      console.log = (...args: any[]) => logs.push(args.join(" "));
      console.error = (...args: any[]) => logs.push("ERROR: " + args.join(" "));
      console.warn = (...args: any[]) => logs.push("WARN: " + args.join(" "));

      // Execute the code
      // Note: In production, this should use a sandboxed environment like iframe or Web Worker
      const result = await eval(`(async () => { ${code} })()`);

      // Restore console
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;

      // Format output
      let outputText = logs.join("\n");
      if (result !== undefined) {
        outputText += (outputText ? "\n" : "") + `=> ${JSON.stringify(result, null, 2)}`;
      }

      setOutput(outputText || "Code executed successfully (no output)");
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-[#088395] dark:text-[#7AB2B2]" />
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
            {language}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Toggle preview"
          >
            <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          readOnly={readOnly}
          className="w-full p-4 bg-[#1e1e1e] text-gray-100 font-mono text-sm resize-none focus:outline-none"
          style={{ height: `${height}px` }}
          spellCheck={false}
        />

        {/* Line Numbers */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#1e1e1e] border-r border-gray-700 flex flex-col items-center pt-4 text-xs text-gray-500 font-mono select-none">
          {code.split("\n").map((_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Output */}
      {output && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Output:</h4>
          <pre className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          {!readOnly && (
            <>
              <button
                onClick={runCode}
                disabled={isRunning}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isRunning
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                <Play className="w-4 h-4" />
                {isRunning ? 'Running...' : 'Run Code'}
              </button>

              <button
                onClick={resetCode}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </>
          )}
        </div>

        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Instructions */}
      <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Tip:</strong> Modify the code above and click "Run Code" to see the results instantly!
          {readOnly && " This is a read-only example - try it in the playground."}
        </p>
      </div>
    </div>
  );
}

// Inline code editor for smaller snippets
export function InlineCodeEditor({
  code,
  language = "javascript",
  editable = false,
}: {
  code: string;
  language?: string;
  editable?: boolean;
}) {
  const [value, setValue] = useState(code);

  return (
    <div className="my-4">
      <div className="relative rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-600 flex flex-col items-center pt-3 text-xs text-gray-500 font-mono select-none">
          {value.split("\n").map((_, i) => (
            <div key={i} className="leading-6">{i + 1}</div>
          ))}
        </div>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          readOnly={!editable}
          className="w-full p-3 pl-10 bg-[#1e1e1e] text-gray-100 font-mono text-sm resize-none focus:outline-none"
          rows={Math.max(3, value.split("\n").length)}
          spellCheck={false}
        />
      </div>
      {editable && (
        <button className="mt-2 text-sm text-[#088395] hover:text-[#09637E] font-medium">
          Try this example →
        </button>
      )}
    </div>
  );
}