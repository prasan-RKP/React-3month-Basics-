import { useState, useCallback, useMemo } from 'react';
import users from './constants/datas';


export default function DataTable() {
  const [message, setMessage] = useState('Data Table');
  
  const[limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

const totalPage = Math.ceil(users.length / limit);

  const updatedUsers = useMemo(()=> {
        const start = (page - 1) * limit;
        const end = start + limit;

      return users.slice(start, end);

  }, [page, limit]);

  const handleLimit = useCallback((e)=> {
    const val = Number(e.target.value);
    setLimit(val);
    setPage(1); // 
  }, [])

  const handlePrev = useCallback(()=> {
           if(page > 1){
            setPage(prev => prev - 1);
           }
  }, [page]);

  const handleNext = useCallback(() => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  }, [page, totalPage]);


  return (
    <div>
      <h1>{message}</h1>
      <table>
        <thead>
          <tr>
            {[
              { label: 'ID', key: 'id' },
              { label: 'Name', key: 'name' },
              { label: 'Age', key: 'age' },
              { label: 'Occupation', key: 'occupation' },
            ].map(({ label, key }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {updatedUsers.map(({ id, name, age, occupation }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{occupation}</td>
            </tr>
          ))}
        </tbody>
         
         <div className="down">
             
             <div className="sel-box">
             <select value={limit} onChange={handleLimit}>
                   <option value="5">Show 5</option>
                   <option value="10">Show 10</option>
                   <option value="20">Show 20</option>
              </select>
             </div>

             <div className="three"> 
                <button onClick={handlePrev} disabled={page === 1}>Prev</button> 
                <p>Page {page} of {totalPage} </p>
                <button onClick={handleNext} disabled = {page === totalPage}>Next </button>
             </div>
         </div>

      </table>
    </div>
  );
}
