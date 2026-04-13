const Notification = ({ message, type }) => {
  if (!message) return null

  const style = {
    border: `2px solid ${type === 'error' ? 'red' : 'green'}`,
    color: type === 'error' ? 'red' : 'green',
    background: '#f0f0f0',
    fontSize: 16,
    padding: '10px 16px',
    marginBottom: 16,
    borderRadius: 4,
  }

  return <div style={style}>{message}</div>
}

export default Notification
