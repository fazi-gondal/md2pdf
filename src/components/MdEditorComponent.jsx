import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { EditorView } from "@codemirror/view";
import { vscodeDark } from '@uiw/codemirror-themes-all';
import CodeMirror from "@uiw/react-codemirror";
import { useContext } from "react";
import Context from "../context/ContextProvider";

function MdEditorComponent() {
  const { text, setText } = useContext(Context);

  return (
    <div className="h-full w-full min-w-[50%] sm:w-[50%] print:hidden">
      <CodeMirror
        value={text}
        onChange={(value) => setText(value)}
        theme={vscodeDark}
        minHeight="100%"
        height="100%"
        extensions={[
          markdown([{ base: markdownLanguage, codeLanguages: languages }]),
          EditorView.lineWrapping,
        ]}
        className="h-full min-h-full max-w-full text-base leading-6"
        autoFocus={true}
      />
    </div>
  );
}

export default MdEditorComponent;
