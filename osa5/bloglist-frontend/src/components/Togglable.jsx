import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    toggleVisibility: () => setVisible((v) => !v),
  }))

  return (
    <div>
      {!visible && (
        <button onClick={() => setVisible(true)}>{buttonLabel}</button>
      )}
      {visible && (
        <div>
          {children}
          <button onClick={() => setVisible(false)}>cancel</button>
        </div>
      )}
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
