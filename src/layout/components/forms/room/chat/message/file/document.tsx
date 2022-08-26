import styles from './document.module.scss'

type DocumentProps = {
  fileURL: string
  fileOriginalName?: string
}

export const Document = ({ fileURL, fileOriginalName }: DocumentProps) => {
  return (
    <a href={fileURL} download={fileOriginalName} target='__blank'>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src='/icons/document-text.svg' alt='file document icon' />
        </div>

        <div className={styles.legend}>
          {/* <img src='/icons/document-download.svg' alt='download icon' /> */}
          <p>{fileOriginalName}</p>
        </div>
      </div>
    </a>
  )
}
