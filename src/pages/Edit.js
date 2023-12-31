import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DiaryStateContext } from '../App'
import DiaryEditor from '../components/DiaryEditor'

const Edit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const diaryLlist = useContext(DiaryStateContext)
  const [originData, setOriginData] = useState()

  useEffect(() => {
    if (diaryLlist.length > 1) {
      const targetDiary = diaryLlist.find(
        (it) => parseInt(it.id) === parseInt(id)
      )
      if (targetDiary) {
        setOriginData(targetDiary)
      } else {
        navigate('/', { replace: true })
      }
    }
  }, [id, diaryLlist])

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  )
}

export default Edit
