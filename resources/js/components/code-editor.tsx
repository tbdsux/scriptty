import { LanguageName, loadLanguage } from '@uiw/codemirror-extensions-langs';
import { atomone } from '@uiw/codemirror-themes-all';
import CodeMirror from '@uiw/react-codemirror';

import '../../css/custom-code.css';

export default function CodeEditor(props: {
  value: string;
  onChange: (value: string) => void;
  lang: LanguageName;
  height?: string;
  readOnly?: boolean;
}) {
  return (
    <div className="">
      <CodeMirror
        value={props.value.replace(/\\n/g, '\n')}
        onChange={props.onChange}
        lang={props.lang}
        height={props.height ?? '700px'}
        theme={atomone}
        readOnly={props.readOnly}
        aria-readonly={props.readOnly}
        className="rounded-xl!"
        extensions={[loadLanguage(props.lang)!]}
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
