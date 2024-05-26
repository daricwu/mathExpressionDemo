import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
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
                <div className="textarea" id="src"/>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="action">
                <button>Let Go</button>
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
                <div className="textarea" id="analysic"/>
              </td>
              <td>
                <div className="textarea" id="htmlFormat"/>
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
    </>
  )
}

export default App
