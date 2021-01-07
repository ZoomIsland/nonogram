import './Pagination.css';

function Pagination(props) {
  const pages = Math.floor(props.totalNonograms / 10);
  let pageDivs = [];
  for (let i = 0; i <= pages; i++) {
    pageDivs.push(i);
  }
  const pageMaker = pageDivs.map(page => {
    if (page === props.currentPage) {
      return (
        <div className="currentPage">{page + 1}</div>
    )
    } else {
      return (
          <div className="pageLink" onClick={() => props.onPageClick(page)}>{page + 1}</div>
      )
    }
    })

  return (
    <div className="indexPageLinks">
      {props.currentPage > 0 &&
        <div className="firstLink" onClick={() => props.onPageClick(0)}>First</div>}
      {props.currentPage > 0 &&
        <div className="prevLink" onClick={() => props.onPageClick(props.currentPage - 1)}>Previous</div>}
      {pageMaker}
      {props.currentPage < pages &&
        <div className="nextLink" onClick={() => props.onPageClick(props.currentPage + 1)}>Next</div>}
      {props.currentPage < pages && 
        <div className="lastLink" onClick={() => props.onPageClick(pages)}>Last</div>}
    </div>
  )
}

export default Pagination;