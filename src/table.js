const tab = {
    header: [{ heb: "שם", ang: "Name" }, { heb: "משפחה", ang: "LastName",type:"text" }],
    data: [{ id: 2, Name: "sara", LastName: "Aber" }]
}

const Table = () => {
    return <table>
        <th>{tab.header.map(x => <td>{x.heb}</td>)}</th>
        <tbody>{tab.data.map(x => <tr>{tab.header.map(x => <td>{x[x.ang]}</td>)}</tr>)}</tbody>
    </table>

}
export default Table;