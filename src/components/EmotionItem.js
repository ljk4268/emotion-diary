import { memo } from 'react'

const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSeleted,
}) => {
  return (
    <div
      className={[
        "EmotionItem",
        isSeleted ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
      ].join(' ')}
    >
      <img
        src={emotion_img}
        onClick={() => {
          onClick(emotion_id)
        }}
        alt="emotion"
      />
      <span>{emotion_descript}</span>
    </div>
  )
}
export default memo(EmotionItem)
