import { useEffect, useState } from 'react'
import { Document } from './types/Document'
import RealTimeFroalaEditor from './components/RealTimeFroalaEditor';
import './App.css'

function App() {
  const { Codox } = window as any
  const apiKey = process.env.REACT_APP_CODOX_API_KEY!
  console.log(apiKey)
  const username = 'Kera'
  const [docs, updateDocs] = useState([
    { "id": "8d52d64b-f7c5-40de-8137-629376ffbc76", name: "doc1", "content": "Hello World" },
    { "id": "8d52d64b-f7c5-40de-8137-629376ffbc77", name: "doc2", "content": "One two three" },
  ])
  const [activeDoc, setActiveDoc] = useState(docs[0])
  const [codox, setCodoxInstance] = useState<any>(null)

  useEffect(() => {
    const codoxInstance = new Codox()
    setCodoxInstance(codoxInstance)
  }, [])

  const changeActiveDoc = (doc: Document) => {
    if (doc.id !== activeDoc.id) {
      codox && codox.stop();
    }

    const codoxInstance = new Codox()
    setCodoxInstance(codoxInstance)
    setActiveDoc(doc)
  }

  const updateContent = (docId: string, content: string) => {
    const updatedDoc = docs.map(doc => {
      if (doc.id === docId) {
        return ({ ...doc, content })
      }
      return doc
    })
    updateDocs(updatedDoc)
  }

  return (
    <div className="App">
      <div id="app">
        <div className="header">
          <a href="https://www.codox.io" className="logo-link" target="_blank">
            <img src="https://www.codox.io/assets/img/wage.svg" alt="" id="logo" />
          </a>

          <div className="logo-title">Create your own Google Docs with Wave + Froala on React</div>
        </div>

        <div className="main-container">
          <div className="document-container">
            <ul className="document-list">
              {docs.map(d => (
                <li key={d.id} onClick={() => changeActiveDoc(d)}>
                  <a className={`document-link ${activeDoc.id === d.id && 'active'}`}>{d.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div id="editor" className="editors">
            {activeDoc.id ? <RealTimeFroalaEditor
              username={username}
              apiKey={apiKey}
              codox={codox}
              docId={activeDoc.id}
              model={activeDoc.content}
              updateContent={updateContent}
            /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
