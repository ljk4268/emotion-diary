import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DiaryStateContext } from '../App'
// components
import MyHeader from '../components/MyHeader'
import MyButton from '../components/MyButton'
// util
import { getStringDate } from '../util/date'
import { emotionList } from '../util/emotion'

const Diary = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const diaryList = useContext(DiaryStateContext)
  const [data, setData] = useState()

  useEffect(() => {
    if (diaryList.length > 1) {
      const targetDiaryList = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      )
      if (targetDiaryList) {
        setData(targetDiaryList)
      } else {
        alert('없는 일기입니다.')
        navigate('/', { replace: true })
      }
    }
  }, [id, diaryList])

  if (!data) {
    return <div className="DiaryPagee">로딩중입니다...</div>
  } else {
    const currentEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    )
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton
              text={'뒤로가기'}
              onClick={() => {
                navigate(-1)
              }}
            />
          }
          rightChild={
            <MyButton
              text={'수정하기'}
              onClick={() => {
                navigate(`/edit/${data.id}`)
              }}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(' ')}>
              <img src={currentEmotionData.emotion_img} alt="emotion" />
              <div className="emotion_descript">
                {currentEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className='diary_content_wrapper'>
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    )
  }
}

export default Diary
