import { useState, useEffect } from "react";
import RecordCard from "./RecordCard";

export default function Home() {
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState('');

  const getFilteredRecords = (query, records) => {
    if (!query) {
      return records;
    }
    return records.filter((record) =>
      Object.values(record).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(query.toLowerCase())
      ) ||
        Object.values(record.user).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(query.toLowerCase())
        )
    );
  };

  useEffect(() => {
    fetch('/api/records')
      .then((res) => res.json())
      .then((data) => {
        setRecords(data);
        console.log(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const filteredRecords = getFilteredRecords(query, records);

  const filteredRecordsMap = filteredRecords.map(record => (
    <RecordCard
      key={record.id}
      record={record}
    />
  ));

  return (
    <>
      <input type= 'search' className='search-bar' placeholder="search" onChange={e => setQuery(e.target.value)} />
      <div className="record-container">
        {filteredRecordsMap}
      </div>
    </>
  );
}
