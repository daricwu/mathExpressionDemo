import { useState } from 'react'
import './App.css'
import { formatExpressionInHTML, seperateTokens } from './utils/helper'
import { ConditionWrapper } from './style'

function App() {
  const [src, setSrc] = useState("mv_ud1*3 - 7*pow(8,2)")
  const [htmlFormat, setHtmlFormat] = useState("")
  const [analysic, setAnalysic] = useState("")

  const handleClick = () => {
    setAnalysic(JSON.stringify(seperateTokens(src)))
    setHtmlFormat(formatExpressionInHTML(src))
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
                <div contentEditable="true"  className="textarea" id="src">
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
                <div className="textarea error" id="errors"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ConditionWrapper>
  )
}

export default App
