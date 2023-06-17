import React, { useEffect, useState } from 'react';
const Detail = () => {
  const [users, setUsers] = useState([]);

  const getUsersDetail = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    setUsers(await response.json());

  }

  useEffect(() => {
    getUsersDetail();
  }, []);

  return (
    <>
      <div className="title">
        <h2>album list</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center">
        {
          users.map((person,index) => {
            return (
              <div key={index}>
                <article className="album-item">
                  <img src="60111.jpg" className="photo" alt="dummy-photo" />
                  <div className="item-info">
                    <header className="id">
                      <h4>User-Id:{person.userId}</h4>
                      <h4 className="identity">Id:{person.id}</h4>
                    </header>
                    <p className="item-text">
                     <span> title:</span>{person.title}
                    </p>
                    <div className="btn-container">
                      <button>update</button>
                      <button>delete</button>
                    </div>
                  </div>
                </article>
              </div>
            )
          })
        }
      </div>
    </>

  )
}
export default Detail;