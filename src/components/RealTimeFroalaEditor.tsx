import { useEffect, useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";

import 'froala-editor/js/froala_editor.pkgd.min.js';
import "froala-editor/js/plugins.pkgd.min.js";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

type props = {
  codox: any
  docId: string,
  username: string,
  apiKey: string,
  model: string,
  updateContent: (docId: string, content: string) => void
}

const RealTimeFroalaEditor = ({ codox, docId, username, apiKey, model, updateContent }: props) => {
  const [editor, setEditor] = useState<any>(null)

  useEffect(() => {
    startCollaboration()
    return () => codox && codox.stop()
  }, [editor, docId, codox])

  const startCollaboration = () => {
    editor && codox && codox.init({
      app: 'froala',
      username: username,
      docId: docId,
      apiKey: apiKey,
      editor: editor,
      hooks: {
        fetchDocOnNetworkReconnect: () => {
          return { content: 'Hello world!', timestamp: Date.now() }
        },
        contentChanged: () => {
          const content = editor.html.get()
          updateContent(docId, content)
        }
      }
    })
  }

  const config = {
    height: 500,
    events: {
      'initialized': function() {
        setEditor(this)
      }
    }
  }

  return (
    <>
      <FroalaEditor
        tag='textarea'
        config={config}
        model={model}
      />
    </>
  )
}

export default RealTimeFroalaEditor;