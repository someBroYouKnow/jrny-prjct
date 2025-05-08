import './Tags.css'

export default function Tags({tagTitle}:{tagTitle:string}) {
  return (
    <div className="tag-button">
      <span className="tag-text">{tagTitle}</span>
    </div>
  )
}