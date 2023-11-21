import { LoadMore } from "./Button.style"


export const LoadMoreButton = ({onClick}) => {
  return (
    <LoadMore type="button" onClick={onClick}>
      Load more
    </LoadMore>
  )
}