import { useEffect, useRef, useState } from 'react'
import './App.css'
import { formatExpressionInHTML, seperateTokens, validateMathExpression } from './utils/helper'
import { ConditionWrapper } from './style'
import EditCaretPositioning from './caretPosition'

function App() {
  const [src, setSrc] = useState("mv_ud1*3 - 7*sqrt + 8*2")
  const [htmlFormat, setHtmlFormat] = useState("")
  const [analysic, setAnalysic] = useState("")
  const [errors, setErrors] = useState("")
  const contentRef = useRef<HTMLDivElement | null>(null);
  const caretPos = useRef();

  useEffect(() => {
    if (!contentRef || !contentRef.current) return;
    EditCaretPositioning.setCaret(contentRef.current, caretPos.current);
    contentRef.current.focus();
  }, [src]);


  const handleUpdateSrc = (event: any) => {
    const textContent = event.currentTarget.textContent
    setSrc(textContent)
    if (contentRef && contentRef.current) {
      caretPos.current = EditCaretPositioning.getCaret(contentRef.current)
    }
  }

  const handleClick = () => {
    const html = formatExpressionInHTML(src)
    setAnalysic(JSON.stringify(seperateTokens(src)))
    setHtmlFormat(html)
    setErrors(validateMathExpression(src))
  }

  return (
    <ConditionWrapper>
      <div className="flex w-full">
        <table className="table">
          <tbody>
            <tr>
              <td colSpan={2}>
                <strong>Expression</strong>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div ref={contentRef} suppressContentEditableWarning={true} onInput={handleUpdateSrc} contentEditable="true"  className="textarea" id="src">
                  {src}
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="action">
                <button onClick={handleClick}>Let Go</button>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Analysic</strong>
              </td>
              <td>
                <strong>HTML Format</strong>
              </td>
            </tr>
            <tr>
              <td>
                <div dangerouslySetInnerHTML={{ __html: analysic }}  className="textarea" id="analysic"/>
              </td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: htmlFormat }} className="textarea" id="htmlFormat"/>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div dangerouslySetInnerHTML={{ __html: errors }} className="textarea error" id="errors"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ConditionWrapper>
  )
}

export default App
