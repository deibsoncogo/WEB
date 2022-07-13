import { Editor } from '@tinymce/tinymce-react'
import { Input, TextArea } from '../../../../inputs'
import { InputSingleImage } from '../../../../inputs/input-single-image'

type stateEditor = {
    content: string;
}

type TextFreeContentFormProps = {
    stateEditor: stateEditor
    handleChangeStateEditor: (value: string) => void
 }

export function TextFreeContentForm({stateEditor, handleChangeStateEditor}: TextFreeContentFormProps) {
  return (
    <>
      <div className='mt-5'>
        <div className='row'>
          <div className='col'>
            <InputSingleImage name='image' />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <Input name='title' label='Título' />
            <TextArea
              name='description'
              label='Descrição'
              style={{ minHeight: '150px', margin: 0 }}
            />
            <Input name='authorName' label='Nome do Autor' />
          </div>
          <div className='col'>
          <label className='form-label fs-6 fw-bolder text-dark'>Conteúdo do Artigo</label>
          <Editor
          init={{
            plugins:
              'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap emoticons',
            menubar: false,
            toolbar:
              'undo redo | bold italic underline strikethrough | fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
            toolbar_sticky: true,
            height: 300,
            quickbars_selection_toolbar:
              'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
            noneditable_class: 'mceNonEditable',
            contextmenu: 'link image table',
          }}
          value={stateEditor.content}
          onEditorChange={handleChangeStateEditor}
        />
        <Input name='content' hidden={true} />
          </div>
        </div>
      </div>
    </>
  )
}
