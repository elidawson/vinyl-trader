import { useState, useEffect } from "react"
import RecordCard from "./RecordCard"
import SearchBar from "./SearchBar"

export default function Home() {
  const [ records, setRecords ] = useState([])

  useEffect(() => {
    fetch('/api/records')
    .then((res) => res.json())
    .then((data) => {
      setRecords(data);
      console.log(data);
    })
    .catch((error) => {
      alert((error.message));
    });
  }, [])

  const recordMap = records.map((record) => {
    return (
      <RecordCard
        key={record.id}
        record={record}
      />
    )
  })

  return (
    <>
      <SearchBar setRecords={setRecords} />
      <div className="record-container">
        {recordMap}
      </div>
    </>
  )
}
