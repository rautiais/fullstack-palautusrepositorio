const Notification = ({ message, type }) => {
  if (!message) return null

  const isError = type === 'error'

  const style = {
    background: isError ? '#fdecea' : '#e8f5e9',
    color: isError ? '#c0392b' : '#27ae60',
    border: `2px solid ${isError ? '#c0392b' : '#27ae60'}`,
    padding: '12px 18px',
    marginBottom: 16,
    borderRadius: 6,
    fontWeight: 'bold',
    fontSize: 15,
  }

  return <div style={style}>{message}</div>
}

export default Notification
