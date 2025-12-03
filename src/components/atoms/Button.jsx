export default function Button({ as='button', href, children, variant='primary', className='', ...props }){
  const Tag = href ? 'a' : as
  const variants = { primary: 'button', light: 'button button--light', link: 'btn' }
  const classes = [variants[variant] || 'button', className].join(' ').trim()
  return <Tag href={href} className={classes} {...props}>{children}</Tag>
}
