import React from "react"
import { addFilter } from "../reducers/filterReducer"
// import { useDispatch } from "react-redux"
import { connect } from "react-redux"

const Filter = (props) => {
  //const dispatch = useDispatch()

  const handleChange = (event) => {
    props.addFilter(event.target.value)
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  addFilter,
}

export default connect(null, mapDispatchToProps)(Filter)
