
import styles from '@/styles/components/FullImageModal.module.css'
import Image from './Image'
import FAIcon from './FAIcon'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { Ref, useEffect, useRef } from 'react'

type Props = {
  closeButtonRef: any
  handleHide: any
  imageSrc: string
  show: boolean
  title: string
}

export default function FullImageModal({ closeButtonRef, handleHide,
  imageSrc, show, title }: Props) {
  if (!show) return null

  const imageRef = useRef<any>()
  useDetectOutsideClicks(imageRef)

  useEffect(() => {
    if (closeButtonRef?.current) {
      closeButtonRef?.current?.focus()
    }
  }, [closeButtonRef]);

  function useDetectOutsideClicks(imageRef: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (imageRef?.current && !imageRef.current.contains(event.target)) {
          handleHide()
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [imageRef]);
  }

  return (
    <div className={styles['full-image-modal']}>
      <button
        className={`focus-style ${styles['close-button-wrapper']}`}
        onClick={handleHide}
        ref={closeButtonRef}
        tabIndex={0}
        type="button">
        <FAIcon
          className={styles['close-button-svg']}
          icon={faXmark}
          tabIndex={1}
          title='Hide full size image'
        />
      </button>
      <div className={styles['full-image-inner-wrapper']}>
        <Image
          alt={title}
          className={styles['full-image']}
          imageSrc={imageSrc}
          innerRef={imageRef}
          priority
          title={title}
        />
      </div>
    </div>
  )
}
