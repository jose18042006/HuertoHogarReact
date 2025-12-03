export default function Title({ level=1, children, className='' }){
  const Tag = `h${level}`
  return <Tag className={className}>{children}</Tag>
}
