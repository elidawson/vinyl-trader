import { useState, useEffect, useContext } from "react";
import { UserContext } from "./App";
import RecordCard from "./RecordCard";

export default function Home() {
  const user = useContext(UserContext);
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/records")
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRecords(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const getFilteredRecords = (query, records) => {
    if (!query) {
      return records;
    }
    return records.filter(
      (record) =>
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

  const filteredRecords = getFilteredRecords(query, records);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <input
        type="search"
        className="search-bar"
        placeholder="search"
        onChange={handleQueryChange}
      />
      <div className="record-container">
        {filteredRecords.map((record) => (
          <RecordCard key={record.id} record={record} />
        ))}
      </div>
    </>
  );
}
