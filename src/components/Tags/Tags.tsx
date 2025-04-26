import './Tags.css'

export default function Tags({tagTitle}:{tagTitle:string}) {
  return (
    <>
        <button className="tag-button">
             {tagTitle}
        </button>
    </>
  )
}
