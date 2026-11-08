// The white card with a table inside, used by every list page in the dashboard.
//   rows:      everything loaded from the API (null while it is still loading)
//   items:     the rows to show (after a search or filter); defaults to all rows
//   columns:   the column titles, e.g. ['Order', 'Category', '']  (use '' for the buttons column)
//   empty:     the sentence shown when there is nothing to list
//   renderRow: gives one <tr key=...> for an item
export default function AdminTable({ rows, items = rows, columns, empty, renderRow }) {
  return (
    <div className="adm-card adm-table-wrap">
      {!rows ? (
        <div className="adm-loading">Loading…</div>
      ) : items.length === 0 ? (
        <p className="adm-empty">{empty}</p>
      ) : (
        <table className="adm-table">
          <thead>
            <tr>{columns.map((title, index) => <th key={index}>{title}</th>)}</tr>
          </thead>
          <tbody>{items.map(renderRow)}</tbody>
        </table>
      )}
    </div>
  );
}
