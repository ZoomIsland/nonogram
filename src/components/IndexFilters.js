function IndexFilters(props) {
  return (
    <div className="filters">
      <p>Order by: </p>
      <select onChange={props.onSelectChange}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="smallest">Smallest</option>
        <option value="biggest">Biggest</option>
      </select>
    </div>
  )
}

export default IndexFilters;