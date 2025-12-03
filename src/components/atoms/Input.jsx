export default function Input({
  id, name, type='text', value, onChange, placeholder,
  error = false, ...props
}) {
  const classes = ['input-field', error ? 'input-error' : ''].join(' ').trim()
  return (
    <input
      id={id || name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={classes}
      aria-invalid={error ? 'true' : 'false'}
      {...props}
    />
  )
}
