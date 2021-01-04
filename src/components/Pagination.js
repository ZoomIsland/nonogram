function Pagination(props) {
  const pages = Math.floor(props.totalNonograms / 2);
  let pageDivs = [];
  for (let i = 0; i <= pages; i++) {
    pageDivs.push(i);
  }
  const pageMaker = pageDivs.map(page => {
      return (
          <div className="pageLink" onClick={() => props.onPageClick(page)}>{page + 1}</div>
      )
    })

  return (
    <div className="indexPageLinks">
      {props.currentPage > 0 &&
        <div className="firstLink" onClick={() => props.onPageClick(0)}>First</div>}
      {props.currentPage > 1 &&
        <div className="prevLink" onClick={() => props.onPageClick(props.currentPage - 1)}>Previous</div>}
      {pageMaker}
      {props.currentPage < (pages - 1) &&
        <div className="nextLink" onClick={() => props.onPageClick(props.currentPage + 1)}>Next</div>}
      {props.currentPage < pages && 
        <div className="lastLink" onClick={() => props.onPageClick(pages)}>Last</div>}
    </div>
  )
}

export default Pagination;