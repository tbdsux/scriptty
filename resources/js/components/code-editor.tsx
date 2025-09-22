import { LanguageCode } from '@/lib/code-defaults';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { atomone } from '@uiw/codemirror-themes-all';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { useCallback } from 'react';
import '../../css/custom-code.css';

const handleLoadLanguage = (lang: LanguageCode) => {
  const ext = loadLanguage(lang);
  if (!ext) return [];

  return ext;
};

export default function CodeEditor(props: {
  value: string;
  onChange: (value: string) => void;
  lang: LanguageCode;
  height?: string;
  readOnly?: boolean;
}) {
  // wrap onchange with useCallback to avoid re-rendering the component
  const handleChange = useCallback((value: string) => {
    props.onChange(value);
  }, []);

  return (
    <div className="relative block">
      <CodeMirror
        value={props.value.replace(/\\n/g, '\n')}
        onChange={handleChange}
        lang={props.lang}
        height={props.height || '700px'}
        width="100%"
        theme={atomone}
        readOnly={props.readOnly}
        aria-readonly={props.readOnly}
        className=""
        extensions={[handleLoadLanguage(props.lang)!, EditorView.lineWrapping]}
        basicSetup={{
          foldGutter: false,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: false,
        }}
      />
    </div>
  );
}
