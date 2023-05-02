import { useDispatch } from "react-redux"
import { filterSet } from "../reducers/filterReducer"

export const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(filterSet(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}
