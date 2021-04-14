import { useState } from 'react'

const AddTask = ({ onAdd }) => {
  let date;
	const [text, setText] = useState('')
  const [day, setDay] = useState(new Date().toLocaleString() + '')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      alert('Please add a comment')
      return
    }
   date = new Date().toLocaleString() + '';
   let text1;
   document.addEventListener('mouseup', () => {
    const selection = window.getSelection().toString();
    if(selection !== '')
      text1 = selection
    });
    console.log(text1)
    onAdd({ text, day, reminder, text1 })

    setText('')
    setDay(new Date().toLocaleString() + '')
    setReminder(false)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Comment</label>
        <input
          type='text'
          placeholder='Add Comment'
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
      </div>

     
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddTask