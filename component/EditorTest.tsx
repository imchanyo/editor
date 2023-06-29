import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor'

interface EditorProps {
  isEditorReady: boolean
  data?: string
  setData?: (data: string) => void
}

const key = `0b6caccfb013fad9047ab1263e7f25b6`
const url = `https://api.imgbb.com/1/upload?expiration=600&key=${key}`
const EditorTest = ({ isEditorReady, data, setData }: EditorProps) => {
  console.log(13, isEditorReady)
  const uploadAdapter = (loader: any) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          loader.file.then((file: any) => {
            const formData = new FormData()

            formData.append('image', file)

            fetch(url, {
              method: 'POST',
              body: formData,
            })
              .then((res) => res.json())
              .then((res) =>
                resolve({
                  default: res.data.url,
                })
              )
          })
        })
      },
    }
  }

  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return uploadAdapter(loader)
    }
  }

  return (
    <>
      {isEditorReady && (
        <CKEditor
          onChange={(event: any, editor: any) => {
            const data = editor.getData()
            if (setData) {
              setData(data)
            }
          }}
          config={{
            extraPlugins: [uploadPlugin],
          }}
          data={data}
          editor={ClassicEditor}
        />
      )}
    </>
  )
}

export default EditorTest
